import 'package:carousel_slider/carousel_slider.dart';
import 'package:final_sprs/presentaion/core/app_export.dart';
import 'package:final_sprs/presentaion/theme/profileTheme.dart';

class CuCarousel extends StatelessWidget {
  const CuCarousel({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      alignment: Alignment.center,
      height: 130.h,
      child: CarouselSlider(
        options: CarouselOptions(
            enlargeFactor: .7,
            height: 400.0,
            aspectRatio: 16 / 9,
            viewportFraction: 0.6,
            initialPage: 0,
            enableInfiniteScroll: true,
            autoPlay: true),
        items: [
          "Personalized medical advice",
          "Tailored diet and exercise plans",
          "Stroke risk prediction",
          "Data-driven healthcare recommendations",
          "Natural language processing for health queries"
        ].map((i) {
          return Builder(
            builder: (BuildContext context) {
              return Container(
                  width: 500.h,
                  margin: const EdgeInsets.symmetric(horizontal: 4.0),
                  decoration: BoxDecoration(color: theme.colorScheme.primary),
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(10),
                      child: Text(
                        '$i',
                        textAlign: TextAlign.center,
                        style: theme.textTheme.displaySmall!.copyWith(
                            fontSize: 18,
                            fontWeight: FontWeight.w600,
                            color: Colors.white),
                      ),
                    ),
                  ));
            },
          );
        }).toList(),
      ),
    );
  }
}
