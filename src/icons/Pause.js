import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

const Pause = props => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x={4} y={3} width={6} height={18} rx={2} fill="#000" />
    <Rect x={14} y={3} width={6} height={18} rx={2} fill="#000" />
  </Svg>
);

export default Pause;
