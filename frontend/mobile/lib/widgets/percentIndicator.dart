import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';

Widget buildCircularPercentIndicator(double percent) {
  return CircularPercentIndicator(
    radius: 130.0,
    lineWidth: 30.0,
    percent: percent,
    center: Text(
      "${(percent * 100).toStringAsFixed(1)}%",
      style: const TextStyle(
          fontSize: 30,
          fontWeight: FontWeight.bold,
          color: Color.fromRGBO(166, 93, 80, 1)),
    ),
    progressColor: const Color.fromRGBO(230, 109, 87, 1),
    backgroundColor: const Color.fromRGBO(22, 194, 213, 1),
  );
}

class PercentDiplay extends StatelessWidget {
  final double percent = 0.8;

  const PercentDiplay({super.key});

  @override
  Widget build(BuildContext context) {
    return buildCircularPercentIndicator(percent);
  }
}
