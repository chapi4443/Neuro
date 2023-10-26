import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:animated_text_kit/animated_text_kit.dart';

class MessagesScreen extends StatefulWidget {
  final List messages;
  const MessagesScreen({Key? key, required this.messages}) : super(key: key);

  @override
  State<MessagesScreen> createState() => _MessagesScreenState();
}

class _MessagesScreenState extends State<MessagesScreen> {
  var isClicked = false;
  @override
  Widget build(BuildContext context) {
    var w = MediaQuery.of(context).size.width;
    return ListView.separated(
        itemBuilder: (context, index) {
          return SizedBox(
            width: MediaQuery.of(context).size.width,
            child: Container(
              decoration: BoxDecoration(
                  color: widget.messages[index]['isUserMessage']
                      ? Colors.white
                      : const Color.fromRGBO(137, 222, 226, .2),
                  border: widget.messages[index]['isUserMessage']
                      ? null
                      : isClicked
                          ? const Border(
                              top: BorderSide(width: 1, color: Colors.black),
                              bottom: BorderSide(width: 1, color: Colors.black))
                          : null),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const SizedBox(
                          width: 20,
                        ),
                        Icon(
                          widget.messages[index]['isUserMessage']
                              ? MdiIcons.accountCircle
                              : MdiIcons.android,
                          color: Colors.blue,
                          size: 28,
                        ),
                        const SizedBox(
                          width: 10,
                        ),
                        Text(
                          widget.messages[index]['isUserMessage']
                              ? "User"
                              : "NeuroGen",
                          style: const TextStyle(
                              color: Colors.black,
                              fontSize: 18,
                              fontWeight: FontWeight.w600),
                          textAlign: TextAlign.justify,
                        )
                      ],
                    ),
                    Container(
                        padding: const EdgeInsets.only(
                            bottom: 10, right: 5, left: 50, top: 5),
                        decoration: const BoxDecoration(),
                        child: widget.messages[index]['isUserMessage']
                            ? Text(
                                widget.messages[index]['message'],
                                style: TextStyle(
                                    color: Colors.black, fontSize: 16),
                              )
                            : AnimatedTextKit(
                                totalRepeatCount: 1,
                                isRepeatingAnimation: false,
                                animatedTexts: [
                                  TypewriterAnimatedText(
                                      widget.messages[index]['message'],
                                      textStyle: const TextStyle(
                                          color: Colors.black, fontSize: 16),
                                      speed: Duration(milliseconds: 30)),
                                ],
                              )),
                  ],
                ),
              ),
            ),
          );
        },
        separatorBuilder: (_, i) =>
            const Padding(padding: EdgeInsets.only(top: .01)),
        itemCount: widget.messages.length);
  }
}

