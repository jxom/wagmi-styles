import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import { useStyle, style } from '../src';

describe('simple', () => {
  const exampleStyleRef = style({
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  });

  function Example() {
    const exampleStyle = useStyle(exampleStyleRef);
    return <View style={exampleStyle} />;
  }

  test('simple style', () => {
    const { toJSON } = render(<Example />);
    expect(toJSON()).toMatchSnapshot();
  });

  ////////////////////////////////////////////////////////////////////////

  const anotherStyleRef = style({
    backgroundColor: 'red',
    color: 'blue',
  });

  function Multiple() {
    const [exampleStyle, anotherStyle] = useStyle([
      exampleStyleRef,
      anotherStyleRef,
    ]);
    return <View style={[exampleStyle, anotherStyle]} />;
  }

  test('simple style (multiple)', () => {
    const { toJSON } = render(<Multiple />);
    expect(toJSON()).toMatchSnapshot();
  });
});
