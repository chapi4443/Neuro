import 'package:final_sprs/data/dataProviders/dashBoardData.dart';
import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import "package:final_sprs/resource/percentIndicatorValue.dart";
import 'package:final_sprs/presentaion/widgets/FetchBarChartData.dart';

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

class PercentDiplay extends StatefulWidget {
 final List<Map<String, dynamic>>? data;
  PercentDiplay({
    super.key,required this.data
  });

  @override
  State<PercentDiplay> createState() => _PercentDiplayState();
}

class _PercentDiplayState extends State<PercentDiplay> {
  final barchartData = GetBarchartData();
  List<Map<String, dynamic>>? dataList1;
  // DashBoardData data = DashBoardData();
  double percent = 0;

  @override
  void initState() {
    super.initState();
    // fetchData1().then((data) {
    //   setState(() {
    //     print("I got : $data");
    //     dataList1 = data;
    //   });
    // });
    
    // print("arrived data: $dataList1");
  }

  Future<List<Map<String, dynamic>>?> fetchData1() async {
    print("I have called.");
    final fetchedData = await barchartData.fetchData();
    print("I returned $fetchedData");
    return fetchedData;
  }

  @override
  Widget build(BuildContext context) {
    percent = widget.data![widget.data!.length - 1]["value"] / 100;
    

    return buildCircularPercentIndicator(percent);
  }
}
