import * as React from 'react';
import type { StyleSheet } from 'react-native';

import type { StylesInput, ThemeVars, Tokens } from '../types';

export function generateStyled({
  style,
  useStyle,
}: {
  style: any;
  useStyle: any;
}) {
  return <
      T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
      ThemeTokens extends Tokens
    >(
      Component: any
    ) =>
    (
      styles:
        | ((vars: ThemeVars<ThemeTokens>) => StylesInput<T>)
        | StylesInput<T>
    ) => {
      const styleRef = style(styles);
      return (props: any) => {
        const theStyle = useStyle(styleRef);
        return (
          <Component {...props} style={[theStyle, ...(props.style || [])]} />
        );
      };
    };
}
