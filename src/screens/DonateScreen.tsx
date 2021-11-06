import React, {useCallback, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Paragraph, Subheading} from 'react-native-paper';
import {
  initConnection,
  useIAP,
  requestPurchase,
  Purchase,
  consumePurchaseAndroid,
  Product,
} from 'react-native-iap';
import ContentImage from '../components/shared/ContentImage';
import {useTranslation} from 'react-i18next';

const productIds = Platform.select({
  ios: ['rrerankeddata'],
  android: ['donation_0', 'donation_1', 'donation_2', 'donation_3'],
  default: ['rrerankeddata'],
});

const DonateScreen: React.FC = () => {
  const {t} = useTranslation();
  const {connected, products, getProducts, currentPurchase, finishTransaction} =
    useIAP();

  useEffect(() => {
    const getData = async () => {
      try {
        if (connected) {
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

  const renderProducts: ListRenderItem<Product> = ({item}) => {
    return (
      <Button
        style={style.button}
        contentStyle={style.contentButton}
        mode="contained"
        onPress={() => requestPurchase(item.productId)}>
        {item.title.split('(')[0]} - {item.price}
        {item.currency}
      </Button>
    );
  };

  return (
    <ScrollView>
      <View style={style.container}>
        <Subheading>{t('donation.greeting')}</Subheading>
        <Paragraph style={style.text}>{t('donation.message')}</Paragraph>
      </View>
      <FlatList
        data={products}
        renderItem={renderProducts}
        keyExtractor={item => `donate-${item.productId}`}
      />
      <View style={style.container}>
        <ContentImage itemId={6401} resizeMode={'contain'} style={style.img} />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  button: {
    marginVertical: 10,
    opacity: 0.75,
  },
  contentButton: {
    width: Dimensions.get('window').width * 0.85,
    paddingVertical: 12.5,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  img: {
    width: Dimensions.get('window').width * 0.85,
    height: '100%',
  },
  text: {
    textAlign: 'justify',
    width: Dimensions.get('window').width * 0.85,
    paddingBottom: 15,
  },
});

export default DonateScreen;
