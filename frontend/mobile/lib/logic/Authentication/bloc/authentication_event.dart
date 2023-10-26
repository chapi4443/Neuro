
part of 'authentication_bloc.dart';


@immutable
sealed class AuthenticationEvent {}

class AppStarted extends AuthenticationEvent {}

class UserLoggedIn extends AuthenticationEvent {
  final UserModel user;

  UserLoggedIn(this.user);

  @override
  List<Object> get props => [user];
}

class UserLoggedOut extends AuthenticationEvent {}
