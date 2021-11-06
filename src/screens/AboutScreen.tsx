import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ContentImage from '../components/shared/ContentImage';
import {Paragraph} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const AboutScreen: React.FC = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ContentImage
          itemId={6401}
          resizeMode={'contain'}
          style={styles.root}
        />
      </View>
      <View style={{flex: 2}}>
        <Paragraph>{t('about.disclaimer')}</Paragraph>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 300,
    height: '100%',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default AboutScreen;
