import 'package:final_sprs/presentaion/core/app_export.dart';
import 'package:final_sprs/resource/FormData.dart';

class StepWidget extends StatelessWidget {
  final int currentStep;
  final FormData formData;
  final Function(Map<String, dynamic>) updateFormData;
  final VoidCallback goToPreviousStep;
  final VoidCallback goToNextStep;
  const StepWidget({
    super.key,
    required this.currentStep,
    required this.formData,
    required this.updateFormData,
    required this.goToPreviousStep,
    required this.goToNextStep,
  });

  @override
  Widget build(BuildContext context) {
    switch (currentStep) {
      case 1:
        return Step1(
          formData: formData,
          updateFormData: updateFormData,
          goToNextStep: goToNextStep,
        );
      case 2:
        return Step2(
          formData: formData,
          updateFormData: updateFormData,
          goToPreviousStep: goToPreviousStep,
          goToNextStep: goToNextStep,
        );
      case 3:
        return Step3(
          formData: formData,
          updateFormData: updateFormData,
          goToPreviousStep: goToPreviousStep,
          goToNextStep: goToNextStep,
        );
      case 4:
        return Step4(
          formData: formData,
          updateFormData: updateFormData,
          goToPreviousStep: goToPreviousStep,
          goToNextStep: goToNextStep,
        );
      case 5:
        return Step5(
          formData: formData,
          updateFormData: updateFormData,
          goToPreviousStep: goToPreviousStep,
          goToNextStep: goToNextStep,
        );
      case 6:
        return Step6(
          formData: formData,
          updateFormData: updateFormData,
          goToPreviousStep: goToPreviousStep,
          goToNextStep: goToNextStep,
        );
      case 7:
        return Step7(
          formData: formData,
          updateFormData: updateFormData,
          goToPreviousStep: goToPreviousStep,
          goToNextStep: goToNextStep,
        );
      case 8:
        return Step8(
          formData: formData,
          updateFormData: updateFormData,
          goToPreviousStep: goToPreviousStep,
          goToNextStep: goToNextStep,
        );

      default:
        return Container();
    }
  }
}

class Step1 extends StatelessWidget {
  List<String> dropdownItemList = ["Male", "Female"];

  final TextEditingController _agevalueoneController =
      TextEditingController(text: "21");
  final FormData formData;
  final Function(Map<String, dynamic>) updateFormData;
  final Function goToNextStep;

  Step1({
    super.key,
    required this.formData,
    required this.updateFormData,
    required this.goToNextStep,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 7.v),
                  child: Text("Gender", style: theme.textTheme.bodyMedium))),
          CustomDropDown(
              icon: Container(
                  margin: EdgeInsets.only(left: 30.h, right: 26.h),
                  child: CustomImageView(svgPath: ImageConstant.imgIcon)),
              margin: EdgeInsets.only(left: 6.h, top: 16.v, right: 6.h),
              hintText: "Male",
              items: dropdownItemList,
              onChanged: (value) {
                updateFormData({"gender": value});
              }),
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 11.v),
                  child: Text("Age", style: theme.textTheme.bodyMedium))),
          SizedBox(
            width: 250.h,
            child: TextFormField(
              controller: _agevalueoneController,
              keyboardType: TextInputType.number,
              cursorColor: theme.colorScheme.primary,
              validator: (value) {
                if (value!.isEmpty) {
                  return 'age is required';
                }
                return null;
              },
              decoration: InputDecoration(
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(
                    width: 1,
                    color: theme.colorScheme.primary,
                  ),
                ),
              ),
            ),
          ),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go next",
              rightIcon: Container(
                  margin: EdgeInsets.only(left: 8.h),
                  child: CustomImageView(
                      svgPath: ImageConstant.imgIconPrimarycontainer)),
              onTap: () {
                print("hereeeeeeeee");
                updateFormData({"Age": int.parse(_agevalueoneController.text)});

                goToNextStep();
              }),
        ],
      ),
    );
  }
}

class Step2 extends StatelessWidget {
  List<String> dropdownItemList = [
    "Yes",
    "No",
  ];

  List<String> dropdownItemList1 = [
    "Yes",
    "No",
  ];
  final FormData formData;
  final Function(Map<String, dynamic>) updateFormData;
  final VoidCallback goToPreviousStep;
  final VoidCallback goToNextStep;

