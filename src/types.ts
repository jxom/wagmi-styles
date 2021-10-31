import type {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

export type Contract = {
  [key: string]: any | null | Contract;
};

export type MapLeafNodes<Obj, LeafType> = {
  [Prop in keyof Obj]: Obj[Prop] extends Record<string | number, any>
    ? MapLeafNodes<Obj[Prop], LeafType>
    : LeafType;
};

export type Styles = ViewStyle | TextStyle | ImageStyle;
export type StylesSet<T> = Array<T | Styles>;
export type StylesInput<T> = Styles | StylesSet<T>;

export type StyleRef<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
> = {
  _styleSheet: { [themeId: string]: T };
  _composedStyleSheets: { [themeId: string]: Array<T> };
};
export type VariantStyleRef<T> = {
  [variantKey: string]: StyleRef<T>;
};

export type StyleRefInput<T> = StyleRef<T> | VariantStyleRef<T>;

export type ThemeVars<ThemeContract extends Tokens> = MapLeafNodes<
  ThemeContract,
  any
>;

export type Tokens = {
  [key: string]: string | number | Tokens;
};

export type ThemeDefinition<ThemeTokens extends Tokens> =
  ThemeVars<ThemeTokens> & {
    _id: string;
  };

export type ThemeMap<ThemeTokens extends Tokens> = {
  [id: string]: ThemeVars<ThemeTokens>;
};
