import 'package:final_sprs/core/app_export.dart';
import 'package:final_sprs/screens/Drawer.dart';

// ignore_for_file: must_be_immutable
class InputForm extends StatefulWidget {
  const InputForm({Key? key}) : super(key: key);

  @override
  State<InputForm> createState() => _InputFormState();
}

class _InputFormState extends State<InputForm> {
  int currentStep = 1; // Keeps track of the current step
  FormData formData = FormData(); // Data model to hold form data

  void updateFormData(Map<String, dynamic> newData) {
    setState(() {
      if (newData.containsKey('gender')) {
        formData.gender = newData['gender'];
      }
      if (newData.containsKey('Age')) {
        formData.Age = newData['Age'];
      }
      if (newData.containsKey('physicalActivityLevel')) {
        formData.hypertension = newData['hypertension'];
      }
      if (newData.containsKey('heartDisease')) {
        formData.heartDisease = newData['heartDisease'];
      }

      if (newData.containsKey('systolicBP')) {
        formData.systolicBP = newData['systolicBP'];
      }
      if (newData.containsKey('diastolicBP')) {
        formData.diastolicBP = newData['diastolicBP'];
      }
      if (newData.containsKey('consentToDataCollection')) {
        formData.consentToDataCollection = newData['consentToDataCollection'];
      }
      if (newData.containsKey('everMarried')) {
        formData.consentToDataCollection = newData['everMarried'];
      }
      if (newData.containsKey('workType')) {
        formData.consentToDataCollection = newData['workType'];
      }
      if (newData.containsKey('residence')) {
        formData.consentToDataCollection = newData['residence'];
      }
      if (newData.containsKey('smokingStatus')) {
        formData.consentToDataCollection = newData['smokingStatus'];
      }
      if (newData.containsKey('glucoseLevel')) {
        formData.consentToDataCollection = newData['glucoseLevel'];
      }
      if (newData.containsKey('bmi')) {
        formData.consentToDataCollection = newData['bmi'];
      }
    });
  }

  void goToPreviousStep() {
    if (currentStep > 1) {
      setState(() {
        currentStep--;
      });
    }
  }

  void goToNextStep() {
    if (currentStep < 6) {
      setState(() {
        currentStep++;
      });
    }
  }

  List<String> dropdownItemList = ["Item One", "Item Two", "Item Three"];

