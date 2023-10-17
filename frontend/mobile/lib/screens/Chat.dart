import 'package:final_sprs/core/app_export.dart';

import 'package:dialog_flowtter/dialog_flowtter.dart';
import 'package:final_sprs/widgets/ChatMessage.dart';
import 'package:final_sprs/screens/Drawer.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Chat extends StatefulWidget {
  const Chat({Key? key}) : super(key: key);

  @override
  State<Chat> createState() => _ChatState();
}

class _ChatState extends State<Chat> {
  late DialogFlowtter dialogFlowtter;
  final TextEditingController _controller = TextEditingController();
  List<Map<String, dynamic>> messages = [];

  @override
  void initState() {
    super.initState();
    initializeDialogFlowtter();
  }

  Future<void> initializeDialogFlowtter() async {
    dialogFlowtter = await DialogFlowtter.fromFile();
  }

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
              text: "Chat", margin: EdgeInsets.only(top: 5.v, bottom: 40.v)),
          styleType: Style.bgFill),
      body: Container(
        width: mediaQueryData.size.width,
        height: mediaQueryData.size.height,
        decoration: BoxDecoration(
            color: appTheme.whiteA700,
            image: DecorationImage(
                image: AssetImage(ImageConstant.imgGroup57),
                fit: BoxFit.cover)),
        child: Column(
          mainAxisAlignment: messages.isEmpty
              ? MainAxisAlignment.spaceBetween
              : MainAxisAlignment.start,
          children: [
            if (messages.isEmpty)
              Expanded(
                  child: Align(
                      alignment: Alignment.center,
                      child: Container(
                          width: 300.h,
                          height: 230.h,
                          margin: const EdgeInsets.only(top: 0, bottom: 0),
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
                            Text("start your new chat here.",
                                style: theme.textTheme.labelLarge!.copyWith(
                                    color: Colors.black45, fontSize: 14)),
                            SizedBox(height: 10.v),
                          ]))))
            else
              Expanded(child: MessagesScreen(messages: messages)),
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.only(
                            bottom: 10.0, left: 20, right: 20),
                        child: TextField(
                          minLines: 1,
                          maxLines: null,
                          controller: _controller,
                          style: const TextStyle(color: Colors.black),
                          decoration: InputDecoration(
                            enabledBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                width: 1,
                                color: Colors.blue.shade400,
                              ),
                              borderRadius: BorderRadius.circular(50),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                width: 3,
                                color: Colors.blue.shade400,
                              ),
                              borderRadius: BorderRadius.circular(50),
                            ),
                            hintText: '       add your text here',
                            hintStyle: const TextStyle(color: Colors.grey),
                            suffixIcon: IconButton(
                              onPressed: () {
                                sendMessage(_controller.text);
                                _controller.clear();
                              },
                              icon: Icon(
                                MdiIcons.send,
                                color: Colors.blue,
                              ),
                            ),
                          ),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  sendMessage(String text) async {
    if (text.isEmpty) {
      print('message is empty');
    } else {
      setState(() {
        addMessage(text, true);
      });

      Future<void> postData() async {
        final Uri uri =
            Uri.parse('http://192.168.78.221:5000/api/v1/flask/medical');
        final Map<String, String> headers = {
          'Content-Type': 'application/json',
        };

        final Map<String, dynamic> body = {"question": text};

        try {
          final response =await http.post(uri, headers: headers, body: json.encode(body));
          print("the response is: {$response}");
          if (response.statusCode == 200) {
            final jsonResponse = json.decode(response.body);
            String responseText = jsonResponse["response"];
            print(jsonResponse);
            setState(() {
              addMessage(responseText);
            });
          } else {
            throw Exception('Failed to load data');
          }
        } catch (e) {
          print('the Error: $e');
        }
      }

      await postData();

      // DetectIntentResponse response = await dialogFlowtter.detectIntent(
      //     queryInput: QueryInput(text: TextInput(text: text)));

      // if (response.message == null) return;

      // setState(() {
      //   addMessage(response.message!);
      // });
    }
  }

  addMessage(String message, [bool isUserMessage = false]) {
    messages.add({'message': message, 'isUserMessage': isUserMessage});
  }
}
