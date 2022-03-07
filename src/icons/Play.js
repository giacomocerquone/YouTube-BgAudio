import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Play = props => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M20.518 13.348a1 1 0 0 0 0-1.696L6.738 3.04a1 1 0 0 0-1.53.848v17.224a1 1 0 0 0 1.53.848l13.78-8.612Z"
      fill="#fff"
    />
  </Svg>
);

export default Play;
