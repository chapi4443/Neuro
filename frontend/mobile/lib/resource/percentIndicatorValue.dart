class PercentIndicatorValue {
  double _myValue = 0;

  PercentIndicatorValue() {}
  double getMyValue() {
    return _myValue;
  }

  double get myValue => _myValue;

  set myValue(double newValue) {
    if (newValue >= 0) {
      _myValue = newValue;
    } else {
      print("Value cannot be negative");
    }
  }
}
