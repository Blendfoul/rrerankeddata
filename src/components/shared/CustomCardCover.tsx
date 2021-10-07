import * as React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  ImageBackground,
} from 'react-native';
import {withTheme} from 'react-native-paper';

type Props = React.ComponentPropsWithRef<typeof ImageBackground> & {
  /**
   * @internal
   */
  index?: number;
  /**
   * @internal
   */
  total?: number;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: ReactNativePaper.Theme;
};

const CardCover: React.FC<Props> = ({
  index,
  total,
  style,
  theme,
  children,
  ...rest
}) => {
  const {roundness} = theme;

  let coverStyle;

  if (index === 0) {
    if (total === 1) {
      coverStyle = {
        borderRadius: roundness,
      };
    } else {
      coverStyle = {
        borderTopLeftRadius: roundness,
        borderTopRightRadius: roundness,
      };
    }
  } else if (typeof total === 'number' && index === total - 1) {
    coverStyle = {
      borderBottomLeftRadius: roundness,
    };
  }

  return (
    <View style={[styles.container, coverStyle, style]}>
      <ImageBackground {...rest} style={[styles.image, coverStyle]}>
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 195,
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    padding: 16,
    justifyContent: 'flex-end',
  },
});

export default withTheme(CardCover);

export {CardCover};
