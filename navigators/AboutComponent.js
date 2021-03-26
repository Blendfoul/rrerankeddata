import React from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {disclaimer, license, mvp} from '../assets/license.json';
const AboutComponent = () => {
  return (
    <ScrollView style={style.background}>
      <Image
        source={require('../assets/haribo.webp')}
        style={style.hariboTrain}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={style.container}>
        <Text style={style.donationText}>Found something wrong?</Text>
        <View style={style.donationButton}>
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
      <View style={style.container}>
        <Text style={style.donationText}>
          Like the app, maybe consider donating?
        </Text>
        <View style={style.donationButton}>
          <Button
            title={'Donate'}
            icon={
              <FontAwesome
                name={'paypal'}
                size={25}
                color={'#fff'}
                style={{marginHorizontal: 5}}
              />
            }
            iconRight
            onPress={() =>
              Linking.openURL('https://www.buymeacoffee.com/imagineStats')
            }
          />
        </View>
      </View>
      <View style={style.container}>
        <Text style={style.disclaimerText}>{disclaimer}</Text>
      </View>
      <View style={style.container}>
        <Text style={style.disclaimerText}>{mvp}</Text>
        <Pressable onPress={() => Linking.openURL('https://raceroom.dhsh.tk/')}>
          <Text style={style.donationText}>Raceroom Advanced Statistics</Text>
        </Pressable>
      </View>
      <View style={style.container}>
        <Text style={style.disclaimerText}>{license}</Text>
      </View>
      <View style={style.container}>
        <Text style={style.disclaimerText}>2021 - João Castanheira</Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2f2f2f',
  },
  container: {
    alignItems: 'center',
  },
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
