import {QualiResult} from '../../../types/resultData';
import React, {useContext, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {styles} from '../../utils/Theme';
import {Avatar, Card, IconButton, useTheme} from 'react-native-paper';
import {LocalizationContext} from '../../translations/LocalizationContext';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import TextContainer from '../../utils/TextContainer';
import useSectorTimes from '../../../hooks/useSectorTimes';

interface QualificationRowProps {
  item: QualiResult;
}

const QualificationRow: React.FC<QualificationRowProps> = ({item}) => {
  const {translations} = useContext(LocalizationContext);
  const {colors} = useTheme();
  const [hidden, setHidden] = useState<boolean>(true);
  const {sectors, lapTime, loading} = useSectorTimes(item.Laps);

  const componentStyle = StyleSheet.create({
    root: {
      backgroundColor: colors.primary,
      margin: 5,
    },
    actions: {
      marginLeft: 'auto',
    },
  });

  const showExtra = () => setHidden(prevState => !prevState);

  if (loading) {
    return null;
  }

  return (
    <Card style={componentStyle.root} elevation={3}>
      <Card.Title
        left={props => (
          <Avatar.Image
            source={{
              uri: `https://game.raceroom.com/game/user_avatar/${item.UserId}`,
            }}
            {...props}
          />
        )}
        title={item.FullName}
        subtitle={item.Team || translations.profile.privateer}
        right={() => (
          <Image
            source={{
              uri: `https://game.raceroom.com/store/image_redirect?id=${item.LiveryId.Id}&amp;&size=small`,
            }}
            style={{width: 75, height: 50}}
            resizeMode={'contain'}
          />
        )}
      />
      <Card.Content
        style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
        <TextContainer
          title={translations.qualificationModal.fastest}
          text={lapTime}
        />
        <TextContainer
          title={translations.qualificationModal.position}
          text={item.FinishPosition}
        />
      </Card.Content>
      {hidden ? null : (
        <Card.Content style={[styles.row, styles.paddingTop15]}>
          {sectors?.map((value, index) => (
            <TextContainer
              key={`sector-${value}`}
              title={translations.qualificationModal.sector + (index + 1)}
              text={
                (index !== 0
                  ? (value - sectors[index - 1]) / 1000
                  : value / 1000) + 's'
              }
            />
          ))}
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
      </Card.Actions>
    </Card>
  );
};

export default QualificationRow;
