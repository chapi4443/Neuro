import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import "../../../data/models/usermodel.dart";

part 'authentication_event.dart';
part 'authentication_state.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  AuthenticationBloc() : super(InitialAuthenticationState()) {
    @override
    Stream<AuthenticationState> mapEventToState(
        AuthenticationEvent event) async* {
      if (event is AppStarted) {
        // Check if the user is already authenticated (e.g., check local storage or token)
        final bool isAuthenticated =
            false; // Replace with your authentication check logic

        if (isAuthenticated) {
          yield Authenticated(UserModel(userId: '123'));
        } else {
          yield Unauthenticated();
        }
      }

      if (event is UserLoggedIn) {
        yield Authenticated(event.user);
      }

      if (event is UserLoggedOut) {
        // Perform logout operations
        yield Unauthenticated();
      }
    }
  }
}
