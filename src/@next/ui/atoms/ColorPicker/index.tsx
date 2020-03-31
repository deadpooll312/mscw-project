import * as React from 'react';
import { ChromePicker } from 'react-color';

type ColorComponentProps = {
  color: string;
  onChange(color: string): any;
};

const ColorPicker: React.FC<ColorComponentProps> = React.memo(
  (props) => {
    const handleChange = React.useCallback(
      (color) => {
        props.onChange(color.hex);
      },
      [props.onChange],
    );

    return (
      <ChromePicker
        color={props.color}
        onChangeComplete={handleChange}
        disableAlpha={true}
      />
    );
  },
);

export default ColorPicker;
