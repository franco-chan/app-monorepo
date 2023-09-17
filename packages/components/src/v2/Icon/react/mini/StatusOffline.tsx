import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgStatusOffline = (props: SvgProps) => (
  <Svg
    fill="currentColor"
    viewBox="0 0 20 20"
    accessibilityRole="image"
    {...props}
  >
    <Path d="M3.707 2.293a1 1 0 0 0-1.414 1.414l6.921 6.922c.05.062.105.118.168.167l6.91 6.911a1 1 0 0 0 1.415-1.414l-.675-.675a9.001 9.001 0 0 0-.668-11.982A1 1 0 1 0 14.95 5.05a7.002 7.002 0 0 1 .657 9.143l-1.435-1.435a5.002 5.002 0 0 0-.636-6.294A1 1 0 0 0 12.12 7.88a3 3 0 0 1 .587 3.415l-1.992-1.992a.922.922 0 0 0-.018-.018l-6.99-6.991zm-.469 5.894a1 1 0 0 0-1.933-.516 9 9 0 0 0 2.331 8.693 1 1 0 0 0 1.414-1.415 6.997 6.997 0 0 1-1.812-6.762zM7.4 11.5a1 1 0 1 0-1.73 1c.214.371.48.72.795 1.035a1 1 0 0 0 1.414-1.414c-.191-.191-.35-.4-.478-.622z" />
  </Svg>
);
export default SvgStatusOffline;
