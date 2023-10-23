import 'package:flutter/material.dart';
import 'package:final_sprs/core/app_export.dart';
import 'package:final_sprs/screens/Drawer.dart';
import 'package:final_sprs/resource/DisplayForm.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:marquee/marquee.dart';

class RiskAssesmentDisplayer extends StatefulWidget {
  FormData? formData;
  final VoidCallback setIntial;

  RiskAssesmentDisplayer(
      {super.key, required this.formData, required this.setIntial});

  @override
  State<RiskAssesmentDisplayer> createState() => _RiskAssesmentDisplayerState();
}

class _RiskAssesmentDisplayerState extends State<RiskAssesmentDisplayer> {
  String advice = "";
  String result = "";
  double percentResult = 0.0;
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: CalculateRisk(widget.formData!),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
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
          final percent = (percentResult * 100).toStringAsFixed(1);
          print("data is: $snapshot");
          return Container(
              width: 332.h,
              margin: EdgeInsets.symmetric(horizontal: 48.h, vertical: 70.h),
              padding: EdgeInsets.symmetric(horizontal: 33.h, vertical: 8.v),
              decoration: AppDecoration.fillCyan,
              child: Column(children: [
                CustomImageView(
                    imagePath: ImageConstant.imgImage4,
                    height: 35.adaptSize,
                    width: 35.adaptSize),
                SizedBox(height: 5.v),
                Text("NeuroGen",
                    style: CustomTextStyles.titleLargeOpenSansBluegray800),
                SizedBox(height: 10.v),
                Text("Risk Assessment Prediction",
                    style: theme.textTheme.labelLarge),
                const SizedBox(
                  height: 20,
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 20.0, left: 10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "Result",
                        style:
                            theme.textTheme.labelLarge!.copyWith(fontSize: 20),
                      ),
                      Text(
                        "$percent %",
                        style: theme.textTheme.labelLarge!.copyWith(
                            color: Colors.blue.shade400, fontSize: 20),
                      )
                    ],
                  ),
                ),
                Container(
                    margin: EdgeInsets.only(top: 12.v, right: 5.h),
                    child: Column(children: [
                      Text(
                        result,
                        maxLines: 20,
                        overflow: TextOverflow.ellipsis,
                        style: theme.textTheme.bodySmall!
                            .copyWith(height: 1.40, fontSize: 12),
                        textAlign: TextAlign.justify,
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Text(
                        "Advice",
                        style:
                            theme.textTheme.labelLarge!.copyWith(fontSize: 20),
                        textAlign: TextAlign.start,
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Text(
                        advice,
                        style: theme.textTheme.bodySmall!
                            .copyWith(height: 1.40, fontSize: 12),
                        textAlign: TextAlign.justify,
                      )
                    ])),
                const SizedBox(
                  height: 30,
                ),
                CustomElevatedButton(
                  text: "Retake",
                  width: 120.h,
                  buttonStyle: ButtonStyle(
                      backgroundColor:
                          MaterialStatePropertyAll(theme.colorScheme.primary)),
                  buttonTextStyle: theme.textTheme.labelLarge!
                      .copyWith(fontSize: 16, color: Colors.white),
                  onTap: () {
                    setState(() {
                      widget.formData = FormData();
                    });
                    widget.setIntial();
                  },
                ),
                const SizedBox(
                  height: 20,
                )
              ]));
        }
      },
    );
  }

  Future<dynamic> CalculateRisk(FormData formData) async {
    final storage = FlutterSecureStorage();
    final sessionCookie = await storage.read(key: 'sessionCookies');
    var responseData;

    try {
      Future<void> postData(FormData formData) async {
        final apiUrl = Uri.parse(
            'http://192.168.1.221:5000/api/v1/predict/predict_stroke_risk');
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

        if (response.statusCode == 200) {
          responseData = json.decode(response.body);
          print(responseData);
          // Handle the response as neede

          advice = responseData["Advice"];
          result = responseData["Interpretation"];
          percentResult = responseData["Logistic Regression Probability"];
          print(percentResult);
        } else {
          // Handle the error

          print('Request failed with status: ${response.statusCode}');
        }
      }

      postData(formData);
    } catch (e) {
      print("error to risk Calculate: {$e}");
    }

    await Future.delayed(Duration(seconds: 5)); // Simulating an async operation
    return {"YourDataKey": responseData};
  }
}
