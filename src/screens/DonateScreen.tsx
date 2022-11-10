import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Paragraph, Subheading } from 'react-native-paper';
import {
  initConnection,
  useIAP,
  requestPurchase,
  Purchase,
  Product,
} from 'react-native-iap';
import { useTranslation } from 'react-i18next';

const productIds = Platform.select({
  ios: ['donation_0', 'donation_1', 'donation_2', 'donation_3'],
  android: ['donation_0', 'donation_1', 'donation_2', 'donation_3'],
  default: ['rrerankeddata'],
});

const DonateScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    connected,
    products,
    getProducts,
    currentPurchase,
    finishTransaction,
  } = useIAP();

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

  const renderProducts: ListRenderItem<Product> = ({ item }) => {
    return (
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
        onPress={() => requestPurchase(item.productId)}>
        {item.title.split('(')[0]} - {item.price}
        {item.currency}
      </Button>
    );
  };

  return (
    <ScrollView>
      <View style={styles.content}>
        <Subheading>{t('donation.greeting')}</Subheading>
        <Paragraph>{t('donation.message')}</Paragraph>
      </View>
      <FlatList
        scrollEnabled={false}
        data={products}
        renderItem={renderProducts}
        keyExtractor={item => `donate-${item.productId}`}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  buttonContent: {
    paddingVertical: 10,
    backgroundColor: 'red',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    textAlign: 'justify',
  },
});

export default DonateScreen;
