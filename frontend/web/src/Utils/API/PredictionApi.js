import axios from "axios";


export const Strokepredictor = async (data) => {
//     {
//   "data": [
//     {
//       "age": 90,
//       "hypertension": 1,
//       "heart_disease": 1,
//       "ever_married": "Yes",
//       "work_type": "Private",
//       "Residence_type": "Urban",
//       "avg_glucose_level": 20,
//       "bmi": 25,
//       "smoking_status": "smoked",
//       "gender": "Male"
//     }
//   ]
// }

  const useData = await axios.post("http://localhost:5000/api/v1/predict/predict_stroke_risk", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(useData);
 return useData
};

export const StrokeRecommendations = async (data) => {
//     {
//   "exposure_percent": 40,
//   "weight": 150,
//   "height": 1.70,
//   "history_of_stroke": "yes",
//   "family_history_of_stroke": "yes",
//   "physical_activity_level": "sedentary",
//   "diet": "balanced",
//   "systolic_blood_pressure": 50,
//   "diastolic_blood_pressure": 60,
//   "data": [
//     {
//       "age": 45,
//       "hypertension": "no",
//       "heart_disease": "yes",
//       "ever_married": "yes",
//       "work_type": "private",
//       "Residence_type": "urban",
//       "avg_glucose_level": 80,
//       "bmi": 25,
//       "smoking_status": "never smoked",
//       "gender": "male"
//     }
//   ]
// }
  const useData = await axios.post("http://localhost:5000/api/v1/predict/getStrokeRecommendations", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(useData);
 return useData
};

export const StrokeAssementdata = async (data) => {

  const response = await axios.get(`http://localhost:5000/api/v1/predict/predictions/${data}`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch legal documents");
  }
};