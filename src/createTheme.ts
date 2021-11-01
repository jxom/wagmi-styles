import { uid } from 'uid';

import type { Contract, MapLeafNodes, ThemeDefinition, Tokens } from './types';

export function createTheme<ThemeTokens extends Tokens>(
  tokens: ThemeTokens
): ThemeDefinition<ThemeTokens>;
export function createTheme<ThemeContract extends Contract>(
  themeContract: ThemeContract,
  tokens: MapLeafNodes<Omit<ThemeContract, '_id'>, string | number>
): ThemeDefinition<ThemeContract>;
export function createTheme(arg1: any, arg2?: any) {
  const tokens = arg2 || arg1;

  const themeId = uid();
  const theme = { _id: themeId, ...tokens };

  return theme;
}
