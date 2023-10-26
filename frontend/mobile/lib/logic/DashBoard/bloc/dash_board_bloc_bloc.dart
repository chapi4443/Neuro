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
      userLoggedIn event, Emitter<DashBoardBlocState> emit) async {
    final DashBoardRepository repository = DashBoardRepository();
    emit(DashBoardDataLoadingState());

    try {
       List<Map<String, dynamic>>? data = await repository.fetchData();
      Future.delayed(
        const Duration(seconds: 1),
      );
      emit(DashBoardDataLoadedState(data!));
    } catch (e) {
      emit(DashBoardDataErrorState("erros $e"));
    }
  }
}
