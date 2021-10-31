import { generateStyleFn } from './private/generateStyleFn';
import { generateStyleVariantsFn } from './private/generateStyleVariantsFn';
import type { ThemeDefinition, ThemeVars, Tokens } from './types';

export function createStyleFn<ThemeTokens extends Tokens>(
  ...themes: Array<ThemeDefinition<ThemeTokens>>
) {
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

  return { style, styleVariants };
}
