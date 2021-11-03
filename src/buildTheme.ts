import { createContext } from 'react';
import { generateStyled } from './private/generateStyled';
import { generateStyleFn } from './private/generateStyleFn';
import { generateStyleVariantsFn } from './private/generateStyleVariantsFn';
import { generateThemeProvider } from './private/generateThemeProvider';
import {
  generateUseStyle,
  generateUseStyleVariants,
} from './private/generateUseStyle';
import type { ThemeDefinition, ThemeVars, Tokens } from './types';

export function buildTheme<ThemeTokens extends Tokens>(
  ...themes: Array<ThemeDefinition<ThemeTokens>>
) {
  const ThemeContext = createContext({
    theme: { _id: themes?.[0]?._id || '_' },
  });

  const themeMap = (themes as Array<ThemeDefinition<ThemeTokens>>).reduce(
    (
      currentThemeMap: { [id: string]: ThemeVars<ThemeTokens> },
      theme: ThemeDefinition<ThemeTokens>
    ) => {
      return {
        ...currentThemeMap,
        [theme._id]: theme,
      };
    },
    {}
  );

  const style = generateStyleFn(
    themeMap as { [id: string]: ThemeVars<ThemeTokens> }
  );
  const styleVariants = generateStyleVariantsFn(
    themeMap as { [id: string]: ThemeVars<ThemeTokens> }
  );
  const ThemeProvider = generateThemeProvider(ThemeContext);
  const useStyle = generateUseStyle(ThemeContext);
  const useStyleVariants = generateUseStyleVariants(ThemeContext);
  const styled = generateStyled({ style, useStyle });

  return {
    style,
    styleVariants,
    styled,
    ThemeProvider,
    useStyle,
    useStyleVariants,
  };
}
