import 'package:final_sprs/core/app_export.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final bool _islogged = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Stroke Risk Analysis',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: _islogged ? const Dashboard() : const WelcomeScreen(),
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
