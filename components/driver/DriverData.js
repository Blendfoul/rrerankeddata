import {View} from 'react-native';
import Developer from '../../assets/developer.svg';
import Vip from '../../assets/vip.svg';
import React, {useContext} from 'react';
import {styles} from '../utils/Theme';
import TextContainer from '../utils/TextContainer';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Logo from '../../assets/logos/Logo';
import {Image} from 'react-native-elements';
import {LocalizationContext} from '../translations/LocalizationContext';

const PinContainer = ({data}) => {
  return (
    <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
      {data?.simbiner ? <Developer /> : null}
      {data.vip ? <Vip /> : null}
    </View>
  );
};

function renderLogo(track, index) {
  const data = track.image.full.split('').filter(char => /[0-9]/.test(char));

  data.shift();

  return (
    <Image
      key={index}
      style={{width: 75, height: 75}}
      source={Logo(+data.join(''))}
    />
  );
}

const DriverData = ({data}): React.Component => {
  const {translations} = useContext(LocalizationContext);

  return (
    <>
      <View style={[styles.row, styles.paddingTop15]}>
        <TextContainer
          title={translations.profile.name}
          icon={<AntIcon name={'user'} color={'#fff'} size={15} />}
          text={data.data.name}
        />
        <PinContainer data={data.data} />
      </View>
      <View style={[styles.row, styles.paddingTop15]}>
        <TextContainer
          title={translations.profile.team}
          text={data.data.team || translations.profile.privateer}
        />
        <TextContainer
          title={translations.profile.country}
          text={data.data.overview.country.name}
        />
      </View>
      <View style={[styles.row, styles.paddingTop15]}>
        <TextContainer
          title={translations.profile.lapsCompleted}
          text={
            data.data.overview.basic_statistics[0].value +
            ` ${translations.profile.laps}`
          }
        />
        <TextContainer
          title={translations.profile.distance}
          text={data.data.overview.basic_statistics[1].value}
        />
      </View>
      <View style={[styles.row, styles.paddingTop15]}>
        <TextContainer
          title={translations.profile.races}
          text={data.rating.RacesCompleted || 0}
        />
        <TextContainer
          title={translations.profile.rating}
          icon={<AntIcon name={'solution1'} color={'#fff'} />}
          text={data.rating.Rating || 1700}
        />
        <TextContainer
          title={translations.profile.reputation}
          icon={<AntIcon name={'exception1'} color={'#fff'} />}
          text={data.rating.Reputation || 70}
        />
      </View>
      <View style={[styles.column, styles.paddingTop15]}>
        <TextContainer title={translations.profile.track} />
      </View>
      <View
        style={[
          styles.row,
          styles.alignCenter,
          styles.justifySpaceBetween,
          styles.paddingHorizontal15,
        ]}>
        {data.data.overview.most_used_tracks.map(renderLogo)}
      </View>
      <View style={[styles.column, styles.paddingTop15]}>
        <TextContainer title={translations.profile.car} />
      </View>
      <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
        <Image
          source={{uri: data.data?.overview.most_used_cars[0]?.image?.scaled}}
          style={styles.liveryImage}
        />
      </View>
    </>
  );
};

export default DriverData;
