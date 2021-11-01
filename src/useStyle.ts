import {
  generateUseStyle,
  generateUseStyleVariants,
} from './private/generateUseStyle';

import { ThemeContext } from './ThemeProvider';
import type { StyleRef, VariantStyleRef } from './types';

export function useStyle<T>(styleRef: StyleRef<T>) {
  return generateUseStyle(ThemeContext)(styleRef);
}

export function useStyleVariants<T, V extends Record<string, StyleRef<T>>>(
  styleRef: VariantStyleRef<T, V>
) {
  return generateUseStyleVariants(ThemeContext)(styleRef);
}