  Step2({
    super.key,
    required this.formData,
    required this.updateFormData,
    required this.goToPreviousStep,
    required this.goToNextStep,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child:
                      Text("Hypertension", style: theme.textTheme.bodyMedium))),
          CustomDropDown(
              icon: Container(
                  margin: EdgeInsets.only(left: 30.h, right: 26.h),
                  child: CustomImageView(svgPath: ImageConstant.imgIcon)),
              margin: EdgeInsets.only(left: 6.h, top: 15.v, right: 6.h),
              hintText: "No",
              items: dropdownItemList,
              onChanged: (value) {
                updateFormData({"hypertension": value});
              }),
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("Heart Disease",
                      style: theme.textTheme.bodyMedium))),
          CustomDropDown(
              icon: Container(
                  margin: EdgeInsets.only(left: 30.h, right: 26.h),
                  child: CustomImageView(svgPath: ImageConstant.imgIcon)),
              margin: EdgeInsets.only(left: 6.h, top: 16.v, right: 6.h),
              hintText: "No",
              items: dropdownItemList1,
              onChanged: (value) {
                updateFormData({"heartDisease": value});
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go next",
              rightIcon: Container(
                  margin: EdgeInsets.only(left: 8.h),
                  child: CustomImageView(
                      svgPath: ImageConstant.imgIconPrimarycontainer)),
              onTap: () {
                goToNextStep();
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go Back",
              leftIcon: Padding(
                padding: const EdgeInsets.only(right: 10),
                child: Icon(
                  MdiIcons.arrowLeftThin,
                  color: Colors.black,
                ),
              ),
              onTap: () {
                goToPreviousStep();
              }),
        ],
      ),
    );
  }
}

class Step3 extends StatelessWidget {
  final FormData formData;
  final Function(Map<String, dynamic>) updateFormData;
  final VoidCallback goToPreviousStep;
  final VoidCallback goToNextStep;
  List<String> dropdownItemList = ['Yes', 'No'];

  List<String> dropdownItemList1 = [
    "self-employed",
    "Private",
    "Govt_job",
    "Never_worked"
  ];

  Step3({
    super.key,
    required this.formData,
    required this.updateFormData,
    required this.goToPreviousStep,
    required this.goToNextStep,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 7.v),
                  child:
                      Text("Ever married", style: theme.textTheme.bodyMedium))),
          CustomDropDown(
              icon: Container(
                  margin: EdgeInsets.only(left: 30.h, right: 26.h),
                  child: CustomImageView(svgPath: ImageConstant.imgIcon)),
              margin: EdgeInsets.only(left: 6.h, top: 16.v, right: 6.h),
              hintText: "No",
              items: dropdownItemList,
              onChanged: (value) {
                updateFormData({"everMarried": value});
              }),
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 11.v),
                  child: Text("Work Type", style: theme.textTheme.bodyMedium))),
          CustomDropDown(
              icon: Container(
                  margin: EdgeInsets.only(left: 30.h, right: 26.h),
                  child: CustomImageView(svgPath: ImageConstant.imgIcon)),
              margin: EdgeInsets.only(left: 6.h, top: 14.v, right: 6.h),
              hintText: "self-employed",
              items: dropdownItemList1,
              onChanged: (value) {
                updateFormData({"workType": value});
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go next",
              rightIcon: Container(
                  margin: EdgeInsets.only(left: 8.h),
                  child: CustomImageView(
                      svgPath: ImageConstant.imgIconPrimarycontainer)),
              onTap: () {
                goToNextStep();
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go Back",
              leftIcon: Padding(
                padding: const EdgeInsets.only(right: 10),
                child: Icon(
                  MdiIcons.arrowLeftThin,
                  color: Colors.black,
                ),
              ),
              onTap: () {
                goToPreviousStep();
              }),
        ],
      ),
    );
  }
}

class Step4 extends StatelessWidget {
  final FormData formData;
  final Function(Map<String, dynamic>) updateFormData;
  final VoidCallback goToPreviousStep;
  final VoidCallback goToNextStep;
  List<String> dropdownItemList = ["Urban", "Rural"];

  List<String> dropdownItemList1 = [
    "formerly smoked",
    "never smoked ",
    "smokes"
  ];

