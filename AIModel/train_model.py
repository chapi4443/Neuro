import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, precision_recall_fscore_support
from sklearn.linear_model import LogisticRegression
import matplotlib.pyplot as plt
import seaborn as sns

data = pd.read_csv("healthcare-dataset-stroke-data.csv")

data['bmi'].fillna(data['bmi'].mean(), inplace=True)
data['smoking_status'].fillna(data['smoking_status'].mode()[0], inplace=True)

X = data.drop(['id', 'stroke'], axis=1)
y = data['stroke']

numeric_features = ['age', 'avg_glucose_level', 'bmi']
categorical_features = ['gender', 'hypertension', 'heart_disease', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']

numeric_transformer = Pipeline(steps=[
    ('scaler', StandardScaler())])

categorical_transformer = Pipeline(steps=[
    ('onehot', OneHotEncoder(handle_unknown='ignore'))])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)],
    remainder='passthrough')  

preprocessing_pipeline = Pipeline(steps=[('preprocessor', preprocessor)])

X_preprocessed = preprocessing_pipeline.fit_transform(X)

smote = SMOTE(sampling_strategy='auto', random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_preprocessed, y)

X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

logistic_regression = LogisticRegression(class_weight='balanced', random_state=42)
logistic_regression.fit(X_train, y_train)

joblib.dump(logistic_regression, 'logistic_regression_model.pkl')

metrics = ['precision', 'recall', 'roc_auc']

print("Model: Logistic Regression")
y_pred = logistic_regression.predict(X_test)
y_proba = logistic_regression.predict_proba(X_test)[:, 1]

for metric in metrics:
    if metric == 'roc_auc':
        score = roc_auc_score(y_test, y_proba)
    else:
        precision, recall, _, _ = precision_recall_fscore_support(y_test, y_pred)
        if metric == 'precision':
            score = precision[1]
        elif metric == 'recall':
            score = recall[1]
    print(f"{metric.capitalize()}: {score:.2f}")

def predict_stroke_risk(input_data):
    if not isinstance(input_data, pd.DataFrame):
        raise ValueError("Input data should be a pandas DataFrame.")

    input_data['bmi'].fillna(data['bmi'].mean(), inplace=True)
    input_data['smoking_status'].fillna(data['smoking_status'].mode()[0], inplace=True)
    X_input_preprocessed = preprocessing_pipeline.transform(input_data)

    logistic_regression_prob = logistic_regression.predict_proba(X_input_preprocessed)[0][1]

    return {
        'Logistic Regression Probability': logistic_regression_prob
    }

sample_data = pd.DataFrame({
    'gender': ['Male'],                 
    'age': [65.0],                     
    'hypertension': [1],                
    'heart_disease': [1],              
    'ever_married': ['Yes'],            
    'work_type': ['Self-employed'],    
    'Residence_type': ['Urban'],         
    'avg_glucose_level': [150.0],       
    'bmi': [30.0],                      
    'smoking_status': ['Smokes']      
})


prediction_result = predict_stroke_risk(sample_data)

for model, prob in prediction_result.items():
    risk_percentage = prob * 100
    print(f"{model}: {risk_percentage:.2f}%")
