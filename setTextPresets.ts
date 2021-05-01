import {Avatar, Button, Caption, Paragraph, Title} from 'react-native-paper';
import {StyleProp, Text, TextStyle} from 'react-native';

interface TextWithDefaultProps {
  defaultProps?: {
    allowFontScaling?: boolean;
    style?: StyleProp<TextStyle>;
  };
}

(Title as TextWithDefaultProps).defaultProps =
  (Title as TextWithDefaultProps).defaultProps || {};
(Title as TextWithDefaultProps)!.defaultProps!.allowFontScaling = false;
(Caption as TextWithDefaultProps).defaultProps =
  (Caption as TextWithDefaultProps).defaultProps || {};
(Caption as TextWithDefaultProps)!.defaultProps!.allowFontScaling = false;
(Paragraph as TextWithDefaultProps).defaultProps =
  (Paragraph as TextWithDefaultProps).defaultProps || {};
(Paragraph as TextWithDefaultProps)!.defaultProps!.allowFontScaling = false;

Button.defaultProps = Button.defaultProps || {};
Button.defaultProps.color = '#2c2c2c';

Avatar.Image.defaultProps = Avatar.Image.defaultProps || {};
Avatar.Image.defaultProps.style = {backgroundColor: '#2f2f2f'};

((Text as unknown) as TextWithDefaultProps).defaultProps =
  ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
