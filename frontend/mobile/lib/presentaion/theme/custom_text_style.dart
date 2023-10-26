import '../core/app_export.dart';

/// A collection of pre-defined text styles for customizing text appearance,
/// categorized by different font families and weights.
/// Additionally, this class includes extensions on [TextStyle] to easily apply specific font families to text.

class CustomTextStyles {
  // Body text style
  static get bodyLargeInterErrorContainer =>
      theme.textTheme.bodyLarge!.inter.copyWith(
        color: theme.colorScheme.errorContainer,
        fontSize: 17.fSize,
        fontWeight: FontWeight.w300,
      );
  static get bodyLargeRalewayOnPrimary =>
      theme.textTheme.bodyLarge!.raleway.copyWith(
        color: theme.colorScheme.onPrimary.withOpacity(0.5),
        fontSize: 16.fSize,
      );
  static get bodyMediumErrorContainer => theme.textTheme.bodyMedium!.copyWith(
        color: theme.colorScheme.errorContainer.withOpacity(1),
      );
  static get bodySmallErrorContainer => theme.textTheme.bodySmall!.copyWith(
        color: theme.colorScheme.errorContainer.withOpacity(1),
        fontSize: 10.fSize,
      );
  static get bodySmallInterBluegray600 =>
      theme.textTheme.bodySmall!.inter.copyWith(
        color: appTheme.blueGray600,
        fontSize: 11.fSize,
      );
  static get bodySmallInterGray500 => theme.textTheme.bodySmall!.inter.copyWith(
        color: appTheme.gray500,
        fontSize: 11.fSize,
        fontWeight: FontWeight.w400,
      );
  static get bodySmallInterIndigo900 =>
      theme.textTheme.bodySmall!.inter.copyWith(
        color: appTheme.indigo900,
        fontSize: 11.fSize,
        fontWeight: FontWeight.w400,
      );
  static get bodySmallOpenSansGray80001 =>
      theme.textTheme.bodySmall!.openSans.copyWith(
        color: appTheme.gray80001,
        fontWeight: FontWeight.w400,
      );
  // Headline text style
  static get headlineLargePoppinsPrimary =>
      theme.textTheme.headlineLarge!.poppins.copyWith(
        color: theme.colorScheme.primary,
        fontSize: 30.fSize,
        fontWeight: FontWeight.w700,
      );
  // Inter text style
  static get interIndigo900 => TextStyle(
        color: appTheme.indigo900,
        fontSize: 6.fSize,
        fontWeight: FontWeight.w400,
      ).inter;
  static get interIndigo900Regular => TextStyle(
        color: appTheme.indigo900,
        fontSize: 5.fSize,
        fontWeight: FontWeight.w400,
      ).inter;
  // Label text style
  static get labelLargeInterBluegray600 =>
      theme.textTheme.labelLarge!.inter.copyWith(
        color: appTheme.blueGray600,
        fontWeight: FontWeight.w700,
      );
  static get labelLargeOpenSansBluegray800 =>
      theme.textTheme.labelLarge!.openSans.copyWith(
        color: appTheme.blueGray800,
      );
  static get labelLargeOpenSansWhiteA700 =>
      theme.textTheme.labelLarge!.openSans.copyWith(
        color: appTheme.whiteA700,
      );
  static get labelMediumErrorContainer => theme.textTheme.labelMedium!.copyWith(
        color: theme.colorScheme.errorContainer.withOpacity(1),
        fontWeight: FontWeight.w600,
      );
  static get labelMediumInter => theme.textTheme.labelMedium!.inter.copyWith(
        fontSize: 11.fSize,
        fontWeight: FontWeight.w700,
      );
  // Title text style
  static get titleLargeBluegray800 => theme.textTheme.titleLarge!.copyWith(
        color: appTheme.blueGray800.withOpacity(0.4),
        fontWeight: FontWeight.w600,
      );
  static get titleLargeNunitoGray600 =>
      theme.textTheme.titleLarge!.nunito.copyWith(
        color: appTheme.gray600,
        fontWeight: FontWeight.w900,
      );
  static get titleLargeOpenSansBluegray800 =>
      theme.textTheme.titleLarge!.openSans.copyWith(
        color: appTheme.blueGray800,
        fontWeight: FontWeight.w600,
      );
  static get titleLargePoppins => theme.textTheme.titleLarge!.poppins.copyWith(
        fontWeight: FontWeight.w600,
      );
  static get titleLargePoppinsBlack900 =>
      theme.textTheme.titleLarge!.poppins.copyWith(
        color: appTheme.black900,
        fontWeight: FontWeight.w600,
      );
  static get titleLargePoppinsErrorContainer =>
      theme.textTheme.titleLarge!.poppins.copyWith(
        color: theme.colorScheme.errorContainer.withOpacity(1),
        fontWeight: FontWeight.w600,
      );
  static get titleLargePoppinsErrorContainerLight =>
      theme.textTheme.titleLarge!.poppins.copyWith(
        color: theme.colorScheme.errorContainer.withOpacity(0.4),
        fontWeight: FontWeight.w300,
      );
  static get titleLargeSemiBold => theme.textTheme.titleLarge!.copyWith(
        fontWeight: FontWeight.w600,
      );
  static get titleMediumGray700 => theme.textTheme.titleMedium!.copyWith(
        color: appTheme.gray700,
      );
  static get titleMediumInterBluegray900 =>
      theme.textTheme.titleMedium!.inter.copyWith(
        color: appTheme.blueGray900,
        fontWeight: FontWeight.w700,
      );
  static get titleMediumPrimaryContainer =>
      theme.textTheme.titleMedium!.copyWith(
        color: theme.colorScheme.primaryContainer,
      );
  static get titleMedium_1 => theme.textTheme.titleMedium!;
  static get titleSmallErrorContainer => theme.textTheme.titleSmall!.copyWith(
        color: theme.colorScheme.errorContainer.withOpacity(1),
        fontWeight: FontWeight.w500,
      );
  static get titleSmallGray800 => theme.textTheme.titleSmall!.copyWith(
        color: appTheme.gray800,
      );
  static get titleSmallInter => theme.textTheme.titleSmall!.inter.copyWith(
        fontWeight: FontWeight.w700,
      );
  static get titleSmallInterWhiteA700 =>
      theme.textTheme.titleSmall!.inter.copyWith(
        color: appTheme.whiteA700,
        fontSize: 15.fSize,
        fontWeight: FontWeight.w700,
      );
}

extension on TextStyle {
  TextStyle get poppins {
    return copyWith(
      fontFamily: 'Poppins',
    );
  }

  TextStyle get openSans {
    return copyWith(
      fontFamily: 'Open Sans',
    );
  }

  TextStyle get roboto {
    return copyWith(
      fontFamily: 'Roboto',
    );
  }

  TextStyle get nunito {
    return copyWith(
      fontFamily: 'Nunito',
    );
  }

  TextStyle get inter {
    return copyWith(
      fontFamily: 'Inter',
    );
  }

  TextStyle get raleway {
    return copyWith(
      fontFamily: 'Raleway',
    );
  }
}
