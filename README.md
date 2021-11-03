# wagmi styles

> Themeable React Native styling library with minimal runtime.

Write your styles in TypeScript (or JavaScript) with locally scoped theme variables, then generate React Native styles up-front at runtime.

## Install

```
npm install @wagmi/styles
```

## Basic usage

```tsx
import { Text } from 'react-native';
import { buildTheme, createTheme } from '@wagmi/styles';

////////////////////////////////////////////////

// 1. Create & build your themes

const themeA = createTheme({
  colors: {
    brand: 'hotpink',
    text: 'blue',
  },
});
const themeB = createTheme(themeA, {
  colors: {
    brand: 'green',
    text: 'red',
  },
})
const { style, useStyle } = buildTheme(themeA, themeB);

////////////////////////////////////////////////

// 2. Create a style

const exampleStyleRef = style(vars => ({
  backgroundColor: vars.colors.brand,
  color: vars.colors.text,
  padding: 10
}));

////////////////////////////////////////////////

// 3. Consume your style within your components!

function Example() {
  const exampleStyle = useStyle(exampleStyleRef);  
  return <Text style={exampleStyle}>WAGMI</Text>
}
```

