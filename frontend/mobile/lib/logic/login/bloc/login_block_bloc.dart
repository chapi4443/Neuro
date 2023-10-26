import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import '../../../data/repository/loginRepository.dart';

part 'login_block_event.dart';
part 'login_block_state.dart';

class LoginBlockBloc extends Bloc<LoginEvent, LoginState> {
  LoginBlockBloc() : super(LoginInitialState()) {
    print("I'm here 4");
    on<LoginButtonPressed>(LoginButtonClicked);
  }

  FutureOr<void> LoginButtonClicked(
      LoginButtonPressed event, Emitter<LoginState> emit) async {
    final repository = LoginRepository();

    emit(LoginLoadingState());
    try {
      // Call your repository to perform login here
      // Replace with your actual login logic
      print("I'm here 2");
      await repository.login(event.email, event.password);
      emit(LoginSuccessState());
    } catch (error) {
      emit(LoginFailureState(error: 'Login failed'));
    }
  }
}
