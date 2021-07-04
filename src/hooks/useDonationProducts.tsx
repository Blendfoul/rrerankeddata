import {useCallback, useEffect, useState} from 'react';
import * as RNIap from 'react-native-iap';
import {Product} from 'react-native-iap';

const useDonationProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = useCallback(async () => {
    try {
      await RNIap.initConnection();

      const productId = ['com.rrerankeddata'];

      const data = await RNIap.getProducts(productId);
      setProducts(data);
    } catch (e) {
      console.error(e.code, e.message);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return {products};
};

export default useDonationProducts;
