import 'package:final_sprs/presentaion/core/app_export.dart';
import 'package:final_sprs/presentaion/widgets/custom/custom_search_view.dart';

import '../widgets/botchat_item_widget.dart';

class MyDrawer extends StatefulWidget {
  const MyDrawer({Key? key}) : super(key: key);

  @override
  State<MyDrawer> createState() => _MyDrawerState();
}

class _MyDrawerState extends State<MyDrawer> {
  TextEditingController searchController = TextEditingController();
  bool isChatHistoryExpand = false;
  bool isTabed = false;

  @override
  Widget build(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);
    return Scaffold(
      extendBody: true,
      extendBodyBehindAppBar: false,
      resizeToAvoidBottomInset: false,
      appBar: CustomAppBar(
          height: 50.v,
          leadingWidth: 62.h,
          leading: AppbarImage1(
            svgPath: ImageConstant.imgClose,
            margin: EdgeInsets.only(left: 29.h, top: 11.v, bottom: 12.v),
            onTap: () {
              onTapCloseone(context);
            },
          ),
          centerTitle: true,
          title: AppbarTitle(text: "Chat"),
          styleType: Style.bgFill),
      body: Container(
        width: mediaQueryData.size.width,
        height: mediaQueryData.size.height,
        decoration: AppDecoration.fillPrimary,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 20.v,
                ),
                Text("New chat", style: CustomTextStyles.titleLargeSemiBold),
                SizedBox(height: 23.v),
                GestureDetector(
                  onTap: () {
                    setState(() {
                      isChatHistoryExpand = !isChatHistoryExpand;
                      isTabed = !isTabed;
                    });
                  },
                  child: Text(
                    "Chat History",
                    style: isTabed
                        ? CustomTextStyles.titleLargeBluegray800
                        : CustomTextStyles.titleLargeSemiBold,
                  ),
                ),
                AnimatedContainer(
                    duration: const Duration(milliseconds: 500),
                    height: isChatHistoryExpand ? 380 : 0,
                    child: isChatHistoryExpand
                        ? Column(children: [
                            CustomSearchView(
                              autofocus: false,
                              margin: EdgeInsets.only(
                                left: 7.h,
                                top: 23.v,
                                right: 7.h,
                              ),
                              controller: searchController,
                              hintText: "search here",
                              prefix: Container(
                                margin:
                                    EdgeInsets.fromLTRB(16.h, 12.v, 10.h, 12.v),
                                child: CustomImageView(
                                  svgPath: ImageConstant.imgSearch,
                                ),
                              ),
                              prefixConstraints:
                                  BoxConstraints(maxHeight: 48.v),
                              suffix: Padding(
                                padding: EdgeInsets.only(right: 15.h),
                                child: IconButton(
                                  onPressed: () {
                                    searchController.clear();
                                  },
                                  icon: Icon(
                                    MdiIcons.close,
                                    color: Colors.grey.shade600,
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(height: 10.v),
                            AnimatedOpacity(
                                duration: const Duration(milliseconds: 100),
                                opacity: isChatHistoryExpand ? 1.0 : 0.0,
                                child: Container(
                                    height: 300,
                                    margin: EdgeInsets.only(
                                      left: 7.h,
                                      right: 7.h,
                                    ),
                                    child: ListView.separated(
                                      physics: const BouncingScrollPhysics(),
                                      shrinkWrap: true,
                                      separatorBuilder: (context, index) {
                                        return SizedBox(height: 7.v);
                                      },
                                      itemCount: 5,
                                      itemBuilder: (context, index) {
                                        return BotchatItemWidget(
                                          onTapBotchat: () {
                                            onTapBotchat(context);
                                          },
                                        );
                                      },
                                    ))),
                          ])
                        : const SizedBox.shrink()),
                SizedBox(height: 23.v),
                Text("Profile", style: theme.textTheme.titleLarge),
                SizedBox(height: 26.v),
                Text("Setting", style: theme.textTheme.titleLarge),
              ],
            ),
          ),
        ),
      ),
    );
  }

  onTapBotchat(BuildContext context) {
    // Navigator.pushNamed(context, AppRoutes.chatNineScreen);
  }

  onTapCloseone(BuildContext context) {
    Navigator.pop(context);
  }

  onTapTxtNewchat(BuildContext context) {
    // Navigator.pushNamed(context, AppRoutes.chatFiveScreen);
  }
}
