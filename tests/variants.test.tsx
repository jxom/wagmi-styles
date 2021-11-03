import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import {
  themeA,
  themeB,
  ThemeProvider,
  style,
  styleVariants,
  useStyleVariants,
} from './theme';

describe('variants', () => {
  const variantsStyleRef = styleVariants({
    small: {
      width: 100,
      height: 100,
    },
    large: {
      width: 300,
      height: 300,
    },
  });

  function Variants() {
    const variantsStyle = useStyleVariants(variantsStyleRef);
    return (
      <>
        <View style={variantsStyle.small} />
        <View style={variantsStyle.large} />
      </>
    );
  }

  test('variants style', () => {
    const { toJSON } = render(
      <ThemeProvider theme={themeA}>
        <Variants />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  ////////////////////////////////////////////////////////////////////////////////

  const size = style((vars) => ({
    height: vars.sizes.small,
    width: vars.sizes.small,
  }));
  const spacing = style({ padding: 16, margin: 8 });
  const variantsWithCompositionStyleRef = styleVariants((vars) => ({
    primary: [size, spacing, { backgroundColor: vars.colors.primary }],
    secondary: [
      size,
      spacing,
      {
        backgroundColor: vars.colors.secondary,
      },
    ],
  }));

  function VariantsWithComposition() {
    const variantsStyle = useStyleVariants(variantsWithCompositionStyleRef);
    return <View style={variantsStyle.primary} />;
  }

  [themeA, themeB].forEach((theme) => {
    test('variants w/ composition style', () => {
      const { toJSON } = render(
        <ThemeProvider theme={theme}>
          <VariantsWithComposition />
        </ThemeProvider>
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
