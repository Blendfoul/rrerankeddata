import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Modal,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AreaPicker from '../race/AreaPicker';
import RaceContainer from '../race/RaceContainer';
import {styles} from '../utils/Theme';
import {AdMobBanner} from 'react-native-admob';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Image} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={[styles.column, {zIndex: 0}]}>
        <StatusBar />
        <View style={[styles.row, {flex: 0}]}>
          <View
            style={[
              styles.alignCenter,
              styles.justifyCenter,
              styles.backgroundColor,
              {flex: 0},
            ]}>
            <Button
              icon={<MaterialIcons name="menu" size={25} color="white" />}
              title=""
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 10}}
              type={'clear'}
            />
          </View>
          <View style={{flex: 3}}>
            <AreaPicker />
          </View>
          <View
            style={[
              styles.alignCenter,
              styles.justifyCenter,
              styles.backgroundColor,
              {flex: 0},
            ]}>
            <Button
              icon={<AntDesign name="calendar" size={25} color="white" />}
              title=""
              onPress={() => setVisible(true)}
              style={{marginHorizontal: 10}}
              type={'clear'}
            />
          </View>
        </View>
        <ImageBackground
          source={require('../../assets/bg_home.png')}
          style={componentStyle.image}
          imageStyle={{opacity: 0.8}}>
          <RaceContainer navigation={navigation} />
        </ImageBackground>
        <AdMobBanner
          adSize={'smartBannerPortrait'}
          adUnitID="ca-app-pub-3693871231832720/1409720136" //"ca-app-pub-3940256099942544/6300978111"
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View
          style={[
            styles.column,
            styles.justifyCenter,
            styles.alignCenter,
            styles.backgroundColor,
          ]}>
          <Button
            icon={<AntIcon color={'white'} name={'close'} size={25} />}
            type={'clear'}
            title={''}
            onPress={() => setVisible(false)}
            style={[
              styles.column,
              styles.closeButton,
              styles.alignCenter,
              {flex: 0},
            ]}
          />
          <View style={[styles.column]}>
            <ScrollView horizontal>
              <Image
                source={{
                  uri:
                    'https://evosupport.raceroom.com/index.php/apps/files_sharing/publicpreview/tne8CWb45oQmcTx?file=/schedule%20post.png&x=1920&y=1080&a=true',
                  cache: 'only-if-cached',
                }}
                resizeMode={'contain'}
                PlaceholderContent={
                  <ActivityIndicator size={'large'} color={'#fff'} />
                }
                placeholderStyle={styles.backgroundColor}
                style={componentStyle.schedule}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const componentStyle = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  schedule: {
    width: 1000,
    height: Dimensions.get('window').height,
  },
});

export default HomeScreen;
