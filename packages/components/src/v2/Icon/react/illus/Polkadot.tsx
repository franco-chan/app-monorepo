import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgPolkadot = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 16 16" accessibilityRole="image" {...props}>
    <G fill="#8C8CA1" clipPath="url(#a)">
      <Path d="M8 5.213c.956 0 1.73-.45 1.73-1.007C9.73 3.651 8.956 3.2 8 3.2c-.955 0-1.73.45-1.73 1.006S7.045 5.213 8 5.213ZM8 12.795c.956 0 1.73-.45 1.73-1.006S8.956 10.782 8 10.782c-.955 0-1.73.45-1.73 1.007 0 .555.775 1.006 1.73 1.006ZM5.59 6.606c.477-.828.474-1.724-.008-2.002-.481-.278-1.26.167-1.737.995-.478.827-.475 1.723.007 2.001.482.279 1.26-.167 1.737-.994ZM12.155 10.396c.478-.827.475-1.723-.007-2.001-.48-.278-1.258.167-1.736.995-.478.827-.475 1.723.006 2.001.482.278 1.259-.167 1.737-.995ZM5.582 11.391c.482-.278.485-1.174.007-2.002-.477-.827-1.255-1.273-1.737-.994-.481.278-.484 1.174-.007 2.001.478.828 1.256 1.273 1.737.995ZM12.149 7.6c.481-.277.484-1.173.006-2-.478-.828-1.255-1.274-1.736-.996-.482.278-.484 1.174-.007 2.002.478.827 1.256 1.273 1.737.995Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2.98 3.2h10.04v9.6H2.98z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgPolkadot;
