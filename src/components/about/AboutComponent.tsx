import React, {useContext} from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../utils/Theme';
import {LocalizationContext} from '../translations/LocalizationContext';
import {Button} from 'react-native-paper';
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
      <ScrollView style={[styles.column, styles.backgroundColorTarget]}>
        <Image source={image()} style={componentStyle.hariboTrain} />
        <View style={styles.alignCenter}>
          <Text style={componentStyle.donationText}>
            {translations.license.somethingWrong}
          </Text>
          <View style={componentStyle.donationButton}>
            <Button
              onPress={() =>
                Linking.openURL('mailto:rrerankedstats@gmail.com')
              }>
              <MaterialCommunityIcons name={'email'} size={25} color={'#fff'} />
            </Button>
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
    color: '#fff',
    marginVertical: 10,
    fontSize: 16,
  },
  donationButton: {
    width: '40%',
  },
  disclaimerText: {
    textAlign: 'center',
    width: '90%',
    color: '#fff',
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
