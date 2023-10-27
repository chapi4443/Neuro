part of 'login_block_bloc.dart';

@immutable
sealed class LoginState {}

class LoginInitialState extends LoginState {}

class LoginLoadingState extends LoginState {}

class LoginSuccessState extends LoginState {}

class LoginFailureState extends LoginState {
  final String error;

  LoginFailureState({required this.error});
}
