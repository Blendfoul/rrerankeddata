import React, {useCallback, useContext, useEffect} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Paragraph, Subheading, useTheme} from 'react-native-paper';
import {
  initConnection,
  useIAP,
  requestPurchase,
  Purchase,
  consumePurchaseAndroid,
} from 'react-native-iap';
import {LocalizationContext} from '../translations/LocalizationContext';

const productIds = Platform.select({
  ios: ['rrerankeddata'],
  android: ['donation_0', 'donation_1', 'donation_2', 'donation_3'],
  default: ['rrerankeddata'],
});

const DonateScreen: React.FC = () => {
  const {colors} = useTheme();
  const {translations} = useContext(LocalizationContext);

  const {connected, products, getProducts, currentPurchase, finishTransaction} =
    useIAP();

  useEffect(() => {
    const getData = async () => {
      try {
        if (connected) {
          console.log('Getting products!');
          await getProducts(productIds);
        } else {
          await initConnection();
        }
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, [connected, getProducts]);

  const checkCurrentPurchase = useCallback(
    async (purchase?: Purchase): Promise<void> => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);
            await consumePurchaseAndroid(purchase.purchaseToken as string);
            console.log('ackResult', ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }
        }
      }
    },
    [finishTransaction],
  );

  useEffect(() => {
    checkCurrentPurchase(currentPurchase);
  }, [checkCurrentPurchase, currentPurchase]);

  const style = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingBottom: 45,
    },
    contentRoot: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      marginVertical: 10,
      opacity: 0.75,
    },
    contentButton: {
      width: Dimensions.get('window').width * 0.85,
      paddingVertical: 12.5,
      alignItems: 'center',
      backgroundColor: colors.accent,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    img: {
      width: Dimensions.get('window').width * 0.85,
    },
    text: {
      textAlign: 'justify',
      width: Dimensions.get('window').width * 0.85,
      paddingBottom: 15,
    },
  });

  return (
    <ScrollView style={style.root} contentContainerStyle={style.contentRoot}>
      <View style={style.container}>
        <Image
          source={require('../../assets/about/haribo_amg.webp')}
          resizeMode={'contain'}
          style={style.img}
        />
        <Subheading>{translations.donation.greeting}</Subheading>
        <Paragraph style={style.text}>
          {translations.donation.message}
        </Paragraph>
      </View>
      <View>
        {products.map((product) => (
          <Button
            key={`donate-${product.productId}`}
            style={style.button}
            contentStyle={style.contentButton}
            mode="contained"
            onPress={() => requestPurchase(product.productId)}>
            {product.title.split('(')[0]} - {product.price}
            {product.currency}
          </Button>
        ))}
      </View>
    </ScrollView>
  );
};

export default DonateScreen;
