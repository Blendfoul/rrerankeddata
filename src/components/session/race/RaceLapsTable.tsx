import React, {useContext, useState} from 'react';
import {Dimensions, FlatList, Text} from 'react-native';
import {DataTable, Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LocalizationContext} from '../../translations/LocalizationContext';
import {LapData} from '../../../types/raceData';
import LapComponent from './LapsComponent';

interface RaceLapsProps {
  laps: LapData[];
  best: number[];
}

const RaceLapsTable: React.FC<RaceLapsProps> = ({laps, best}) => {
  const {translations} = useContext(LocalizationContext);

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  const [orientation, setOrientation] = useState(isPortrait());
  const itemsPerPage = 15;
  const [page, setPage] = useState(0);
  const from1 = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  Dimensions.addEventListener('change', () => {
    setOrientation(isPortrait());
  });

  const data = (): LapData[] => {
    const temp = [];
    for (let index = from1; index < to; index++) {
      if (index === laps.length) {
        break;
      }
      temp.push(laps[index]);
    }

    return temp;
  };
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>
          <Title>{translations.lapTable.lap}</Title>
        </DataTable.Title>
        <DataTable.Title>
          <AntDesign name={'user'} />
        </DataTable.Title>
        {orientation ? (
          <>
            <DataTable.Title>
              <Title>S1</Title>
            </DataTable.Title>
            <DataTable.Title>
              <Title>S2</Title>
            </DataTable.Title>
            <DataTable.Title>
              <Title>S3</Title>
            </DataTable.Title>
          </>
        ) : (
          <>
            <DataTable.Title>
              <Title>{translations.lapTable.sector1}</Title>
            </DataTable.Title>
            <DataTable.Title>
              <Title>{translations.lapTable.sector2}</Title>
            </DataTable.Title>
            <DataTable.Title>
              <Title>{translations.lapTable.sector3}</Title>
            </DataTable.Title>
          </>
        )}
        <DataTable.Title>
          <Title>{translations.lapTable.valid}</Title>
        </DataTable.Title>
        <DataTable.Title>
          <Title>{translations.lapTable.lapTime}</Title>
        </DataTable.Title>
      </DataTable.Header>
      <FlatList
        data={data()}
        renderItem={({item, index}) => (
          <LapComponent
            data={item}
            lap={index + 1 + itemsPerPage * page}
            best={best}
          />
        )}
        keyExtractor={(item, index) => `lap-race-${index}`}
      />
      <DataTable.Pagination
        page={page}
        numberOfPages={
          Math.floor(laps.length / itemsPerPage) * itemsPerPage < laps.length
            ? Math.floor(laps.length / itemsPerPage) + 1
            : Math.floor(laps.length / itemsPerPage)
        }
        onPageChange={page => setPage(page)}
        label={
          <Text>
            {from1 + 1}-{to < laps.length ? to : laps.length} of {laps.length}
          </Text>
        }
      />
    </DataTable>
  );
};

export default RaceLapsTable;
