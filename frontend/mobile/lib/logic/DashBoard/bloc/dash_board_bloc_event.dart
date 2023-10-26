part of 'dash_board_bloc_bloc.dart';

@immutable
sealed class DashBoardBlocEvent {}

class userLoggedIn extends DashBoardBlocEvent{}
class userTakeAssesment extends DashBoardBlocEvent{}
