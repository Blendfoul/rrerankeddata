import {View, Image} from 'react-native';
import Developer from '../../assets/svg/developer.svg';
import Vip from '../../assets/svg/vip.svg';
import React, {useContext} from 'react';
import {styles} from '../utils/Theme';
import TextContainer from '../utils/TextContainer';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Logo from '../../assets/logos/Logo';
import {LocalizationContext} from '../translations/LocalizationContext';
import {UserProfile} from '../../types/userProfile';
import {Caption, Divider, Title} from 'react-native-paper';
//@ts-ignore no types
import Flag from 'react-native-flags';
import {Rating} from '../../types/rating';

interface PinProps {
  data: UserProfile;
}

const PinContainer: React.FC<PinProps> = ({data}) => (
  <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
    {data?.simbiner ? <Developer /> : null}
    {data.vip ? <Vip /> : null}
  </View>
);

const renderLogo: React.FC<any> = (track, index) => {
  const data = track.image.full
    .split('')
    .filter((char: string) => /[0-9]/.test(char));

  data.shift();

  return (
    <Image
      key={index}
      style={{width: 75, height: 75, backgroundColor: 'white'}}
      source={Logo(+data.join(''))}
    />
  );
};

interface DriverProps {
  data: {
    data: UserProfile;
    rating:
      | Rating
      | {
          Rating: number;
          Reputation: number;
          RacesCompleted: number;
        };
  };
}

const DriverData: React.FC<DriverProps> = ({data}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <>
      <View style={[styles.root, styles.column]}>
        <View style={styles.row}>
          <View>
            <Title style={{color: 'white'}}>
              {data.data.name}{' '}
              <Flag
                code={data.data.overview.country.code.toUpperCase()}
                size={24}
              />
            </Title>
            <Caption style={{color: '#f4f4f4'}}>
              {data.data.team || translations.profile.privateer}
            </Caption>
          </View>
          <PinContainer data={data.data} />
        </View>
      </View>
      <View style={[styles.root, styles.column]}>
        <View style={styles.row}>
          <TextContainer
            title={translations.profile.lapsCompleted}
            titleSize={14}
            text={
              data.data.overview.basic_statistics[0].value +
              ` ${translations.profile.laps}`
            }
          />
          <TextContainer
            title={translations.profile.distance}
            titleSize={14}
            text={data.data.overview.basic_statistics[1].value}
          />
        </View>
        <View style={[styles.row, styles.paddingTop15]}>
          <TextContainer
            title={translations.profile.timeInGame}
            titleSize={14}
            text={
              data.data.overview.basic_statistics[2].value +
              ` ${translations.profile.laps}`
            }
          />
          <TextContainer
            titleSize={14}
            title={translations.profile.joined}
            text={data.data.overview.basic_statistics[3].value}
          />
        </View>
      </View>
      <View style={[styles.root, {flexDirection: 'row'}]}>
        <TextContainer
          titleSize={14}
          title={translations.profile.races}
          text={data.rating.RacesCompleted || 0}
        />
        <Divider />
        <TextContainer
          titleSize={14}
          title={translations.profile.rating}
          icon={<AntIcon name={'solution1'} color={'#fff'} />}
          text={data.rating.Rating || 1500}
        />
        <Divider />
        <TextContainer
          titleSize={14}
          title={translations.profile.reputation}
          icon={<AntIcon name={'exception1'} color={'#fff'} />}
          text={data.rating.Reputation || 70}
        />
      </View>
      <View style={[styles.root, styles.column]}>
        <View
          style={[
            styles.row,
            styles.justifyEvenly,
            styles.paddingVertical5,
            {width: '100%'},
          ]}>
          {data.data.overview.most_used_tracks.map(renderLogo)}
        </View>
        <View
          style={[
            styles.alignCenter,
            styles.justifyCenter,
            styles.paddingTop15,
          ]}>
          <Image
            source={{
              uri: data.data?.overview.most_used_cars[0]?.image?.scaled,
              cache: 'only-if-cached',
            }}
            style={styles.liveryImage}
          />
        </View>
      </View>
    </>
  );
};

export default DriverData;