  TextEditingController agevalueoneController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);
    return Scaffold(
        extendBody: true,
        extendBodyBehindAppBar: true,
        resizeToAvoidBottomInset: false,
        appBar: CustomAppBar(
            height: 80,
            leadingWidth: 60.h,
            leading: AppbarImage1(
                onTap: () {
                  Navigator.of(context)
                      .push(MaterialPageRoute(builder: (context) {
                    return const MyDrawer();
                  }));
                },
                svgPath: ImageConstant.imgMenu,
                margin: EdgeInsets.only(left: 14.h, top: 5.v, bottom: 40.v)),
            centerTitle: true,
            title: AppbarTitle(
                text: "Risk Assessment",
                margin: EdgeInsets.only(top: 5.v, bottom: 40.v)),
            styleType: Style.bgFill),
        body: Container(
            width: mediaQueryData.size.width,
            height: mediaQueryData.size.height,
            decoration: BoxDecoration(
                color: appTheme.whiteA700,
                image: DecorationImage(
                    image: AssetImage(ImageConstant.imgGroup57),
                    fit: BoxFit.cover)),
            child: SingleChildScrollView(
                padding: EdgeInsets.only(top: 161.v),
                child: currentStep != 6
                    ? Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                            SizedBox(
                              height: 100.h,
                            ),
                            Container(
                                width: 332.h,
                                margin: EdgeInsets.symmetric(horizontal: 48.h),
                                padding: EdgeInsets.symmetric(
                                    horizontal: 33.h, vertical: 8.v),
                                decoration: AppDecoration.fillCyan,
                                child: Column(children: [
                                  CustomImageView(
                                      imagePath: ImageConstant.imgImage4,
                                      height: 35.adaptSize,
                                      width: 35.adaptSize),
                                  SizedBox(height: 5.v),
                                  Text("NeuroGen",
                                      style: CustomTextStyles
                                          .titleLargeOpenSansBluegray800),
                                  SizedBox(height: 10.v),
                                  Text("Risk Assessment Prediction",
                                      style: theme.textTheme.labelLarge),
                                  Align(
                                      alignment: Alignment.centerLeft,
                                      child: Container(
                                          width: 240.h,
                                          margin: EdgeInsets.only(
                                              top: 12.v, right: 25.h),
                                          child: Text(
                                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
                                              maxLines: 2,
                                              overflow: TextOverflow.ellipsis,
                                              style: theme.textTheme.bodySmall!
                                                  .copyWith(height: 1.40)))),
                                  StepWidget(
                                    currentStep: currentStep,
                                    formData: formData,
                                    updateFormData: updateFormData,
                                    goToPreviousStep: goToPreviousStep,
                                    goToNextStep: goToNextStep,
                                  ),
                                  SizedBox(height: 6.v)
                                ])),
                            SizedBox(height: 167.v),
                          ])
                    : Container(
                        width: 332.h,
                        margin: EdgeInsets.symmetric(
                            horizontal: 48.h, vertical: 70.h),
                        padding: EdgeInsets.symmetric(
                            horizontal: 33.h, vertical: 8.v),
                        decoration: AppDecoration.fillCyan,
                        child: Column(children: [
                          CustomImageView(
                              imagePath: ImageConstant.imgImage4,
                              height: 35.adaptSize,
                              width: 35.adaptSize),
                          SizedBox(height: 5.v),
                          Text("NeuroGen",
                              style: CustomTextStyles
                                  .titleLargeOpenSansBluegray800),
                          SizedBox(height: 10.v),
                          Text("Risk Assessment Prediction",
                              style: theme.textTheme.labelLarge),
                          const SizedBox(
                            height: 20,
                          ),
                          Padding(
                            padding:
                                const EdgeInsets.only(right: 20.0, left: 10),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Result",
                                  style: theme.textTheme.labelLarge!
                                      .copyWith(fontSize: 20),
                                ),
                                Text(
                                  "40 %",
                                  style: theme.textTheme.labelLarge!.copyWith(
                                      color: Colors.blue.shade400,
                                      fontSize: 20),
                                )
                              ],
                            ),
                          ),
                          Container(
                              width: 240.h,
                              margin: EdgeInsets.only(top: 12.v, right: 5.h),
                              child: Text(
                                "John Doe, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
                                maxLines: 20,
                                overflow: TextOverflow.ellipsis,
                                style: theme.textTheme.bodySmall!
                                    .copyWith(height: 1.40, fontSize: 12),
                                textAlign: TextAlign.justify,
                              )),
                          const SizedBox(
                            height: 30,
                          ),
                          CustomElevatedButton(
                            text: "Retake",
                            width: 120.h,
                            buttonStyle: ButtonStyle(
                                backgroundColor: MaterialStatePropertyAll(
                                    theme.colorScheme.primary)),
                            buttonTextStyle: theme.textTheme.labelLarge!
                                .copyWith(fontSize: 16, color: Colors.white),
                            onTap: () {
                              setState(() {
                                currentStep = 1;
                                formData = FormData();
                              });
                            },
                          ),
                          const SizedBox(
                            height: 20,
                          )
                        ])))));
  }

  /// Navigates to the chatTwoScreen when the action is triggered.
  ///
  /// The [BuildContext] parameter is used to build the navigation stack.
  /// When the action is triggered, this function uses the [Navigator] widget
  /// to push the named route for the chatTwoScreen.
  onTapGonext(BuildContext context) {
    // Navigator.pushNamed(context, AppRoutes.chatTwoScreen);
  }
}
