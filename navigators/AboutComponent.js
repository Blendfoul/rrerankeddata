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
import {styles} from '../Theme';

const AboutComponent = () => {
  return (
    <ScrollView style={[styles.column, styles.backgroundColor]}>
      <Image
        source={require('../assets/haribo.webp')}
        style={componentStyle.hariboTrain}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.alignCenter}>
        <Text style={componentStyle.donationText}>Found something wrong?</Text>
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
        <Text style={componentStyle.donationText}>
          Like the app, maybe consider donating?
        </Text>
        <View style={componentStyle.donationButton}>
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
      <View style={styles.alignCenter}>
        <Text style={componentStyle.disclaimerText}>{disclaimer}</Text>
      </View>
      <View style={styles.alignCenter}>
        <Text style={componentStyle.disclaimerText}>{mvp}</Text>
        <Pressable onPress={() => Linking.openURL('https://raceroom.dhsh.tk/')}>
          <Text style={componentStyle.donationText}>
            Raceroom Advanced Statistics
          </Text>
        </Pressable>
      </View>
      <View style={styles.alignCenter}>
        <Text style={componentStyle.disclaimerText}>{license}</Text>
      </View>
      <View style={styles.alignCenter}>
        <Text style={componentStyle.disclaimerText}>
          2021 - João Castanheira
        </Text>
      </View>
    </ScrollView>
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