  Step4({
    super.key,
    required this.formData,
    required this.updateFormData,
    required this.goToPreviousStep,
    required this.goToNextStep,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("Residence Type",
                      style: theme.textTheme.bodyMedium))),
          CustomDropDown(
              icon: Container(
                  margin: EdgeInsets.only(left: 30.h, right: 26.h),
                  child: CustomImageView(svgPath: ImageConstant.imgIcon)),
              margin: EdgeInsets.only(left: 6.h, top: 15.v, right: 6.h),
              hintText: "Urban",
              items: dropdownItemList,
              onChanged: (value) {
                updateFormData({"residence": value});
              }),
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 11.v),
                  child: Text("Smoking Status",
                      style: theme.textTheme.bodyMedium))),
          CustomDropDown(
              icon: Container(
                  margin: EdgeInsets.only(left: 30.h, right: 26.h),
                  child: CustomImageView(svgPath: ImageConstant.imgIcon)),
              margin: EdgeInsets.only(left: 6.h, top: 14.v, right: 6.h),
              hintText: "Smokes",
              items: dropdownItemList1,
              onChanged: (value) {
                updateFormData({"smokingStatus": value});
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go next",
              rightIcon: Container(
                  margin: EdgeInsets.only(left: 8.h),
                  child: CustomImageView(
                      svgPath: ImageConstant.imgIconPrimarycontainer)),
              onTap: () {
                goToNextStep();
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go Back",
              leftIcon: Padding(
                padding: const EdgeInsets.only(right: 10),
                child: Icon(
                  MdiIcons.arrowLeftThin,
                  color: Colors.black,
                ),
              ),
              onTap: () {
                goToPreviousStep();
              }),
        ],
      ),
    );
  }
}

class Step5 extends StatelessWidget {
  final FormData formData;
  final Function(Map<String, dynamic>) updateFormData;
  final VoidCallback goToPreviousStep;
  final VoidCallback goToNextStep;
  TextEditingController glucoselevelvalController =
      TextEditingController(text: "150");

  TextEditingController bmivalueoneController =
      TextEditingController(text: "80");

  Step5({
    super.key,
    required this.formData,
    required this.updateFormData,
    required this.goToPreviousStep,
    required this.goToNextStep,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("Average Glucose Level",
                      style: theme.textTheme.bodyMedium))),
          SizedBox(
            width: 250.h,
            child: TextFormField(
              controller: glucoselevelvalController,
              cursorColor: theme.colorScheme.primary,
              decoration: InputDecoration(
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(
                          width: 1, color: theme.colorScheme.primary))),
            ),
          ),
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("BMI", style: theme.textTheme.bodyMedium))),
          SizedBox(
            width: 250.h,
            child: TextFormField(
              controller: bmivalueoneController,
              cursorColor: theme.colorScheme.primary,
              decoration: InputDecoration(
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(
                          width: 1, color: theme.colorScheme.primary))),
            ),
          ),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go next",
              rightIcon: Container(
                  margin: EdgeInsets.only(left: 8.h),
                  child: CustomImageView(
                      svgPath: ImageConstant.imgIconPrimarycontainer)),
              onTap: () {
                updateFormData({
                  "glucoseLevel": double.parse(glucoselevelvalController.text)
                });
                updateFormData(
                    {"bmi": double.parse(bmivalueoneController.text)});
                goToNextStep();
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go Back",
              leftIcon: Padding(
                padding: const EdgeInsets.only(right: 10),
                child: Icon(
                  MdiIcons.arrowLeftThin,
                  color: Colors.black,
                ),
              ),
              onTap: () {
                goToPreviousStep();
              }),
        ],
      ),
    );
  }
}

class Step6 extends StatelessWidget {
  final FormData formData;
  final Function(Map<String, dynamic>) updateFormData;
  final VoidCallback goToPreviousStep;
  final VoidCallback goToNextStep;
  TextEditingController heightvalueController = TextEditingController();

  TextEditingController weightvaluController = TextEditingController();

  Step6({
    super.key,
    required this.formData,
    required this.updateFormData,
    required this.goToPreviousStep,
    required this.goToNextStep,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("Height", style: theme.textTheme.bodyMedium))),
          SizedBox(
            width: 250.h,
            child: TextFormField(
              controller: heightvalueController,
              cursorColor: theme.colorScheme.primary,
              decoration: InputDecoration(
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(
                          width: 1, color: theme.colorScheme.primary))),
            ),
          ),
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("Weight", style: theme.textTheme.bodyMedium))),
          SizedBox(
            width: 250.h,
            child: TextFormField(
              controller: weightvaluController,
              cursorColor: theme.colorScheme.primary,
              decoration: InputDecoration(
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(
                          width: 1, color: theme.colorScheme.primary))),
            ),
          ),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go next",
              rightIcon: Container(
                  margin: EdgeInsets.only(left: 8.h),
                  child: CustomImageView(
                      svgPath: ImageConstant.imgIconPrimarycontainer)),
              onTap: () {
                updateFormData({"height": heightvalueController.text});
                updateFormData({"weight": weightvaluController.text});
                goToNextStep();
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go Back",
              leftIcon: Padding(
                padding: const EdgeInsets.only(right: 10),
                child: Icon(
                  MdiIcons.arrowLeftThin,
                  color: Colors.black,
                ),
              ),
              onTap: () {
                goToPreviousStep();
              }),
        ],
      ),
    );
  }
}

