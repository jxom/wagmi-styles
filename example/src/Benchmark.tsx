import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  InteractionManager,
  SafeAreaView,
} from 'react-native';
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

const times = (n, func = (i) => i) =>
  Array.from({ length: n }).map((_, i) => func(i));

let start = Date.now();

export default function App() {
  const [theme, setTheme] = React.useState(themeA);

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const end = Date.now();
      console.log('time to first interaction:', end - start);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <View style={{ marginBottom: 32 }}>
          <TouchableOpacity onPress={() => setTheme(themeA)}>
            <Text>Theme A</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTheme(themeB)}>
            <Text>Theme B</Text>
          </TouchableOpacity>
        </View>
        {times(1000).map(() => (
          <SimpleBox />
        ))}
        {/* {times(1000).map(() => (
          <VanillaBox theme={theme} />
        ))} */}
      </SafeAreaView>
    </ThemeProvider>
  );
}

////////////////////////////////////////////////////////////////////////////////

// export const simpleBoxStyleRef = style({
//   backgroundColor: 'red',
//   borderWidth: 1,
//   borderColor: 'black',
//   width: '100%',
//   height: 100,
// });
export const simpleBoxStyleRef = style((vars) => ({
  backgroundColor: vars.colors.primary,
  borderWidth: 1,
  borderColor: 'black',
  width: '100%',
  height: 100,
}));

function SimpleBox(props: any) {
  const simpleBoxStyle = useStyle(simpleBoxStyleRef);
  return <View style={simpleBoxStyle} {...props} />;
}

////////////////////////////////////////////////////////////////////////////////

function VanillaBox({ theme }) {
  // console.log('test', theme);
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
        height: 100,
      }}
    />
  );
}
