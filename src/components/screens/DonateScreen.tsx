import React, {useCallback, useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button, Subheading, useTheme} from 'react-native-paper';
import {initConnection, useIAP} from 'react-native-iap';

const productsId = ['com.rrerankeddata.donation_1'];

const DonateScreen: React.FC = () => {
  const {colors} = useTheme();
  const {connected, products, getProducts} = useIAP();

  useEffect(() => {
    const getData = async () => {
      try {
        if (connected) {
          await getProducts(productsId);
        } else {
          await initConnection();
        }
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, [connected, getProducts]);

  console.log(products);

  const style = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 45,
    },
    button: {
      marginVertical: 10,
      opacity: 0.75,
    },
    contentButton: {
      width: Dimensions.get('window').width * 0.8,
      paddingVertical: 12.5,
      alignItems: 'center',
      backgroundColor: colors.accent,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
  });

  const getPayment = useCallback(async (value: string) => {}, []);

  return (
    <View style={style.root}>
      <View style={style.container}>
        <Subheading>sdfkvna laksdvna lkvsn</Subheading>
      </View>
      <View>
        <Button
          style={style.button}
          contentStyle={style.contentButton}
          icon="coffee"
          mode="contained"
          onPress={() => getPayment('0.01')}>
          Buy me a Coffee!
        </Button>
        <Button
          style={style.button}
          contentStyle={style.contentButton}
          icon="baguette"
          mode="contained"
          onPress={() => getPayment('0.02')}>
          Buy me a Baguette!
        </Button>
        <Button
          style={style.button}
          contentStyle={style.contentButton}
          icon="hamburger"
          mode="contained"
          onPress={() => getPayment('0.03')}>
          Buy me a Hamburger!
        </Button>
      </View>
    </View>
  );
};

export default DonateScreen;
