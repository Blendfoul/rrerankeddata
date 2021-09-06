import React, {useContext} from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {styles} from '../utils/Theme';
import {LocalizationContext} from '../translations/LocalizationContext';
import {IconButton, Text} from 'react-native-paper';
import {DrawerNavigationProp} from '@react-navigation/drawer';

interface AboutProps {
  navigation: DrawerNavigationProp<any>;
}

const AboutComponent: React.FC<AboutProps> = () => {
  const {translations} = useContext(LocalizationContext);

  const image = () => {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
      case 0:
        return require('../../assets/about/haribo_amg.webp');
      case 1:
        return require('../../assets/about/haribo_sls.webp');
      case 2:
        return require('../../assets/about/haribo_z06.webp');
    }
  };

  return (
    <React.Fragment>
      <ScrollView style={styles.column}>
        <Image source={image()} style={componentStyle.hariboTrain} />
        <View style={styles.alignCenter}>
          <Text style={componentStyle.donationText}>
            {translations.license.somethingWrong}
          </Text>
          <View>
            <IconButton
              icon={'email'}
              onPress={() => Linking.openURL('mailto:rrestatsranked@gmail.com')}
            />
          </View>
        </View>
        <View style={styles.alignCenter}>
          <Text style={componentStyle.disclaimerText}>
            {translations.license.disclaimer}
          </Text>
        </View>
        <View style={styles.alignCenter}>
          <Text style={componentStyle.disclaimerText}>
            {translations.license.mvp}
          </Text>
          <Pressable
            onPress={() => Linking.openURL('https://raceroom.dhsh.tk/')}>
            <Text style={componentStyle.donationText}>
              Raceroom Advanced Statistics
            </Text>
          </Pressable>
        </View>
        <View style={styles.alignCenter}>
          <Text style={componentStyle.disclaimerText}>
            {translations.license.license}
          </Text>
        </View>
        <View style={styles.alignCenter}>
          <Text style={componentStyle.disclaimerText}>
            {new Date().getFullYear()} - João Castanheira
          </Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

const componentStyle = StyleSheet.create({
  donationText: {
    marginVertical: 10,
    fontSize: 16,
  },
  disclaimerText: {
    textAlign: 'center',
    width: '90%',
    marginVertical: 20,
    fontSize: 16,
  },
  hariboTrain: {
    resizeMode: 'contain',
    width: '100%',
    height: 200,
  },
});

export default AboutComponent;
