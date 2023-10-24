import 'package:flutter/material.dart';

class BarData {
  const BarData(this.value, this.day);

  final double value;
  final String day;
}

List<BarData> convertDataList(List<Map<String, dynamic>> data) {
  List<BarData> dataList = [];

  for (var item in data) {
    final double value = item['value'].toDouble();
    final String day = item['day'];

    dataList.add(BarData(value, day));
  }

  return dataList;
}
