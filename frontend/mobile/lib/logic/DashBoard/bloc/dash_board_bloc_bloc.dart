import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:final_sprs/data/repository/dashBoardRepository.dart';

import 'package:meta/meta.dart';

part 'dash_board_bloc_event.dart';
part 'dash_board_bloc_state.dart';

class DashBoardBloc extends Bloc<DashBoardBlocEvent, DashBoardBlocState> {
  DashBoardBloc() : super(DashBoardBlocInitial()) {
    on<userLoggedIn>(fetchUserData);
  }

  FutureOr<void> fetchUserData(
      userLoggedIn event, Emitter<DashBoardBlocState> emit) async* {
    final DashBoardRepository repository = DashBoardRepository();
    emit(DashBoardDataLoadingState());

    try {
      await repository.fetchData();
      emit(DashBoardDataLoadedState());
    } catch (e) {
      emit(DashBoardDataErrorState("erros $e"));
      
    }
  }
}
