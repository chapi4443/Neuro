import 'package:final_sprs/logic/DashBoard/bloc/dash_board_bloc_bloc.dart';
import 'package:final_sprs/logic/login/bloc/login_block_bloc.dart';
import 'package:final_sprs/presentaion/core/app_export.dart';
import 'package:final_sprs/presentaion/screens/register_screen.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:final_sprs/presentaion/screens/profile_Screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final LoginBlockBloc loginBloc = LoginBlockBloc();
  final DashBoardBloc dashBoardBloc = DashBoardBloc();
  final bool _islogged = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      // home: _islogged ? const Dashboard() : const WelcomeScreen(),
      initialRoute: '/',
      routes: {
        '/': (context) => WelcomeScreen(),
        '/login': (context) => MultiBlocProvider(
              providers: [
                BlocProvider.value(
                  value: loginBloc,
                ),
                BlocProvider.value(value: dashBoardBloc)
              ],
              child: LoginScreen(),
            ),
        '/register': (context) =>
            BlocProvider.value(value: loginBloc, child: RegisterScreen()),
        '/Dashboard': (context) =>
            BlocProvider.value(value: dashBoardBloc, child: Dashboard())
            ,
            '/profile':(context)=>
            BlocProvider.value(value: dashBoardBloc, child: ProfilePage())
      },
      debugShowCheckedModeBanner: false,
    );
  }
}

Color mainColor = const Color.fromRGBO(22, 194, 213, 1);

class Dashboard extends StatefulWidget {
  const Dashboard({super.key});

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  int _selectedIndex = 1;

  Widget? _child;

  @override
  void initState() {
    _child = const DashBoard();
    super.initState();
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void _handleNavigationChange(int index) {
    setState(() {
      switch (index) {
        case 0:
          _child = const InputForm();
          break;
        case 1:
          _child = const DashBoard();
          break;
        case 2:
          _child = const Chat();
          break;
      }
      _child = AnimatedSwitcher(
        switchInCurve: Curves.easeOut,
        switchOutCurve: Curves.easeIn,
        duration: const Duration(milliseconds: 100),
        child: _child,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _child,
      bottomNavigationBar: FluidNavBar(
        icons: [
          FluidNavBarIcon(icon: MdiIcons.dataMatrix, extras: {"label": "home"}),
          FluidNavBarIcon(icon: MdiIcons.home, extras: {"label": "account"}),
          FluidNavBarIcon(icon: MdiIcons.chat, extras: {"label": "settings"}),
        ],
        onChange: _handleNavigationChange,
        style: FluidNavBarStyle(
            iconSelectedForegroundColor: Colors.white,
            iconUnselectedForegroundColor: Colors.white,
            iconBackgroundColor: mainColor,
            barBackgroundColor: mainColor),
        scaleFactor: 1.5,
        defaultIndex: 1,
        itemBuilder: (icon, item) => Semantics(
          label: icon.extras!["label"],
          child: item,
        ),
      ),
    );
  }
}
