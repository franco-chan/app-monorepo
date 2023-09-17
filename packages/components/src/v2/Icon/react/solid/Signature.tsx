import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgSignature = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      d="M19.121 3.707a3 3 0 0 0-4.242 0l-12 12A3 3 0 0 0 2 17.828V20a1 1 0 0 0 1 1h2.172a3 3 0 0 0 2.12-.879l12-12a3 3 0 0 0 0-4.243l-.17-.171Zm2.549 15.042a7.14 7.14 0 0 1-.93.827c-.58.43-1.503.968-2.574.968-1.006 0-1.878-.463-2.503-.796l-.066-.035c-.723-.384-1.168-.598-1.61-.598-1.057 0-1.732.558-2.26 1.116a1 1 0 1 1-1.454-1.373c.654-.692 1.824-1.743 3.714-1.743.986 0 1.85.46 2.468.79l.08.042c.717.38 1.172.598 1.631.598.429 0 .923-.234 1.384-.576a5.148 5.148 0 0 0 .694-.624 1.01 1.01 0 0 1 1.41-.102c.476.412.418 1.076.017 1.506Z"
    />
  </Svg>
);
export default SvgSignature;
