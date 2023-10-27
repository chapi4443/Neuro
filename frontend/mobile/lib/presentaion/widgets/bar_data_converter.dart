import 'package:flutter/material.dart';
import 'package:final_sprs/data/models/dashBoardDataModel.dart';

List<BarData> convertDataList(List<Map<String, dynamic>> data) {
  List<BarData> dataList = [];

  for (var item in data) {
    final double value = item['value'].toDouble();
    final String day = item['day'];

    dataList.add(BarData(value, day));
  }

  return dataList;
}
