import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:final_sprs/widgets/bar_data_converter.dart';
import 'package:final_sprs/resource/bar_data.dart';
import 'package:final_sprs/widgets/FetchBarChartData.dart';

// class MyBarChart extends StatefulWidget {
//   MyBarChart({super.key});

//   final shadowColor = const Color(0xFFCCCCCC);
//   // final List<BarData> dataList = convertDataList(exampleArray);

//   @override
//   State<MyBarChart> createState() => _MyBarChartState();
// }

// class _MyBarChartState extends State<MyBarChart> {
//   final barchartData = GetBarchartData();

//   Future<List<Map<String, dynamic>>?> fetchData1() async {
//     final fetchedData = await barchartData.fetchData();
//     return fetchedData;
//   }

//   void someFunction() async {
//     List<Map<String, dynamic>>? dataList = await fetchData1();

//     if (dataList != null) {
//       // Now you can work with the dataList.
//     }
//   }

//   FlLine buildDashedLine() {
//     return const FlLine(
//       color: Colors.grey,
//       strokeWidth: 1.0,
//       dashArray: [6, 4],
//     );
//   }

//   BarChartGroupData generateBarGroup(BarData data, int x) {
//     return BarChartGroupData(
//       x: x,
//       barRods: [
//         BarChartRodData(
//           toY: data.value,
//           gradient: const LinearGradient(
//             colors: [
//               Color(0xff10217D),
//               Color(0xffC893FD),
//               Color(0xffE0C6FD),
//               Color(0xffF0E5FC),
//               Color(0xffF2F1FF),
//             ],
//             begin: Alignment.topCenter,
//             end: Alignment.bottomCenter,
//             stops: [0.0, 0.25, 0.5, 0.75, 1.0],
//           ),
//           width: 24.0,
//         ),
//       ],
//       showingTooltipIndicators: touchedGroupIndex == x ? [0] : [],
//     );
//   }

//   int touchedGroupIndex = -1;

//   @override
//   Widget build(BuildContext context) {
//     return Padding(
//       padding: const EdgeInsets.only(left: 20, right: 20, top: 15),
//       child: AspectRatio(
//         aspectRatio: 1.4,
//         child: BarChart(
//           BarChartData(
//             alignment: BarChartAlignment.spaceBetween,
//             borderData: FlBorderData(
//               show: true,
//               border: const Border(
//                 bottom: BorderSide(
//                   color: Colors.grey,
//                   width: .5,
//                 ),
//               ),
//             ),
//             titlesData: FlTitlesData(
//               show: true,
//               leftTitles: AxisTitles(
//                 drawBelowEverything: true,
//                 sideTitles: SideTitles(
//                   showTitles: true,
//                   reservedSize: 30.0,
//                   getTitlesWidget: (value, meta) {
//                     return Text(
//                       value.toInt().toString(),
//                       textAlign: TextAlign.left,
//                     );
//                   },
//                 ),
//               ),
//               bottomTitles: AxisTitles(
//                 sideTitles: SideTitles(
//                   showTitles: true,
//                   reservedSize: 60.0,
//                   getTitlesWidget: (double value, meta) {
//                     final index = value.toInt();
//                     if (index >= 0 && index < widget.dataList!.length) {
//                       return Padding(
//                         padding: const EdgeInsets.only(top: 15),
//                         child: Text(
//                           widget.dataList![index].month,
//                           style: const TextStyle(
//                             fontSize: 12.0,
//                           ),
//                         ),
//                       );
//                     }
//                     return const Text('');
//                   },
//                 ),
//               ),
//               rightTitles: const AxisTitles(),
//               topTitles: const AxisTitles(),
//             ),
//             gridData: FlGridData(
//               show: true,
//               drawVerticalLine: false,
//               drawHorizontalLine: true,
//               checkToShowHorizontalLine: showAllGrids,
//               getDrawingHorizontalLine: (value) =>
//                   buildDashedLine(), // Use the custom dashed line
//             ),
//             barGroups: widget.dataList!.asMap().entries.map((e) {
//               final index = e.key;
//               final data = e.value;
//               return generateBarGroup(data, index);
//             }).toList(),
//             maxY: 100,
//             barTouchData: BarTouchData(
//               enabled: true,
//               handleBuiltInTouches: false,
//               touchTooltipData: BarTouchTooltipData(
//                 tooltipBgColor: Colors.transparent,
//                 tooltipMargin: 0,
//                 getTooltipItem: (
//                   BarChartGroupData group,
//                   int groupIndex,
//                   BarChartRodData rod,
//                   int rodIndex,
//                 ) {
//                   return BarTooltipItem(
//                     rod.toY.toString(),
//                     TextStyle(
//                       fontWeight: FontWeight.bold,
//                       color: rod.color,
//                       fontSize: 24.0,
//                       shadows: const [
//                         Shadow(
//                           color: Colors.black26,
//                           blurRadius: 12,
//                         )
//                       ],
//                     ),
//                   );
//                 },
//               ),
//               touchCallback: (event, response) {
//                 if (event.isInterestedForInteractions &&
//                     response != null &&
//                     response.spot != null) {
//                   setState(() {
//                     touchedGroupIndex = response.spot!.touchedBarGroupIndex;
//                   });
//                 } else {
//                   setState(() {
//                     touchedGroupIndex = -1;
//                   });
//                 }
//               },
//             ),
//           ),
//         ),
//       ),
//     );
//   }
// }

