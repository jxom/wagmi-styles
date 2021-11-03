import { useStyle } from './useStyle';
import { style } from './style';

import { generateStyled } from './private/generateStyled';

export const styled = generateStyled({ style, useStyle });
