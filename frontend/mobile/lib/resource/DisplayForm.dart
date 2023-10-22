import 'package:final_sprs/resource/FormData.dart';

class FormDataPrinter {
  static void displayFormData(FormData formData) {
    print('Gender: ${formData.gender}');
    print('Age: ${formData.Age}');
    print('Hypertension: ${formData.hypertension}');
    print('Heart Disease: ${formData.heartDisease}');
    print('Weight: ${formData.weight}');
    print('Height: ${formData.height}');
    print('Systolic Blood Pressure: ${formData.systolicBP}');
    print('Diastolic Blood Pressure: ${formData.diastolicBP}');
    print('Consent to Data Collection: ${formData.consentToDataCollection}');
    print('Ever Married: ${formData.everMarried}');
    print('Work Type: ${formData.workType}');
    print('Residence: ${formData.residence}');
    print('Smoking Status: ${formData.smokingStatus}');
    print('Glucose Level: ${formData.glucoseLevel}');
    print('BMI: ${formData.bmi}');
    print('Physical Activity: ${formData.physicalActivity}');
    print('Diet: ${formData.diet}');
  }
}
