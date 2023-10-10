import 'package:final_sprs/main.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final VoidCallback onBackTap;
  final VoidCallback onUserIconTap;
  final double paddingValue;

  const MyAppBar({super.key, 
    required this.title,
    required this.onBackTap,
    required this.onUserIconTap,
    required this.paddingValue,
  });

  @override
  Size get preferredSize => const Size.fromHeight(60.0);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 70,
      child: Container(
        decoration: BoxDecoration(color: mainColor),
        child: Row(
          children: [
            title != "DashBoard"
                ? Row(
                    children: [
                      IconButton(
                        icon: const FaIcon(
                          FontAwesomeIcons.angleLeft,
                        ),
                        onPressed: onBackTap,
                        color: Colors.white,
                      ),
                      const Text(
                        "NeuroGen",
                        style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: Colors.white),
                      ),
                    ],
                  )
                : const SizedBox(
                    width: 120,
                  ),
            const SizedBox(
              width: 50,
            ),
            Text(
              title,
              style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: Colors.white),
              textAlign: TextAlign.center,
            ),
            SizedBox(
              width: paddingValue,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 8),
              child: Row(
                children: [
                  Icon(
                    MdiIcons.accountCircle,
                    color: Colors.white,
                  ),
                  const SizedBox(width: 8.0),
                  const Text(
                    'User',
                    style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: Colors.white),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
