import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
const RemoveAvatarIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle
      cx={12.5}
      cy={12.5}
      r={12}
      fill="#fff"
      stroke="#E8E8E8"
      transform="rotate(-45 12.5 12.5)"
    />
    <Path
      fill="#BDBDBD"
      fillRule="evenodd"
      d="m8 8-.707.707 4.243 4.243-4.243 4.243.707.707 4.243-4.243 4.243 4.243.707-.707-4.243-4.243 4.243-4.243-.707-.707-4.243 4.243-4.243-4.243Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default RemoveAvatarIcon;
