import pandas as pd
import joblib
from flask import Flask, request, jsonify
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, precision_recall_fscore_support
from sklearn.linear_model import LogisticRegression
import google.generativeai as palm
import os
from dotenv import load_dotenv




# Load environment variables from .env file
load_dotenv()

# Get the API key from the environment variable
palm_api_key = os.getenv("PALM_API_KEY")

# Configure with your API key
palm.configure(api_key=palm_api_key)

# Retrieve and select a generative AI model that supports 'generateText'
models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
model = models[0].name



app = Flask(__name__)

# Load the pre-trained logistic regression model
logistic_regression = joblib.load('model/logistic_regression_model.pkl')

def predict_stroke_risk(input_data):
    if not isinstance(input_data, pd.DataFrame):
        raise ValueError("Input data should be a pandas DataFrame.")

    input_data['bmi'].fillna(input_data['bmi'].mean(), inplace=True)
    input_data['smoking_status'].fillna(input_data['smoking_status'].mode()[0], inplace=True)
    X_input_preprocessed = preprocessing_pipeline.transform(input_data)

    logistic_regression_prob = logistic_regression.predict_proba(X_input_preprocessed)[0][1]

    return {
        'Logistic Regression Probability': logistic_regression_prob
    }


@app.route('/predict_stroke_risk', methods=['POST'])
def predict_stroke():
    try:
        input_data = request.get_json()

        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        input_df = pd.DataFrame(input_data['data'])
        prediction_result = predict_stroke_risk(input_df)

        return jsonify(prediction_result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/medical', methods=['POST'])
def medical_question():
    try:
        input_data = request.get_json()

        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        question = input_data.get('question', '')

        if 'medicine' in question.lower() or 'health' in question.lower() or 'stroke' in question.lower() or 'hey' in question.lower() or 'hello' in question.lower() or 'hi' in question.lower():
            response = palm.generate_text(
                model=model,
                prompt=question,
                max_output_tokens=800,
            ).result
        else:
            response = "I can only answer medical-related questions. Please ask a stroke-related question."

        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Load the dataset and perform preprocessing
    data = pd.read_csv("data/healthcare-dataset-stroke-data.csv")

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

    app.run(debug=True, port=4000)  # Change the port to 4000