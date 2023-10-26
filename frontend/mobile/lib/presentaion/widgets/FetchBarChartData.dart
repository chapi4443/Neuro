import 'package:final_sprs/presentaion/core/app_export.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import "package:final_sprs/resource/percentIndicatorValue.dart";

class GetBarchartData {
  List<Map<String, dynamic>>? predictionData;
  final percentIndicatorValue = PercentIndicatorValue();

  GetBarchartData();

  Future<List<Map<String, dynamic>>?> fetchData() async {
    final storage = FlutterSecureStorage();
    final sessionCookie = await storage.read(key: 'sessionCookies');
    var responseData;

    final apiUrl = Uri.parse(
        "http://10.4.118.75:5000/api/v1/predict/predictions/:6532a1c269fd9e9b6acc3e8a");
    try {
      final response = await http.get(apiUrl, headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionCookie!,
      });

      if (response.statusCode == 200) {
        final responseString = response.body;
        predictionData = processPredictions(responseString);
        return predictionData; // Return the processed data
        print("mydata is #################: $predictionData");
      } else {
        // Handle the case when the request fails
        print('Request failed with status: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      // Handle any exceptions
      print('Error: $e');
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
