import { generateStyleFn } from '../generateStyleFn';
import { generateStyleVariantsFn } from '../generateStyleVariantsFn';

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

  const styleVariants = generateStyleVariantsFn(themeMap);
  const stylesheets = styleVariants({
    primary: { color: 'red', backgroundColor: 'black' },
    secondary: { color: 'pink', backgroundColor: 'blue' },
  });

  expect(stylesheets).toMatchInlineSnapshot(`
    Object {
      "primary": Object {
        "_composedStyleSheets": Object {},
        "_styleSheet": Object {
          "theme1": Object {
            "backgroundColor": "black",
            "color": "red",
          },
          "theme2": Object {
            "backgroundColor": "black",
            "color": "red",
          },
        },
      },
      "secondary": Object {
        "_composedStyleSheets": Object {},
        "_styleSheet": Object {
          "theme1": Object {
            "backgroundColor": "blue",
            "color": "pink",
          },
          "theme2": Object {
            "backgroundColor": "blue",
            "color": "pink",
          },
        },
      },
    }
  `);
});

test('basic styles (with vars)', () => {
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

  const styleVariants = generateStyleVariantsFn(themeMap);
  const stylesheets = styleVariants((vars) => ({
    primary: {
      color: vars.colors.primary,
      backgroundColor: vars.colors.secondary,
    },
    secondary: {
      color: vars.colors.primary,
      backgroundColor: vars.colors.secondary,
    },
  }));

  expect(stylesheets).toMatchInlineSnapshot(`
    Object {
      "primary": Object {
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
      },
      "secondary": Object {
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
      },
    }
  `);
});

test('basic styles (array)', () => {
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

  const styleVariants = generateStyleVariantsFn(themeMap);
  const stylesheets = styleVariants((vars) => ({
    primary: [
      {
        color: vars.colors.primary,
        backgroundColor: vars.colors.secondary,
      },
      {
        margin: 10,
        padding: 20,
      },
    ],
    secondary: [
      {
        backgroundColor: vars.colors.primary,
        color: vars.colors.secondary,
      },
      {
        margin: 10,
        padding: 20,
      },
    ],
  }));

  expect(stylesheets).toMatchInlineSnapshot(`
    Object {
      "primary": Object {
        "_composedStyleSheets": Object {},
        "_styleSheet": Object {
          "theme1": Object {
            "backgroundColor": "#ff0000",
            "color": "#00ff00",
            "margin": 10,
            "padding": 20,
          },
          "theme2": Object {
            "backgroundColor": "#0f0f0f",
            "color": "#f0f0f0",
            "margin": 10,
            "padding": 20,
          },
        },
      },
      "secondary": Object {
        "_composedStyleSheets": Object {},
        "_styleSheet": Object {
          "theme1": Object {
            "backgroundColor": "#00ff00",
            "color": "#ff0000",
            "margin": 10,
            "padding": 20,
          },
          "theme2": Object {
            "backgroundColor": "#f0f0f0",
            "color": "#0f0f0f",
            "margin": 10,
            "padding": 20,
          },
        },
      },
    }
  `);
});

test('basic styles (composition)', () => {
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

  const style = generateStyleFn(themeMap);
  const styleVariants = generateStyleVariantsFn(themeMap);
  const stylesheets1 = style((vars) => [
    {
      color: vars.colors.primary,
      backgroundColor: vars.colors.secondary,
    },
    {
      margin: 10,
      padding: 20,
    },
  ]);
  const stylesheets2 = styleVariants({
    primary: [stylesheets1, { margin: 20, padding: 30 }],
    secondary: [stylesheets1, { margin: 10, padding: 20 }],
  });

  expect(stylesheets2).toMatchInlineSnapshot(`
    Object {
      "primary": Object {
        "_composedStyleSheets": Object {
          "theme1": Array [
            Object {
              "backgroundColor": "#ff0000",
              "color": "#00ff00",
              "margin": 10,
              "padding": 20,
            },
          ],
          "theme2": Array [
            Object {
              "backgroundColor": "#0f0f0f",
              "color": "#f0f0f0",
              "margin": 10,
              "padding": 20,
            },
          ],
        },
        "_styleSheet": Object {
          "theme1": Object {
            "margin": 20,
            "padding": 30,
          },
          "theme2": Object {
            "margin": 20,
            "padding": 30,
          },
        },
      },
      "secondary": Object {
        "_composedStyleSheets": Object {
          "theme1": Array [
            Object {
              "backgroundColor": "#ff0000",
              "color": "#00ff00",
              "margin": 10,
              "padding": 20,
            },
          ],
          "theme2": Array [
            Object {
              "backgroundColor": "#0f0f0f",
              "color": "#f0f0f0",
              "margin": 10,
              "padding": 20,
            },
          ],
        },
        "_styleSheet": Object {
          "theme1": Object {
            "margin": 10,
            "padding": 20,
          },
          "theme2": Object {
            "margin": 10,
            "padding": 20,
          },
        },
      },
    }
  `);
});
