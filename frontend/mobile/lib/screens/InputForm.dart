import 'package:final_sprs/core/app_export.dart';
import 'package:final_sprs/screens/Drawer.dart';
import 'package:final_sprs/resource/DisplayForm.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// ignore_for_file: must_be_immutable
class InputForm extends StatefulWidget {
  const InputForm({Key? key}) : super(key: key);

  @override
  State<InputForm> createState() => _InputFormState();
}

class _InputFormState extends State<InputForm> {
  int currentStep = 1; // Keeps track of the current step
  FormData formData = FormData(); // Data model to hold form data
  bool isStarted = false;

  void updateFormData(Map<String, dynamic> newData) {
    setState(() {
      if (newData.containsKey('gender')) {
        formData.gender = newData['gender'];
      }
      if (newData.containsKey('Age')) {
        formData.age = newData['Age'];
      }
      // if (newData.containsKey('physicalActivity')) {
      //   formData.physicalActivity = newData['physicalActivity'];
      // }
      if (newData.containsKey('hypertension')) {
        formData.hypertension = newData['hypertension'];
      }
      if (newData.containsKey('heartDisease')) {
        formData.heartDisease = newData['heartDisease'];
      }

      // if (newData.containsKey('systolicBP')) {
      //   formData.systolicBP = newData['systolicBP'];
      // }
      // if (newData.containsKey('diastolicBP')) {
      //   formData.diastolicBP = newData['diastolicBP'];
      // }

      if (newData.containsKey('everMarried')) {
        formData.everMarried = newData['everMarried'];
      }
      if (newData.containsKey('workType')) {
        formData.workType = newData['workType'];
      }
      if (newData.containsKey('residence')) {
        formData.residenceType = newData['residence'];
      }
      if (newData.containsKey('smokingStatus')) {
        formData.smokingStatus = newData['smokingStatus'];
      }
      if (newData.containsKey('glucoseLevel')) {
        formData.avgGlucoseLevel = newData['glucoseLevel'];
      }
      if (newData.containsKey('bmi')) {
        formData.bmi = newData['bmi'];
      }
      // if (newData.containsKey('weight')) {
      //   formData.weight = newData['weight'];
      // }
      // if (newData.containsKey('height')) {
      //   formData.height = newData['height'];
      // }

      // if (newData.containsKey('diet')) {
      //   formData.diet = newData['diet'];
      // }
      // if (newData.containsKey('diastolicBP')) {
      //   formData.diastolicBP = newData['diastolicBP'];
      // }
      // if (newData.containsKey('systolicBP')) {
      //   formData.systolicBP = newData['systolicBP'];
      // }
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
    if (currentStep < 10) {
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
              child: !isStarted
                  ? Align(
                      alignment: Alignment.center,
                      child: Container(
                          width: 310.h,
                          height: 340.h,
                          margin: const EdgeInsets.only(top: 100, bottom: 0),
                          padding: EdgeInsets.symmetric(
                              horizontal: 33.h, vertical: 8.v),
                          decoration: AppDecoration.fillCyan,
                          child: Column(children: [
                            SizedBox(height: 20.v),
                            CustomImageView(
                                imagePath: ImageConstant.imgImage4,
                                height: 100.adaptSize,
                                width: 80.adaptSize),
                            SizedBox(height: 5.v),
                            Text("NeuroGen",
                                style: CustomTextStyles
                                    .titleLargeOpenSansBluegray800
                                    .copyWith()),
                            SizedBox(height: 10.v),
                            Text(
                              "John Doe, consectetur adipiscing elit,  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
                              maxLines: 20,
                              overflow: TextOverflow.ellipsis,
                              style: theme.textTheme.bodySmall!
                                  .copyWith(height: 1.40, fontSize: 12),
                              textAlign: TextAlign.justify,
                            ),
                            SizedBox(height: 30.v),
                            CustomElevatedButton(
                              text: "Start",
                              width: 120.h,
                              buttonStyle: ButtonStyle(
                                  backgroundColor: MaterialStatePropertyAll(
                                      theme.colorScheme.primary)),
                              buttonTextStyle: theme.textTheme.labelLarge!
                                  .copyWith(fontSize: 16, color: Colors.white),
                              onTap: () {
                                setState(() {
                                  isStarted = true;
                                });
                              },
                            ),
                            SizedBox(height: 10.v),
                          ])))
                  : currentStep != 9
                      ? Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                              SizedBox(
                                height: 100.h,
                              ),
                              Container(
                                  width: 332.h,
                                  margin:
                                      EdgeInsets.symmetric(horizontal: 48.h),
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
                                                style: theme
                                                    .textTheme.bodySmall!
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
                      : FutureBuilder(
                          future: CalculateRisk(formData),
                          builder: (context, snapshot) {
                            if (snapshot.connectionState ==
                                ConnectionState.waiting) {
                              // While data is being fetched, display a loading indicator
                              return Center(
                                child: CircularProgressIndicator(),
                              );
                            } else if (snapshot.hasError) {
                              // If there's an error, you can display an error message

                              return Center(
                                child: Text('Error: ${snapshot.error}'),
                              );
                            } else {
                              print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                              // When data is available, display it in the Container
                              final data = snapshot.data;
                              return Container(
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
                                      padding: const EdgeInsets.only(
                                          right: 20.0, left: 10),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            "Result",
                                            style: theme.textTheme.labelLarge!
                                                .copyWith(fontSize: 20),
                                          ),
                                          Text(
                                            "40 %",
                                            style: theme.textTheme.labelLarge!
                                                .copyWith(
                                                    color: Colors.blue.shade400,
                                                    fontSize: 20),
                                          )
                                        ],
                                      ),
                                    ),
                                    Container(
                                        width: 240.h,
                                        margin: EdgeInsets.only(
                                            top: 12.v, right: 5.h),
                                        child: Column(
                                          children: [
                                            Text(
                                              "John Doe, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
                                              maxLines: 20,
                                              overflow: TextOverflow.ellipsis,
                                              style: theme.textTheme.bodySmall!
                                                  .copyWith(
                                                      height: 1.40,
                                                      fontSize: 12),
                                              textAlign: TextAlign.justify,
                                            ),
                                            SizedBox(
                                              height: 20,
                                            ),
                                            Text(
                                              "Advice",
                                              style: theme.textTheme.labelLarge!
                                                  .copyWith(fontSize: 20),
                                              textAlign: TextAlign.start,
                                            ),
                                            SizedBox(
                                              height: 20,
                                            ),
                                            Text(
                                              "Diet: Adopt a heart-healthy diet that's low in saturated fats, sodium, and added sugars. Emphasize fruits, vegetables, whole grains, lean protein, and healthy fats.",
                                              // overflow: TextOverflow.ellipsis,
                                              style: theme.textTheme.bodySmall!
                                                  .copyWith(
                                                      height: 1.40,
                                                      fontSize: 12),
                                              textAlign: TextAlign.justify,
                                            )
                                          ],
                                        )),
                                    const SizedBox(
                                      height: 30,
                                    ),
                                    CustomElevatedButton(
                                      text: "Retake",
                                      width: 120.h,
                                      buttonStyle: ButtonStyle(
                                          backgroundColor:
                                              MaterialStatePropertyAll(
                                                  theme.colorScheme.primary)),
                                      buttonTextStyle:
                                          theme.textTheme.labelLarge!.copyWith(
                                              fontSize: 16,
                                              color: Colors.white),
                                      onTap: () {
                                        setState(() {
                                          print("the result is : {$formData}");
                                          FormDataPrinter.displayFormData(
                                              formData);
                                          currentStep = 1;
                                          formData = FormData();
                                        });
                                      },
                                    ),
                                    const SizedBox(
                                      height: 20,
                                    )
                                  ]));
                            }
                          },
                        ),
            )));
  }

  onTapGonext(BuildContext context) {
    // Navigator.pushNamed(context, AppRoutes.chatTwoScreen);
  }

  Future<dynamic> CalculateRisk(FormData formData) async {
    final storage = FlutterSecureStorage();
    final sessionCookie = await storage.read(key: 'sessionCookies');

    try {
      Future<void> postData(FormData formData) async {
        print("######################################");

        final apiUrl = Uri.parse(
            'http://10.4.103.212:5000/api/v1/predict/predict_stroke_risk');
        final requestData = {
          'data': [formData.toMap()]
        };

        final response = await http.post(
          apiUrl,
          body: jsonEncode(requestData),
          headers: {
            'Content-Type': 'application/json',
            'Cookie': sessionCookie!,
          },
        );

        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        if (response.statusCode == 200) {
          final responseData = json.decode(response.body);
          // Handle the response as needed
          print('Response Data:');
          print('Advice: ${responseData["Advice"]}');
          print('Interpretation: ${responseData["Interpretation"]}');
          print(
              'Logistic Regression Probability: ${responseData["Logistic Regression Probability"]}');
        } else {
          // Handle the error
          print(response.body);
          print('Request failed with status: ${response.statusCode}');

          print("response body:");
        }
      }

      postData(formData);
    } catch (e) {
      print("error to risk Calculate: {$e}");
    }

    await Future.delayed(Duration(seconds: 2)); // Simulating an async operation
    return {"YourDataKey": "YourDataValue"};
  }
}
