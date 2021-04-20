import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../utils/Theme';
import {LocalizationContext} from '../translations/LocalizationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AboutComponent = ({navigation}) => {
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
    <>
      <View
        style={[styles.row, {flex: 0}, styles.backgroundColor, {padding: 10}]}>
        <Button
          icon={<MaterialIcons name="menu" size={25} color="white" />}
          title=""
          onPress={() => navigation.toggleDrawer()}
          type={'clear'}
        />
      </View>
      <ScrollView style={[styles.column, styles.backgroundColor]}>
        <Image
          source={image()}
          style={componentStyle.hariboTrain}
          PlaceholderContent={
            <ActivityIndicator size={'large'} color={'#fff'} />
          }
          placeholderStyle={styles.backgroundColor}
        />
        <View style={styles.alignCenter}>
          <Text style={componentStyle.donationText}>
            {translations.license.somethingWrong}
          </Text>
          <View style={componentStyle.donationButton}>
            <Button
              title={'Mail'}
              icon={
                <MaterialCommunityIcons
                  name={'email'}
                  size={25}
                  color={'#fff'}
                  style={{marginHorizontal: 5}}
                />
              }
              iconRight
              onPress={() => Linking.openURL('mailto:rrerankedstats@gmail.com')}
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
    </>
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
