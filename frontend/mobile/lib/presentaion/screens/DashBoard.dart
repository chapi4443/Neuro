import 'package:final_sprs/logic/DashBoard/bloc/dash_board_bloc_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../widgets/bar_chart_sample7.dart';
import 'package:final_sprs/presentaion/widgets/percentIndicator.dart';
import 'package:final_sprs/presentaion/core/app_export.dart';
import 'package:final_sprs/presentaion/screens/Drawer.dart';
import 'package:final_sprs/presentaion/widgets/FetchBarChartData.dart';
import "package:final_sprs/resource/percentIndicatorValue.dart";

class DashBoard extends StatefulWidget {
  const DashBoard({super.key});

  @override
  State<DashBoard> createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final percentIndicatorValue = PercentIndicatorValue();

  var data;
  double percent = 0;
  void initState() {
    super.initState();
    double percent = percentIndicatorValue.getMyValue();
  }

  @override
  Widget build(context) {
    return BlocBuilder<DashBoardBloc, DashBoardBlocState>(
      bloc: BlocProvider.of(context),
      builder: (context, state) {
        if (state is DashBoardDataLoadingState) {
          return CircularProgressIndicator();
        } else if (state is DashBoardDataErrorState) {
          print(state.error);
          return ErrorWidget.withDetails(message: state.error,);
        } else {
          return Scaffold(
              extendBodyBehindAppBar: true,
              key: _scaffoldKey,
              drawer: const MyDrawer(),
              appBar: CustomAppBar(
                  height: 80,
                  leadingWidth: 60.h,
                  leading: AppbarImage1(
                      onTap: () {
                        // _scaffoldKey.currentState!.openDrawer();
                        Navigator.of(context)
                            .push(MaterialPageRoute(builder: (context) {
                          return const MyDrawer();
                        }));
                      },
                      svgPath: ImageConstant.imgMenu,
                      margin:
                          EdgeInsets.only(left: 14.h, top: 5.v, bottom: 40.v)),
                  centerTitle: true,
                  title: AppbarTitle(
                      text: "DashBoard",
                      margin: EdgeInsets.only(top: 5.v, bottom: 40.v)),
                  styleType: Style.bgFill),
              body: Container(
                width: mediaQueryData.size.width,
                height: mediaQueryData.size.height,
                decoration: BoxDecoration(
                    color: appTheme.whiteA700,
                    image: DecorationImage(
                        image: AssetImage(ImageConstant.imgGroup57),
                        fit: BoxFit.cover)),
                child: SingleChildScrollView(
                    child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      SizedBox(
                        height: MediaQuery.of(context).size.height * .16,
                      ),
                      PercentDiplay(),
                      SizedBox(
                          height: MediaQuery.of(context).size.height * .05),
                      Container(
                          padding:
                              const EdgeInsets.only(left: 16.0, right: 16.0),
                          child: SizedBox(
                            height: MediaQuery.of(context).size.height * .38,
                            child: Card(
                                child: Padding(
                              padding: const EdgeInsets.only(bottom: 0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  const Padding(
                                    padding: EdgeInsets.only(left: 20),
                                    child: Text(
                                      "Statistics ",
                                      style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.w400),
                                    ),
                                  ),
                                  const Padding(
                                    padding: EdgeInsets.only(left: 20),
                                    child: Text("Stroke risk",
                                        style: TextStyle(
                                            fontSize: 22,
                                            fontWeight: FontWeight.bold)),
                                  ),
                                  const Divider(
                                      thickness: 1.0, color: Colors.grey),
                                  // qwertyuio

                                  MyBarChart(),
                                ],
                              ),
                            )),
                          )),
                    ],
                  ),
                )),
              ));
        }
      },
    );
  }
}
