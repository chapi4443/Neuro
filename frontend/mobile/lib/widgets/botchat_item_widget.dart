import 'package:final_sprs/core/app_export.dart';

// ignore: must_be_immutable
class BotchatItemWidget extends StatelessWidget {
  BotchatItemWidget({
    Key? key,
    this.onTapBotchat,
  }) : super(
          key: key,
        );

  VoidCallback? onTapBotchat;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        onTapBotchat?.call();
      },
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: 10.h,
          vertical: 6.v,
        ),
        decoration: AppDecoration.outlineBlueGray.copyWith(
          borderRadius: BorderRadiusStyle.roundedBorder10,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.only(left: 8.h),
              child: Row(
                children: [
                  CustomImageView(
                    imagePath: ImageConstant.imgImage421x21,
                    height: 21.adaptSize,
                    width: 21.adaptSize,
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                      left: 5.h,
                      top: 3.v,
                      bottom: 2.v,
                    ),
                    child: Text(
                      "dolor sit amet",
                      style: CustomTextStyles.labelMediumErrorContainer,
                    ),
                  ),
                ],
              ),
            ),
            Align(
              alignment: Alignment.centerRight,
              child: Padding(
                padding: EdgeInsets.only(
                  left: 29.h,
                  bottom: 16.v,
                ),
                child: Text(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...more",
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: CustomTextStyles.bodySmallErrorContainer.copyWith(
                    height: 1.40,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
