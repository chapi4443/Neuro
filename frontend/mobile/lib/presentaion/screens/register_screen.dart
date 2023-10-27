import 'package:final_sprs/presentaion/core/app_export.dart';

// ignore_for_file: must_be_immutable
class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  TextEditingController emailController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

  TextEditingController confirmpasswordController = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: Form(
            key: _formKey,
            child: SizedBox(
                height: mediaQueryData.size.height,
                width: double.maxFinite,
                child: SingleChildScrollView(
                    child: Container(
                        width: mediaQueryData.size.width,
                        height: mediaQueryData.size.height,
                        margin: EdgeInsets.only(bottom: 105.v),
                        decoration: BoxDecoration(
                            color: appTheme.whiteA700,
                            image: DecorationImage(
                                image: AssetImage(ImageConstant.imgGroup57),
                                fit: BoxFit.cover)),
                        padding: EdgeInsets.symmetric(horizontal: 31.h),
                        child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text("Create Account",
                                  style: CustomTextStyles
                                      .headlineLargePoppinsPrimary),
                              Container(
                                  width: 320.h,
                                  margin: EdgeInsets.only(
                                      left: 22.h, top: 6.v, right: 22.h),
                                  child: Text(
                                      "Create an account so you can explore all the existing jobs",
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      textAlign: TextAlign.center,
                                      style: CustomTextStyles
                                          .titleSmallErrorContainer)),
                              CustomTextFormField(
                                  controller: emailController,
                                  margin:
                                      EdgeInsets.only(top: 50.v, right: 9.h),
                                  hintText: "Email",
                                  hintStyle:
                                      CustomTextStyles.titleMediumGray700,
                                  textInputType: TextInputType.emailAddress),
                              CustomTextFormField(
                                controller: passwordController,
                                margin: EdgeInsets.only(top: 26.v, right: 9.h),
                                hintText: "Password",
                                hintStyle: CustomTextStyles.titleMediumGray700,
                                textInputType: TextInputType.visiblePassword,
                                obscureText: true,
                              ),
                              CustomTextFormField(
                                controller: confirmpasswordController,
                                margin: EdgeInsets.only(top: 26.v, right: 9.h),
                                hintText: "Confirm Password",
                                hintStyle: CustomTextStyles.titleMediumGray700,
                                textInputAction: TextInputAction.done,
                                textInputType: TextInputType.visiblePassword,
                                obscureText: true,
                              ),
                              CustomElevatedButton(
                                height: 60.v,
                                text: "Sign up",
                                margin: EdgeInsets.only(top: 53.v, right: 9.h),
                                buttonStyle: CustomButtonStyles.outlineBlue,
                                buttonTextStyle:
                                    CustomTextStyles.titleLargePoppins,
                                onTap: () async {
                                  await Future.delayed(Duration.zero);

                                  // Navigator.of(context).push(
                                  //   MaterialPageRoute(builder: (context) {
                                  //     return const LoginScreen();
                                  //   }),
                                  // );
                                },
                              ),
                              CustomElevatedButton(
                                height: 41.v,
                                text: "Already have an account",
                                margin: EdgeInsets.only(top: 30.v, right: 9.h),
                                buttonStyle: CustomButtonStyles.fillWhiteA,
                                buttonTextStyle:
                                    CustomTextStyles.titleSmallGray800,
                                onTap: () async {
                                  await Future.delayed(Duration.zero);

                                  // Navigator.of(context).push(
                                  //   MaterialPageRoute(builder: (context) {
                                  //     return const LoginScreen();
                                  //   }),
                                  // );
                                },
                              ),
                              SizedBox(height: 64.v),
                              Text("Or continue with",
                                  style: theme.textTheme.titleSmall),
                              SizedBox(height: 20.v),
                              Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    CustomImageView(
                                        svgPath:
                                            ImageConstant.imgPhgooglelogobold,
                                        height: 24.adaptSize,
                                        width: 24.adaptSize),
                                    CustomImageView(
                                        svgPath:
                                            ImageConstant.imgIcsharpfacebook,
                                        height: 24.adaptSize,
                                        width: 24.adaptSize),
                                    CustomImageView(
                                        svgPath:
                                            ImageConstant.imgIcbaselineapple,
                                        height: 24.adaptSize,
                                        width: 24.adaptSize)
                                  ])
                            ]))))));
  }
}
