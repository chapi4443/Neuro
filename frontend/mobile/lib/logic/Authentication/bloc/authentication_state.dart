part of 'authentication_bloc.dart';

@immutable
sealed class AuthenticationState {}


class InitialAuthenticationState extends AuthenticationState {}

class Authenticated extends AuthenticationState {
  final UserModel user;

  Authenticated(this.user);

  @override
  List<Object> get props => [user];
}

class Unauthenticated extends AuthenticationState {}

