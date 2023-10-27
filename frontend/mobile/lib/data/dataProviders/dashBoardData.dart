import 'package:final_sprs/data/models/dashBoardDataModel.dart';

class DashBoardData {
  List<Map<String, dynamic>>  _dashBoardDataArray = [];

  void addToDashBoardData(data) {
    _dashBoardDataArray = data;
  }

  List<Map<String, dynamic>> getDashBoardData() {
    return _dashBoardDataArray;
  }

  void clearDashBoardData() {
    _dashBoardDataArray.clear();
  }
}
