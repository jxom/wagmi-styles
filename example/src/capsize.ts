import { precomputeValues } from '@capsizecss/core';
import { PixelRatio } from 'react-native';

import { vars as themeVars } from './theme';

const capsize = (options: Parameters<typeof precomputeValues>[0]) => {
  const values = precomputeValues(options);
  const fontSize = parseFloat(values.fontSize);
  const baselineTrimEm = parseFloat(values.baselineTrim);
  const capHeightTrimEm = parseFloat(values.capHeightTrim);
  const fontScale = PixelRatio.getFontScale();

  return {
    fontSize,
    lineHeight:
      values.lineHeight !== 'normal'
        ? parseFloat(values.lineHeight)
        : undefined,
    marginBottom: PixelRatio.roundToNearestPixel(
      baselineTrimEm * fontSize * fontScale
    ),
    marginTop: PixelRatio.roundToNearestPixel(
      capHeightTrimEm * fontSize * fontScale
    ),
  } as const;
};

export const createTextStyle = (
  vars: typeof themeVars,
  {
    fontFamily: fontFamilyThemeKey,
    fontWeight,
    textSize,
  }: {
    fontFamily: keyof typeof themeVars.fontFamilies;
    fontWeight: keyof typeof themeVars.fontWeights[keyof typeof themeVars.fontFamilies];
    textSize: keyof typeof themeVars.textSizes[keyof typeof themeVars.fontFamilies];
  }
) => {
  const fontFamily = vars.fontFamilies[fontFamilyThemeKey];
  const { fontFamilySuffix = '' } =
    vars.fontWeights[fontFamilyThemeKey][fontWeight] || {};
  const fontMetrics = vars.fontMetrics[fontFamilyThemeKey];
  const letterSpacing =
    vars.textSizes[fontFamilyThemeKey][textSize].letterSpacing;
  const fontSize = vars.textSizes[fontFamilyThemeKey][textSize].fontSize;
  const leading = vars.textSizes[fontFamilyThemeKey][textSize].lineHeight;

  const styles = {
    fontFamily: fontFamilySuffix
      ? `${fontFamily}${fontFamilySuffix}`
      : fontFamily,
    letterSpacing,
    ...capsize({
      fontMetrics,
      fontSize,
      leading,
    }),
  } as const;

  const marginCorrection =
    fontSize in fontMetrics.marginCorrection
      ? fontMetrics.marginCorrection[fontSize]
      : 0;

  return {
    ...styles,
    marginTop: PixelRatio.roundToNearestPixel(
      styles.marginTop + marginCorrection
    ),
    marginBottom: PixelRatio.roundToNearestPixel(
      styles.marginBottom - marginCorrection
    ),
  };
};