class Step7 extends StatelessWidget {
  final FormData formData;
  final Function(Map<String, dynamic>) updateFormData;
  final VoidCallback goToPreviousStep;
  final VoidCallback goToNextStep;
  TextEditingController physicalActivityController = TextEditingController();

  TextEditingController dietvalueController = TextEditingController();

  Step7({
    super.key,
    required this.formData,
    required this.updateFormData,
    required this.goToPreviousStep,
    required this.goToNextStep,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("Physical Activity",
                      style: theme.textTheme.bodyMedium))),
          SizedBox(
            width: 250.h,
            child: TextFormField(
              controller: physicalActivityController,
              cursorColor: theme.colorScheme.primary,
              decoration: InputDecoration(
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(
                          width: 1, color: theme.colorScheme.primary))),
            ),
          ),
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("Diet", style: theme.textTheme.bodyMedium))),
          SizedBox(
            width: 250.h,
            child: TextFormField(
              controller: dietvalueController,
              cursorColor: theme.colorScheme.primary,
              decoration: InputDecoration(
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(
                          width: 1, color: theme.colorScheme.primary))),
            ),
          ),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go next",
              rightIcon: Container(
                  margin: EdgeInsets.only(left: 8.h),
                  child: CustomImageView(
                      svgPath: ImageConstant.imgIconPrimarycontainer)),
              onTap: () {
                updateFormData(
                    {"physicalActivity": physicalActivityController.text});
                updateFormData({"diet": dietvalueController.text});
                goToNextStep();
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go Back",
              leftIcon: Padding(
                padding: const EdgeInsets.only(right: 10),
                child: Icon(
                  MdiIcons.arrowLeftThin,
                  color: Colors.black,
                ),
              ),
              onTap: () {
                goToPreviousStep();
              }),
        ],
      ),
    );
  }
}

class Step8 extends StatelessWidget {
  final FormData formData;
  final Function(Map<String, dynamic>) updateFormData;
  final VoidCallback goToPreviousStep;
  final VoidCallback goToNextStep;
  TextEditingController sybpvalueController =
      TextEditingController(text: "150");

  TextEditingController diastolicvalueoneController =
      TextEditingController(text: "90");

  Step8({
    super.key,
    required this.formData,
    required this.updateFormData,
    required this.goToPreviousStep,
    required this.goToNextStep,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("Systolic Blood Pressure",
                      style: theme.textTheme.bodyMedium))),
          SizedBox(
            width: 250.h,
            child: TextFormField(
              controller: sybpvalueController,
              cursorColor: theme.colorScheme.primary,
              decoration: InputDecoration(
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(
                          width: 1, color: theme.colorScheme.primary))),
            ),
          ),
          Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: EdgeInsets.only(left: 6.h, top: 9.v),
                  child: Text("Diastolic Blood Pressure",
                      style: theme.textTheme.bodyMedium))),
          SizedBox(
            width: 250.h,
            child: TextFormField(
              controller: diastolicvalueoneController,
              cursorColor: theme.colorScheme.primary,
              decoration: InputDecoration(
                  focusedBorder: UnderlineInputBorder(
                      borderSide: BorderSide(
                          width: 1, color: theme.colorScheme.primary))),
            ),
          ),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go next",
              rightIcon: Container(
                  margin: EdgeInsets.only(left: 8.h),
                  child: CustomImageView(
                      svgPath: ImageConstant.imgIconPrimarycontainer)),
              onTap: () {
                goToNextStep();
                updateFormData(
                    {"diastolicBP": diastolicvalueoneController.text});
                updateFormData({"systolicBP": sybpvalueController.text});
              }),
          SizedBox(height: 11.v),
          CustomOutlinedButton(
              width: 151.h,
              text: "Go Back",
              leftIcon: Padding(
                padding: const EdgeInsets.only(right: 10),
                child: Icon(
                  MdiIcons.arrowLeftThin,
                  color: Colors.black,
                ),
              ),
              onTap: () {
                goToPreviousStep();
              }),
        ],
      ),
    );
  }
}
