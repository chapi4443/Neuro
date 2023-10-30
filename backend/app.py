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
if models:
    model = models[0].name
else:
    model = None

app = Flask(__name__)

# Load the pre-trained logistic regression model
logistic_regression = joblib.load('logistic_regression_model.pkl')

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

def generate_stroke_advice(stroke_probability):
    prompt = f"My stroke risk probability is {stroke_probability:.2%}. What should I do?"
    response = palm.generate_text(
        model=model,
        prompt=prompt,
        max_output_tokens=800,
    ).result
    return response
@app.route('/predict_stroke_risk', methods=['POST'])
def predict_stroke():
    try:
        input_data = request.get_json()

        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        input_df = pd.DataFrame(input_data['data'])
        prediction_result = predict_stroke_risk(input_df)

        # Interpret the probability
        probability = prediction_result['Logistic Regression Probability']
        interpretation = interpret_probability(probability)

        # Generate advice based on the data using PALM generative text
        advice = generate_advice(input_df, interpretation)

        response = {
            "Logistic Regression Probability": probability,
            "Interpretation": interpretation,
            "Advice": advice
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def interpret_probability(probability):
    if probability < 0.2:
        return "Low risk of stroke."
    elif 0.2 <= probability < 0.5:
        return "Moderate risk of stroke."
    elif 0.5 <= probability < 0.8:
        return "High risk of stroke. Please consult a healthcare professional."
    else:
        return "Very high risk of stroke. Urgently consult a healthcare professional."

def generate_advice(input_data, interpretation):
    # Use PALM generative text to generate advice based on the interpretation and input data
    prompt = f"My stroke risk probability is {interpretation}. What should I do given my data: {input_data.to_dict(orient='records')[0]}?"
    
    response = palm.generate_text(
        model=model,
        prompt=prompt,
        max_output_tokens=800,
    ).result
    
    return response


@app.route('/get_stroke_recommendations', methods=['POST'])
def get_stroke_recommendations():
    if request.method == 'POST':
        # Extract data from the request
        data = request.get_json()
        # alcohol_consumption = data.get('alcohol_consumption', 'N/A')
        stress_levels = data.get('stress_levels', 'N/A')
        # sleep_patterns = data.get('sleep_patterns', 'N/A')

        # exposure_percent = data.get('exposure_percent', 40)
        weight = data.get('weight', 150)
        height = data.get('height', 1.70)
        # history_of_stroke = data.get('history_of_stroke', "yes")
        family_history_of_stroke = data.get('family_history_of_stroke', "yes")
        # physical_activity_level = data.get('physical_activity_level', "sedentary")
        # diet = data.get('diet', "balanced")
        systolic_blood_pressure = data.get('systolic_blood_pressure', 50)
        diastolic_blood_pressure = data.get('diastolic_blood_pressure', 60)

        # Extract user data, handling missing or empty data['data']
        user_data = data.get('data', [{}])[0]

        # Extract specific user data fields for the prompt
        age = user_data.get('age', 'N/A')
        hypertension = user_data.get('hypertension', 'N/A')
        heart_disease = user_data.get('heart_disease', 'N/A')
        ever_married = user_data.get('ever_married', 'N/A')
        work_type = user_data.get('work_type', 'N/A')
        residence_type = user_data.get('Residence_type', 'N/A')
        avg_glucose_level = user_data.get('avg_glucose_level', 'N/A')
        bmi = user_data.get('bmi', 'N/A')
        smoking_status = user_data.get('smoking_status', 'N/A')
        gender = user_data.get('gender', 'N/A')

        # Construct the prompt with user data
        medical_prompt = f"""
As an expert in stroke disease prevention, you play a crucial role in advising and developing
personalized diet and exercise plans for patients based on their unique profiles. 

User Profile:
Weight: {weight} kg
Height: {height} meters
Age: {age} years
Family History of Stroke: {family_history_of_stroke}

Systolic Blood Pressure: {systolic_blood_pressure} mmHg
Diastolic Blood Pressure: {diastolic_blood_pressure} mmHg
Hypertension: {hypertension}
Heart Disease: {heart_disease}
Ever Married: {ever_married}
Work Type: {work_type}
Residence Type: {residence_type}
Average Glucose Level: {avg_glucose_level} mg/dL
Gender: {gender}
Stress Levels: {stress_levels}

Analysis of Metrics:
Valuable for Risk Assessment:
1. History of Stroke (history_of_stroke): This is a crucial indicator of stroke risk.
2. Family History of Stroke (family_history_of_stroke): A family history of stroke can be a risk factor.
3. Physical Activity Level (physical_activity_level): Physical inactivity is a risk factor for stroke.
4. Systolic and Diastolic Blood Pressure (systolic_blood_pressure, diastolic_blood_pressure): High blood pressure is a significant risk factor for stroke.
5. Age (from the data): Age is a critical factor in stroke risk; older individuals are at higher risk.
6. Hypertension (from the data): High blood pressure is a risk factor.
7. Heart Disease (from the data): Existing heart disease is a risk factor.
8. Avg Glucose Level (from the data): High glucose levels can increase stroke risk, especially for diabetics.
9. BMI (from the data): High BMI can be associated with stroke risk.
10. Smoking Status (from the data): Smoking is a significant risk factor for stroke.
11. Gender (from the data): Gender can play a role in stroke risk; males often have a higher risk.

Not Valuable for Risk Assessment:
1. Weight and Height: While these can be factors in overall health, they are not as directly linked to stroke risk as some of the other factors listed above.
2. Diet: Diet is important for overall health but might not be as directly related to stroke risk as factors like blood pressure or smoking.
3. Marital Status, Work Type, and Residence Type (from the data): These factors are less directly related to stroke risk. They may influence lifestyle choices that contribute to risk, but they are not primary risk factors.



"""
        response = palm.generate_text(
            model=model,
            prompt=medical_prompt,
            max_output_tokens=800,
        ).result

        return jsonify({'recommendations': response})


    
# Initialize a dictionary to store previous chats
previous_chats = {}

@app.route('/medical', methods=['POST'])
def medical_question():
    try:
        input_data = request.get_json()

        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        question = input_data.get('question', '')

        if not model:
            return jsonify({"error": "No suitable AI model found"}), 500

        # Check if the question is a greeting or unrelated to health
        if "greeting" in question.lower() or "who are you" in question.lower():
            response = "NuroGen is a health assistant and can only answer health-related questions."
        else:
            # Check if there are previous chats related to this question
            related_chat = previous_chats.get(question.lower())
            if related_chat:
                response = related_chat
            else:
                medical_prompt = f"""
Hello, I am Neurogen AI, your health assistant specialized in providing guidance on stroke-related concerns. Please feel free to ask me any health-related questions, and I'll do my best to assist you.

Remember, I'm here to help with health and medical queries only. If you have any questions unrelated to health, I may not be able to provide a response. However, for greetings or queries about my identity, feel free to ask, and I'll provide you with the necessary information.

Please go ahead and ask your health-related question below:
"{question}"
"""
                response = palm.generate_text(
                    model=model,
                    prompt=medical_prompt,
                    max_output_tokens=800,
                ).result

                # Store the response in the previous chats dictionary
                previous_chats[question.lower()] = response

        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == '__main__':
    # Load the dataset and perform preprocessing
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

    app.run(debug=True, port=4000)   