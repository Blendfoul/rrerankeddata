import React, {useCallback, useContext, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  Paragraph,
  Title,
  useTheme,
} from 'react-native-paper';
import {RaceResult} from '../../../types/resultData';
import {useNavigation} from '@react-navigation/core';
import {LocalizationContext} from '../../translations/LocalizationContext';
import {styles} from '../../utils/Theme';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import useSectorTimes from '../../../hooks/useSectorTimes';

interface RaceRowProps {
  data: RaceResult;
}

const RaceRow: React.FC<RaceRowProps> = ({data}) => {
  const navigation = useNavigation();
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();
  const [hidden, setHidden] = useState<boolean>(true);
  const {lapTime} = useSectorTimes(data.Laps);

  const componentStyle = StyleSheet.create({
    root: {
      backgroundColor: colors.primary,
      margin: 5,
    },
    rep: {
      backgroundColor: data.ReputationChange >= 0 ? '#24B533' : '#BB2124',
      borderRadius: 2.5,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    rat: {
      backgroundColor: data.RatingChange >= 0 ? '#24B533' : '#BB2124',
      borderRadius: 2.5,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    actions: {
      marginLeft: 'auto',
    },
    medal: {
      paddingRight: 10,
    },
  });

  const navigate = () => {
    navigation.navigate({
      name: translations.navigation.race,
      params: {
        data: data,
      },
    });
  };

  const findMedal = useCallback(() => {
    switch (data.FinishPositionInClass) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
    }
  }, [data.FinishPositionInClass]);

  const showExtra = () => setHidden(prevState => !prevState);

  return (
    <Card style={componentStyle.root} elevation={3}>
      <Card.Title
        left={props => (
          <Avatar.Image
            source={{
              uri: `https://game.raceroom.com/game/user_avatar/${data.UserId}`,
            }}
            {...props}
          />
        )}
        title={data.FullName}
        subtitle={data.Team || translations.profile.privateer}
        right={props => (
          <Title {...props} style={componentStyle.medal}>
            {findMedal()}
          </Title>
        )}
      />
      <Card.Content>
        <View style={styles.column}>
          <View style={[styles.row, styles.justifyEvenly, styles.alignCenter]}>
            <View
              style={[styles.row, styles.justifyCenter, styles.alignCenter]}>
              <AntIcon name={'clockcircleo'} size={15} color={'#fff'} />
              <Paragraph style={{paddingHorizontal: 10}}>{lapTime}</Paragraph>
            </View>
            <View
              style={[styles.row, styles.justifyCenter, styles.alignCenter]}>
              <AntIcon name={'user'} size={15} color={'#fff'} />
              <Paragraph style={[{paddingHorizontal: 10}]}>
                {data.FinishPositionInClass || data.FinishPosition}
              </Paragraph>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.justifyEvenly,
              styles.alignCenter,
              styles.paddingTop15,
            ]}>
            <Paragraph style={componentStyle.rat}>
              <AntIcon name={'solution1'} size={15} color={'white'} />{' '}
              {data.RatingChange}
            </Paragraph>
            <Paragraph style={componentStyle.rep}>
              <AntIcon name={'exception1'} size={15} color={'white'} />{' '}
              {data.ReputationChange}
            </Paragraph>
          </View>
        </View>
      </Card.Content>
      {hidden ? null : (
        <Card.Content style={styles.paddingTop15}>
          <View style={[styles.row, styles.justifyEvenly, styles.alignCenter]}>
            <Paragraph style={componentStyle.rat}>
              <AntIcon name={'solution1'} size={15} color={'white'} />{' '}
              {data.RatingAfter}
            </Paragraph>
            <Paragraph style={componentStyle.rep}>
              <AntIcon name={'exception1'} size={15} color={'white'} />{' '}
              {data.ReputationAfter}
            </Paragraph>
          </View>
          <View style={[styles.row, styles.justifyCenter]}>
            <Image
              source={{
                uri: `https://game.raceroom.com/store/image_redirect?id=${data.LiveryId.Id}&amp;&size=small`,
              }}
              style={{width: 250, height: 100}}
              resizeMode={'contain'}
            />
          </View>
        </Card.Content>
      )}
      <Card.Actions style={componentStyle.actions}>
        <IconButton
          onPress={showExtra}
          icon={props => (
            <MaterialCommunityIcon
              name={hidden ? 'chevron-down' : 'chevron-up'}
              {...props}
              direction={'ltr'}
            />
          )}
        />
        <IconButton
          onPress={navigate}
          icon={props => (
            <MaterialCommunityIcon name={'plus'} {...props} direction={'ltr'} />
          )}
        />
      </Card.Actions>
    </Card>
  );
};

export default RaceRow;
