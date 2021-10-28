import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { ThemeProvider, useStyle } from '@wagmi/styles';

import { createTextStyle } from './capsize';
import { themeA, themeB, style } from './theme';

export default function App() {
  const [theme, setTheme] = React.useState(themeA);
  const [loaded] = useFonts({
    SFProRounded: require('./assets/fonts/SF-Pro-Rounded-Regular.otf'),
    SFProRoundedHeavy: require('./assets/fonts/SF-Pro-Rounded-Heavy.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <DopeText />
        <TouchableOpacity onPress={() => setTheme(themeA)}>
          <Text>Theme A</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTheme(themeB)}>
          <Text>Theme B</Text>
        </TouchableOpacity>
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

export const regularTextStyleRef = style((vars) => ({
  color: vars.colors.primary,
  ...createTextStyle(vars, {
    fontFamily: 'default',
    fontWeight: 'regular',
    textSize: 'body',
  }),
}));

export const heavyTextStyleRef = style((vars) => ({
  color: vars.colors.primary,
  ...createTextStyle(vars, {
    fontFamily: 'default',
    fontWeight: 'heavy',
    textSize: 'body',
  }),
}));

function DopeText() {
  const regularTextStyle = useStyle(regularTextStyleRef);
  const heavyTextStyle = useStyle(heavyTextStyleRef);
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Text style={regularTextStyle}>WAGMI</Text>
      <Text style={heavyTextStyle}>WAGMI</Text>
    </View>
  );
}
