import 'package:flutter/material.dart';

class BarData {
  const BarData(this.color, this.value, this.month);
  final Color color;
  final double value;
  final String month;
}

List<BarData> convertDataList(List<Map<String, dynamic>> data) {
  List<BarData> dataList = [];

  for (var item in data) {
    final Color color = item['color'];
    final double value = item['value'].toDouble();
    final String month = item['month'];

    dataList.add(BarData(color, value, month));
  }

  return dataList;
}
