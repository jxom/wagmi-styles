import { uid } from 'uid';

import type {
  Contract,
  MapLeafNodes,
  ThemeDefinition,
  ThemeVars,
  Tokens,
} from './types';

export function createTheme<ThemeTokens extends Tokens>(
  tokens: ThemeTokens
): [theme: ThemeDefinition<ThemeTokens>, vars: ThemeVars<ThemeTokens>];
export function createTheme<ThemeContract extends Contract>(
  themeContract: ThemeContract,
  tokens: MapLeafNodes<ThemeContract, string | number>
): ThemeDefinition<ThemeContract>;
export function createTheme(arg1: any, arg2?: any) {
  const contract = arg1;
  const tokens = arg2 || arg1;

  const themeId = uid();
  const theme = { _id: themeId, ...tokens };

  if (arg2) {
    return theme;
  }
  return [theme, contract];
}
