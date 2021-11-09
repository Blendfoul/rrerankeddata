import React from 'react';
import {
  FlatList,
  Image,
  Linking,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Caption, Paragraph} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

interface Contribution {
  name: string;
  data: string[];
}

const AboutScreen: React.FC = () => {
  const {t} = useTranslation();

  const thank: Contribution[] = [
    {
      name: 'Jasper Van Der Vaart',
      data: ['App Design contribution', 'Netherlands Translation'],
    },
    {
      name: 'Kamil Dąbkowski',
      data: ['Polish Translation'],
    },
    {
      name: 'Parvan Daniel',
      data: ['Romanian Translation'],
    },
    {
      name: 'Björn Peter',
      data: ['German Translation'],
    },
    {
      name: 'Stefano Merazzi',
      data: ['Italian Translation'],
    },
  ];

  const sendEmail = () => {
    Linking.openURL('mailto:rrestatsranked@gmail.com');
  };

  const renderItem: ListRenderItem<Contribution> = ({item}) => {
    return (
      <View style={styles.container}>
        <Paragraph>{item.name}</Paragraph>
        {item.data.map(item => (
          <Caption key={item}>{item}</Caption>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Image
        source={{
          uri: 'https://game.raceroom.com/store/image_redirect?id=6401',
        }}
        resizeMode={'contain'}
        style={styles.img}
      />
      <Paragraph style={{textAlign: 'center'}}>
        {t('about.disclaimer')}
      </Paragraph>
      <FlatList
        data={thank}
        scrollEnabled={false}
        renderItem={renderItem}
        contentContainerStyle={styles.root}
        ListHeaderComponent={<Paragraph>Contributors</Paragraph>}
        keyExtractor={item => item.name}
      />
      <Button
        mode={'contained'}
        style={styles.button}
        contentStyle={styles.container}
        icon={'mail'}
        onPress={sendEmail}
        color={'red'}>
        {t('about.somethingWrong')}
      </Button>
      <Paragraph>João Castanheira - {new Date().getFullYear()}</Paragraph>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  img: {
    width: 300,
    height: 200,
  },
  button: {
    marginVertical: 10,
  },
});

export default AboutScreen;
