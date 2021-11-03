import { createStyleSheets } from '../createStyleSheets';

test('basic styles', () => {
  const themeMap: any = {
    theme1: {
      colors: {
        primary: '#00ff00',
        secondary: '#ff0000',
      },
    },
    theme2: {
      colors: {
        primary: '#f0f0f0',
        secondary: '#0f0f0f',
      },
    },
  };
  const getStyles = ({ themeId }: { themeId: any }) => ({
    color: themeMap[themeId].colors.primary,
    backgroundColor: themeMap[themeId].colors.secondary,
  });

  const stylesheets = createStyleSheets({ themeMap, getStyles });

  expect(stylesheets).toMatchInlineSnapshot(`
    Object {
      "_composedStyleSheets": Object {},
      "_styleSheet": Object {
        "theme1": Object {
          "backgroundColor": "#ff0000",
          "color": "#00ff00",
        },
        "theme2": Object {
          "backgroundColor": "#0f0f0f",
          "color": "#f0f0f0",
        },
      },
    }
  `);
});

test('basic styles (as array)', () => {
  const themeMap: any = {
    theme1: {
      colors: {
        primary: '#00ff00',
        secondary: '#ff0000',
      },
      spacings: {
        small: 10,
        medium: 20,
        large: 30,
      },
    },
    theme2: {
      colors: {
        primary: '#f0f0f0',
        secondary: '#0f0f0f',
      },
      spacings: {
        small: 20,
        medium: 40,
        large: 60,
      },
    },
  };
  const getStyles: any = ({ themeId }: { themeId: any }) => [
    {
      color: themeMap[themeId].colors.primary,
      backgroundColor: themeMap[themeId].colors.secondary,
    },
    {
      margin: themeMap[themeId].spacings.small,
      padding: themeMap[themeId].spacings.medium,
    },
    {
      display: 'flex',
    },
  ];

  const stylesheets = createStyleSheets({ themeMap, getStyles });

  expect(stylesheets).toMatchInlineSnapshot(`
    Object {
      "_composedStyleSheets": Object {},
      "_styleSheet": Object {
        "theme1": Object {
          "backgroundColor": "#ff0000",
          "color": "#00ff00",
          "display": "flex",
          "margin": 10,
          "padding": 20,
        },
        "theme2": Object {
          "backgroundColor": "#0f0f0f",
          "color": "#f0f0f0",
          "display": "flex",
          "margin": 20,
          "padding": 40,
        },
      },
    }
  `);
});

test('composed styles', () => {
  const themeMap: any = {
    theme1: {
      colors: {
        primary: '#00ff00',
        secondary: '#ff0000',
      },
      spacings: {
        small: 10,
        medium: 20,
        large: 30,
      },
    },
    theme2: {
      colors: {
        primary: '#f0f0f0',
        secondary: '#0f0f0f',
      },
      spacings: {
        small: 20,
        medium: 40,
        large: 60,
      },
    },
  };

  ///////////////////////////////////////////////////

  const getComposedStyles = ({ themeId }: { themeId: any }) => ({
    color: themeMap[themeId].colors.primary,
    backgroundColor: themeMap[themeId].colors.secondary,
  });
  const composedStyleSheets = createStyleSheets({
    themeMap,
    getStyles: getComposedStyles,
  });

  ///////////////////////////////////////////////////

  const getStyles = ({ themeId }: { themeId: any }) => [
    composedStyleSheets,
    {
      margin: themeMap[themeId].spacings.small,
      padding: themeMap[themeId].spacings.medium,
    },
  ];

  const stylesheets = createStyleSheets({ themeMap, getStyles });

  expect(stylesheets).toMatchInlineSnapshot(`
    Object {
      "_composedStyleSheets": Object {
        "theme1": Array [
          Object {
            "backgroundColor": "#ff0000",
            "color": "#00ff00",
          },
        ],
        "theme2": Array [
          Object {
            "backgroundColor": "#0f0f0f",
            "color": "#f0f0f0",
          },
        ],
      },
      "_styleSheet": Object {
        "theme1": Object {
          "margin": 10,
          "padding": 20,
        },
        "theme2": Object {
          "margin": 20,
          "padding": 40,
        },
      },
    }
  `);
});
