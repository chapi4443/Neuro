import 'package:final_sprs/presentaion/core/app_export.dart';
import 'package:final_sprs/presentaion/widgets/cu_carousel.dart';
import 'package:final_sprs/presentaion/screens/register_screen.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);
    return Scaffold(
        body: SizedBox(
            width: double.maxFinite,
            child: SingleChildScrollView(
                child: SizedBox(
                    height: mediaQueryData.size.height,
                    width: double.maxFinite,
                    child: Stack(alignment: Alignment.bottomLeft, children: [
                      Align(
                          alignment: Alignment.center,
                          child: Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 50.h, vertical: 366.v),
                              decoration: BoxDecoration(
                                  color: appTheme.whiteA700,
                                  image: DecorationImage(
                                      image:
                                          AssetImage(ImageConstant.imgGroup57),
                                      fit: BoxFit.cover)),
                              child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    SizedBox(height: 72.v),
                                    Text("Neurogen AI",
                                        style: theme.textTheme.displaySmall),
                                    Container(
                                        width: 321.h,
                                        margin: EdgeInsets.only(
                                            top: 24.v, right: 5.h),
                                        child: Text(
                                            "Explore all the existing job roles based on your interest and study major",
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                            textAlign: TextAlign.center,
                                            style: CustomTextStyles
                                                .bodyMediumErrorContainer)),
                                  ]))),
                      CustomImageView(
                          imagePath: ImageConstant.imgImage6,
                          height: 330.v,
                          width: 428.h,
                          alignment: Alignment.topCenter),
                      CustomImageView(
                          fit: BoxFit.contain,
                          imagePath: ImageConstant.imgEllipse2,
                          height: 380.v,
                          width: 375.h,
                          alignment: Alignment.topRight),
                      Align(
                          alignment: Alignment.bottomCenter,
                          child: Padding(
                              padding: EdgeInsets.only(bottom: 77.v),
                              child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    CustomElevatedButton(
                                        height: 60.v,
                                        width: 160.h,
                                        text: "Login",
                                        buttonStyle:
                                            CustomButtonStyles.outlineBlue,
                                        buttonTextStyle:
                                            CustomTextStyles.titleLargePoppins,
                                        onTap: () {
                                          onTapLogin(context);
                                        }),
                                    CustomElevatedButton(
                                        height: 60.v,
                                        width: 160.h,
                                        text: "Register",
                                        margin: EdgeInsets.only(left: 30.h),
                                        buttonStyle:
                                            CustomButtonStyles.fillWhiteA,
                                        buttonTextStyle: CustomTextStyles
                                            .titleLargePoppinsBlack900,
                                        onTap: () {
                                          onTapRegister(context);
                                        })
                                  ]))),
                      CustomImageView(
                          imagePath: ImageConstant.imgEllipse1,
                          height: 330.v,
                          width: 280.h,
                          alignment: Alignment.topRight),
                      const Padding(
                        padding: EdgeInsets.only(bottom: 180.0),
                        child: Align(
                          alignment: Alignment.bottomCenter,
                          child: CuCarousel(),
                        ),
                      ),
                    ])))));
  }

  /// Navigates to the loginScreen when the action is triggered.
  ///
  /// The [BuildContext] parameter is used to build the navigation stack.
  /// When the action is triggered, this function uses the [Navigator] widget
  /// to push the named route for the loginScreen.
  onTapLogin(BuildContext context) {
    Navigator.of(context).pushReplacementNamed("/login");
  }

  /// Navigates to the registerScreen when the action is triggered.
  ///
  /// The [BuildContext] parameter is used to build the navigation stack.
  /// When the action is triggered, this function uses the [Navigator] widget
  /// to push the named route for the registerScreen.
  onTapRegister(BuildContext context) {
    Navigator.of(context).push(MaterialPageRoute(builder: (context) {
      return const RegisterScreen();
    }));
  }
}