import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:final_sprs/widgets/bar_data_converter.dart';
import 'package:final_sprs/resource/bar_data.dart';
import 'package:final_sprs/widgets/FetchBarChartData.dart';

class MyBarChart extends StatefulWidget {
  MyBarChart({Key? key}) : super(key: key);

  @override
  State<MyBarChart> createState() => _MyBarChartState();
}

class _MyBarChartState extends State<MyBarChart> {
  final barchartData = GetBarchartData();
  List<Map<String, dynamic>>? dataList1;

  @override
  void initState() {
    super.initState();
    fetchData1().then((data) {
      setState(() {
        print("I got : $data");
        dataList1 = data;
      });
    });
  }

  Future<List<Map<String, dynamic>>?> fetchData1() async {
    print("I have called.");
    final fetchedData = await barchartData.fetchData();
    print("I returned $fetchedData");
    return fetchedData;
  }

  FlLine buildDashedLine() {
    return const FlLine(
      color: Colors.grey,
      strokeWidth: 1.0,
      dashArray: [6, 4],
    );
  }

  BarChartGroupData generateBarGroup(BarData data, int x) {
    return BarChartGroupData(
      x: x,
      barRods: [
        BarChartRodData(
          toY: data.value,
          gradient: const LinearGradient(
            colors: [
              Color(0xff10217D),
              Color(0xffC893FD),
              Color(0xffE0C6FD),
              Color(0xffF0E5FC),
              Color(0xffF2F1FF),
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: [0.0, 0.25, 0.5, 0.75, 1.0],
          ),
          width: 24.0,
        ),
      ],
      showingTooltipIndicators: touchedGroupIndex == x ? [0] : [],
    );
  }

  int touchedGroupIndex = -1;

  @override
  Widget build(BuildContext context) {
    if (dataList1 == null) {
      // While data is being fetched, you can return a loading indicator or placeholder.
      return CircularProgressIndicator();
    } else {
      final List<BarData> dataList = convertDataList(dataList1!);
      // Now you can build the bar chart with the fetched dataList.
      return Padding(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 15),
        child: AspectRatio(
          aspectRatio: 1.4,
          child: BarChart(
            BarChartData(
              alignment: BarChartAlignment.spaceBetween,
              borderData: FlBorderData(
                show: true,
                border: const Border(
                  bottom: BorderSide(
                    color: Colors.grey,
                    width: .5,
                  ),
                ),
              ),
              titlesData: FlTitlesData(
                show: true,
                leftTitles: AxisTitles(
                  drawBelowEverything: true,
                  sideTitles: SideTitles(
                    showTitles: true,
                    reservedSize: 30.0,
                    getTitlesWidget: (value, meta) {
                      return Text(
                        value.toInt().toString(),
                        textAlign: TextAlign.left,
                      );
                    },
                  ),
                ),
                bottomTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    reservedSize: 60.0,
                    getTitlesWidget: (double value, meta) {
                      final index = value.toInt();
                      if (index >= 0 && index < dataList!.length) {
                        return Padding(
                            padding: const EdgeInsets.only(top: 15),
                            child: Text(
                              dataList[index].day,
                              style: const TextStyle(
                                fontSize: 12.0,
                              ),
                            ));
                      } else
                        return const Text('');
                    },
                  ),
                ),
                rightTitles: const AxisTitles(),
                topTitles: const AxisTitles(),
              ),
              gridData: FlGridData(
                show: true,
                drawVerticalLine: false,
                drawHorizontalLine: true,
                checkToShowHorizontalLine: showAllGrids,
                getDrawingHorizontalLine: (value) =>
                    buildDashedLine(), // Use the custom dashed line
              ),
              barGroups: dataList.asMap().entries.map((e) {
                final index = e.key;
                final data = e.value;
                return generateBarGroup(data, index);
              }).toList(),
              maxY: 100,
              barTouchData: BarTouchData(
                enabled: true,
                handleBuiltInTouches: false,
                touchTooltipData: BarTouchTooltipData(
                  tooltipBgColor: Colors.transparent,
                  tooltipMargin: 0,
                  getTooltipItem: (
                    BarChartGroupData group,
                    int groupIndex,
                    BarChartRodData rod,
                    int rodIndex,
                  ) {
                    return BarTooltipItem(
                      rod.toY.toString(),
                      TextStyle(
                        fontWeight: FontWeight.bold,
                        color: rod.color,
                        fontSize: 24.0,
                        shadows: const [
                          Shadow(
                            color: Colors.black26,
                            blurRadius: 12,
                          ),
                        ],
                      ),
                    );
                  },
                ),
                touchCallback: (event, response) {
                  if (event.isInterestedForInteractions &&
                      response != null &&
                      response.spot != null) {
                    setState(() {
                      touchedGroupIndex = response.spot!.touchedBarGroupIndex;
                    });
                  } else {
                    setState(() {
                      touchedGroupIndex = -1;
                    });
                  }
                },
              ),
            ),
          ),
        ),
      );
    }
  }
}
