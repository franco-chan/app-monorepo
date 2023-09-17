import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const SvgGlobus = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    <Path
      fill="currentColor"
      d="M12.83 3.473C12.47 3.09 12.19 3 12 3c-.189 0-.47.091-.83.473-.363.384-.736.992-1.07 1.827-.581 1.454-.986 3.443-1.08 5.7h5.96c-.094-2.257-.499-4.246-1.08-5.7-.334-.835-.707-1.443-1.07-1.827ZM14.98 13H9.02c.094 2.257.499 4.246 1.08 5.7.334.835.707 1.444 1.07 1.827.36.381.641.473.83.473.189 0 .47-.091.83-.473.363-.384.736-.992 1.07-1.827.581-1.454.986-3.443 1.08-5.7Zm-7.961-2c.094-2.467.534-4.718 1.224-6.442.348-.871.776-1.647 1.287-2.25A10.008 10.008 0 0 0 2.05 11h4.969ZM2.05 13h4.969c.094 2.467.534 4.718 1.224 6.442.348.871.776 1.647 1.287 2.25A10.008 10.008 0 0 1 2.05 13Zm14.93 0h4.97a10.008 10.008 0 0 1-7.48 8.693c.511-.604.939-1.38 1.287-2.25.69-1.725 1.13-3.976 1.224-6.443Zm4.97-2a10.008 10.008 0 0 0-7.48-8.693c.511.604.939 1.38 1.287 2.25.69 1.725 1.13 3.976 1.224 6.443h4.97Z"
    />
  </Svg>
);
export default SvgGlobus;
