import 'package:final_sprs/data/dataProviders/dashBoardData.dart';
import 'package:final_sprs/data/models/dashBoardDataModel.dart';
import 'package:final_sprs/presentaion/core/app_export.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:final_sprs/presentaion/widgets/bar_data_converter.dart';
import 'package:final_sprs/presentaion/widgets/FetchBarChartData.dart';

class MyBarChart extends StatefulWidget {
  final List<Map<String, dynamic>>? dataList1;
  MyBarChart({Key? key,required this.dataList1}) : super(key: key);

  @override
  State<MyBarChart> createState() => _MyBarChartState();
}

class _MyBarChartState extends State<MyBarChart> {
  final barchartData = GetBarchartData();
  final DashBoardData data = DashBoardData();
 

  @override
  void initState() {
    super.initState();
    // dataList1 = data.getDashBoardData();
  }

  Future<List<Map<String, dynamic>>?> fetchData1() async {
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
    if (widget.dataList1 != null) {
      List<BarData> dataList;
      dataList = convertDataList(widget.dataList1!);
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
    } else {
      return CircularProgressIndicator();
    }
  }
}
