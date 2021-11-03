import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import { styled } from '../src';
import { styled as themeStyled } from './theme';

describe('styled component', () => {
  const Example = styled(View)({
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  });

  test('simple style', () => {
    const { toJSON } = render(<Example />);
    expect(toJSON()).toMatchSnapshot();
  });

  ////////////////////////////////////////////////////////////////////////////

  const ThemeExample = themeStyled(View)((vars) => ({
    backgroundColor: vars.colors.primary,
    color: vars.colors.secondary,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  }));

  test('with theme vars', () => {
    const { toJSON } = render(<ThemeExample />);
    expect(toJSON()).toMatchSnapshot();
  });

  ////////////////////////////////////////////////////////////////////////////

  const CompositionExample = themeStyled(View)((vars) => [
    {
      backgroundColor: vars.colors.primary,
      color: vars.colors.secondary,
    },
    {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
  ]);

  test('with composition', () => {
    const { toJSON } = render(<CompositionExample />);
    expect(toJSON()).toMatchSnapshot();
  });

  ////////////////////////////////////////////////////////////////////////////

  const ComponentCompositionExample = themeStyled(CompositionExample)(
    (vars) => [
      {
        backgroundColor: vars.colors.primary,
        color: vars.colors.secondary,
      },
    ]
  );

  test('with component composition', () => {
    const { toJSON } = render(<ComponentCompositionExample />);
    expect(toJSON()).toMatchSnapshot();
  });
});
