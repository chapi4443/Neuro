import 'package:final_sprs/presentaion/core/app_export.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import "package:final_sprs/resource/percentIndicatorValue.dart";
import 'package:final_sprs/data/dataProviders/dashBoardData.dart';

class DashBoardRepository extends ChangeNotifier {
  List<Map<String, dynamic>>? predictionData;
  final percentIndicatorValue = PercentIndicatorValue();
  final DashBoardData dashBoardData = DashBoardData();

  DashBoardRepository();

      

  Future<List<Map<String, dynamic>>?> fetchData() async {
    final storage = FlutterSecureStorage();
    final sessionCookie = await storage.read(key: 'sessionCookies');
    var responseData;

    final apiUrl = Uri.parse(
        "http://10.4.102.52:5000/api/v1/predict/predictions/:6532a1c269fd9e9b6acc3e8a");
    try {
      final response = await http.get(apiUrl, headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionCookie!,
      });

      if (response.statusCode == 200) {
        
        final responseString = response.body;
        predictionData = processPredictions(responseString);
     

        dashBoardData.addToDashBoardData(predictionData);
        final finalData = dashBoardData.getDashBoardData();
        print("sent data $finalData");

     

        return predictionData; // Return the processed data
      } else {
        return null;
      }
    } catch (e) {
      throw Exception(e);
      return null;
    }
  }

  List<Map<String, dynamic>> processPredictions(responseString) {
    final responseJson = json.decode(responseString);
    final predictions = responseJson['predictions'] as List;

    List<Map<String, dynamic>> processedData = [];
    final daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    int startIndex = (predictions.length > 7) ? predictions.length - 7 : 0;
    for (int i = startIndex; i < predictions.length; i++) {
      final prediction = predictions[i];
      final predictionValue = (prediction['prediction'] * 100) as double;
      final dayIndex = i % 7;
      final day = daysOfWeek[dayIndex];

      final predictionDataItem = {
        'value': predictionValue,
        'day': day,
      };

      processedData.add(predictionDataItem);
    }

    return processedData;
  }
}
