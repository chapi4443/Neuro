class FormData {
  int age = 0;
  int hypertension = 0;
  int heartDisease = 0;
  String everMarried = "";
  String workType = "";
  String residenceType = "";
  double avgGlucoseLevel = 0.0;
  double bmi = 0.0;
  String smokingStatus = "";
  String gender = "";

  Map<String, dynamic> toMap() {
    return {
      'age': age,
      'hypertension': hypertension,
      'heart_disease': heartDisease,
      'ever_married': everMarried,
      'work_type': workType,
      'Residence_type': residenceType,
      'avg_glucose_level': avgGlucoseLevel,
      'bmi': bmi,
      'smoking_status': smokingStatus,
      'gender': gender,
    };
  }
}
