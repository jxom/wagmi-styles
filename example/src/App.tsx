import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useFonts } from 'expo-font';

import { createTextStyle } from './capsize';
import {
  themeA,
  themeB,
  style,
  styleVariants,
  ThemeProvider,
  useStyle,
  useStyleVariants,
} from './theme';

export default function App() {
  const [theme, setTheme] = React.useState(themeA);
  const [loaded] = useFonts({
    SFProRounded: require('./assets/fonts/SF-Pro-Rounded-Regular.otf'),
    SFProRoundedMedium: require('./assets/fonts/SF-Pro-Rounded-Medium.otf'),
    SFProRoundedHeavy: require('./assets/fonts/SF-Pro-Rounded-Heavy.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <View style={{ marginBottom: 32 }}>
          <TouchableOpacity onPress={() => setTheme(themeA)}>
            <Text>Theme A</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTheme(themeB)}>
            <Text>Theme B</Text>
          </TouchableOpacity>
        </View>
        <SimpleExample />
        {/* <CompositionExample /> */}
        {/* <VariantsExample variant="primary" /> */}
        {/* <VariantsExample variant="secondary" /> */}
        {/* <CapsizeExample /> */}
      </Layout>
    </ThemeProvider>
  );
}

////////////////////////////////////////////////////////////////////////////////

export const layoutStyleRef = style({
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
});

function Layout(props: any) {
  const layoutStyle = useStyle(layoutStyleRef);
  return <View style={layoutStyle} {...props} />;
}

////////////////////////////////////////////////////////////////////////////////

export const boxStyleRef = style((vars) => ({
  backgroundColor: vars.colors.primary,
  height: 100,
  width: 100,
}));

function SimpleExample() {
  const boxStyle = useStyle(boxStyleRef);
  return (
    <View>
      <View style={boxStyle} />
    </View>
  );
}

////////////////////////////////////////////////////////////////////////////////

export const size = style((vars) => ({
  height: vars.sizes.small,
  width: vars.sizes.small,
}));
export const spacing = style({ padding: 16, margin: 8 });
export const composedBoxStyleRef = style([
  size,
  spacing,
  {
    backgroundColor: 'red',
  },
]);

function CompositionExample() {
  const boxStyle = useStyle(composedBoxStyleRef);
  return (
    <View>
      <View style={boxStyle} />
    </View>
  );
}

////////////////////////////////////////////////////////////////////////////////

export const variantBoxStyleRef = styleVariants((vars) => ({
  primary: [size, spacing, { backgroundColor: vars.colors.primary }],
  secondary: [
    size,
    spacing,
    {
      backgroundColor: vars.colors.secondary,
    },
  ],
}));

function VariantsExample(props: any) {
  const boxStyle = useStyleVariants(variantBoxStyleRef);
  return (
    <View>
      <View style={boxStyle[props.variant]} />
    </View>
  );
}

////////////////////////////////////////////////////////////////////////////////

const textColor = style((vars) => ({
  color: vars.colors.primary,
}));

export const regularTextStyleRef = style((vars) => [
  textColor,
  createTextStyle(vars, {
    fontFamily: 'default',
    fontWeight: 'regular',
    textSize: 'body',
  }),
]);

export const mediumTextStyleRef = style((vars) => [
  textColor,
  createTextStyle(vars, {
    fontFamily: 'default',
    fontWeight: 'medium',
    textSize: 'body',
  }),
]);

export const heavyTextStyleRef = style((vars) => [
  textColor,
  createTextStyle(vars, {
    fontFamily: 'default',
    fontWeight: 'heavy',
    textSize: 'body',
  }),
]);

function CapsizeExample() {
  const regularTextStyle = useStyle(regularTextStyleRef);
  const mediumTextStyle = useStyle(mediumTextStyleRef);
  const heavyTextStyle = useStyle(heavyTextStyleRef);
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={regularTextStyle}>WAGMI</Text>
      <Text style={mediumTextStyle}>WAGMI</Text>
      <Text style={heavyTextStyle}>WAGMI</Text>
    </View>
  );
}
