import 'package:flutter/material.dart';

class BarData {
  const BarData( this.value, this.month);

  final double value;
  final String month;
}

List<BarData> convertDataList(List<Map<String, dynamic>> data) {
  List<BarData> dataList = [];

  for (var item in data) {
  
    final double value = item['value'].toDouble();
    final String month = item['month'];

    dataList.add(BarData( value, month));
  }

  return dataList;
}
