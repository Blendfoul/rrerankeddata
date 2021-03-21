import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import AreaPicker from './AreaPicker';
import RaceContainer from './RaceContainer';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';

const HomeScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AreaPicker />
      <ImageBackground
        source={require('./assets/bg_home.png')}
        style={styles.image}
        imageStyle={{opacity: 0.5}}>
        <RaceContainer navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default HomeScreen;
