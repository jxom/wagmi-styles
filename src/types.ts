export type Tokens = {
  [key: string]: string | number | Tokens;
};

export type ThemeVars<ThemeContract extends Tokens> = MapLeafNodes<
  ThemeContract,
  any
>;

export type Contract = {
  [key: string]: any | null | Contract;
};

export type MapLeafNodes<Obj, LeafType> = {
  [Prop in keyof Obj]: Obj[Prop] extends Record<string | number, any>
    ? MapLeafNodes<Obj[Prop], LeafType>
    : LeafType;
};

export type ThemeDefinition<ThemeTokens extends Tokens> =
  ThemeVars<ThemeTokens> & {
    _id: string;
  };
