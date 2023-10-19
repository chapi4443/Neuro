## AI Models

This repository contains the implementation of a predictive model for stroke risk using Logistic Regression. The code and files in this repository enable the preprocessing, training, evaluation, and prediction of stroke risk based on various health-related features.

### Files

1. `logistic_regression_model.pkl`: This file contains the trained Logistic Regression model that predicts the likelihood of stroke based on various health factors.

2. `predict_stroke.py`: This Python script includes the implementation of data preprocessing, model training, evaluation, and prediction of stroke risk using the trained Logistic Regression model.

### Dependencies

- pandas (version 1.1.3)
- numpy (version 1.19.2)
- joblib (version 1.0.1)
- scikit-learn (version 0.24.2)
- imbalanced-learn (version 0.8.0)
- matplotlib (version 3.3.2)
- seaborn (version 0.11.0)

### Usage

1. Ensure that the necessary dependencies are installed in the environment.
2. Run the `predict_stroke.py` script to preprocess the data, train the Logistic Regression model, and make predictions for stroke risk based on input data.
3. Adjust the sample data in the script to test the prediction function with different input data.

### How to Run

To execute the `predict_stroke.py` script, use the following command:

```
python predict_stroke.py
```

### Contributors

- Fita Wegene (https://github.com/fi-taa)

Feel free to contribute by forking the repository and creating pull requests.

### Note

The data used in this model is from the 'healthcare-dataset-stroke-data.csv' file, which contains various health-related features. The model is trained and evaluated on this specific dataset.

For more information, please refer to the code in the `predict_stroke.py` script and the provided data file.