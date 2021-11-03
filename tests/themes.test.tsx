import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import * as FooTheme from './theme';
import * as BarTheme from './theme2';

describe('themed', () => {
  const simpleStyleRef = FooTheme.style({
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  });

  function Simple() {
    const simpleStyle = FooTheme.useStyle(simpleStyleRef);
    return <View style={simpleStyle} />;
  }

  test('simple style (wo/ ThemeProvider)', () => {
    const { toJSON } = render(<Simple />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('simple style (w/ ThemeProvider)', () => {
    const { toJSON } = render(
      <FooTheme.ThemeProvider theme={FooTheme.themeA}>
        <Simple />
      </FooTheme.ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  ///////////////////////////////////////////////////////////////////////////

  const styleWithVarsRef = FooTheme.style((vars) => ({
    color: vars.colors.primary,
    backgroundColor: vars.colors.secondary,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  }));

  function StyleWithVars() {
    const styleWithVars = FooTheme.useStyle(styleWithVarsRef);
    return <View style={styleWithVars} />;
  }

  [FooTheme.themeA, FooTheme.themeB].forEach((theme) => {
    test('style with theme vars', () => {
      const { toJSON } = render(
        <FooTheme.ThemeProvider theme={theme}>
          <StyleWithVars />
        </FooTheme.ThemeProvider>
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });

  ///////////////////////////////////////////////////////////////////////////

  const styleWithVars2Ref = BarTheme.style((vars) => ({
    color: vars.colors.primary,
    backgroundColor: vars.colors.secondary,
    padding: vars.spacings.large,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  }));

  function StyleWithVars2() {
    const styleWithVars2 = BarTheme.useStyle(styleWithVars2Ref);
    return <View style={styleWithVars2} />;
  }

  test('nested themes', () => {
    const { toJSON } = render(
      <FooTheme.ThemeProvider theme={FooTheme.themeA}>
        <StyleWithVars />
        <FooTheme.ThemeProvider theme={FooTheme.themeB}>
          <StyleWithVars />
          <BarTheme.ThemeProvider theme={BarTheme.themeC}>
            <StyleWithVars />
            <StyleWithVars2 />
          </BarTheme.ThemeProvider>
        </FooTheme.ThemeProvider>
      </FooTheme.ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
