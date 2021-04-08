import React, {useContext, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {styles} from '../utils/Theme';
import {DataTable, Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import type {Driver} from '../../interfaces/Driver';
import {LocalizationContext} from '../translations/LocalizationContext';

function Lap({data, lap, best}) {
  const laptime = () => {
    return `${Math.floor((data.Time / 1000 / 60) << 0)}:${(
      (data.Time / 1000) %
      60
    ).toFixed(3)}s`;
  };

  return (
    <DataTable.Row>
      <DataTable.Cell style={styles.paddingHorizontal10}>
        <Text style={styles.text}>{lap}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.paddingHorizontal10}>
        <Text style={styles.text}>P{data.Position}</Text>
      </DataTable.Cell>
      <DataTable.Cell
        style={[
          styles.paddingHorizontal10,
          data.SectorTimes[0] === best[0] ? {backgroundColor: 'purple'} : null,
        ]}>
        <Text style={styles.text}>{data.SectorTimes[0] / 1000}s</Text>
      </DataTable.Cell>
      <DataTable.Cell
        style={[
          styles.paddingHorizontal10,
          data.SectorTimes[1] === best[1] ? {backgroundColor: 'purple'} : null,
        ]}>
        <Text style={styles.text}>
          {(data.SectorTimes[1] - data.SectorTimes[0]) / 1000}s
        </Text>
      </DataTable.Cell>
      <DataTable.Cell
        style={[
          styles.paddingHorizontal10,
          data.SectorTimes[2] === best[2] ? {backgroundColor: 'purple'} : null,
        ]}>
        <Text style={styles.text}>
          {(data.SectorTimes[2] - data.SectorTimes[1]) / 1000}s
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.paddingHorizontal10}>
        <AntDesign
          name={data.Valid ? 'check' : 'close'}
          color={data.Valid ? '#24B533' : '#BB2124'}
          size={20}
        />
      </DataTable.Cell>
      <DataTable.Cell
        style={[
          styles.paddingHorizontal10,
          data.Time === best[2] ? {backgroundColor: 'purple'} : null,
        ]}>
        <Text style={styles.text}>{laptime()}s</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
}

const RaceLapsTable = ({laps, best}) => {
  const {translations} = useContext(LocalizationContext);
  const itemsPerPage = 15;
  const [page, setPage] = useState(0);
  const from1 = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const data = (): Driver[] => {
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
    <ScrollView horizontal style={[styles.row]}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.paddingHorizontal5}>
            <Title style={styles.title}>{translations.lapTable.lap}</Title>
          </DataTable.Title>
          <DataTable.Title style={styles.paddingHorizontal15}>
            <AntDesign name={'user'} color={'#fff'} />
          </DataTable.Title>
          <DataTable.Title style={styles.paddingHorizontal15}>
            <Title style={styles.title}>{translations.lapTable.sector1}</Title>
          </DataTable.Title>
          <DataTable.Title style={styles.paddingHorizontal15}>
            <Title style={styles.title}>{translations.lapTable.sector2}</Title>
          </DataTable.Title>
          <DataTable.Title style={styles.paddingHorizontal15}>
            <Title style={styles.title}>{translations.lapTable.sector3}</Title>
          </DataTable.Title>
          <DataTable.Title style={styles.paddingHorizontal15}>
            <Title style={styles.title}>{translations.lapTable.valid}</Title>
          </DataTable.Title>
          <DataTable.Title style={styles.paddingHorizontal15}>
            <Title style={styles.title}>{translations.lapTable.lapTime}</Title>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {data().map((lap, index) => (
            <Lap
              data={lap}
              key={index}
              lap={index + 1 + itemsPerPage * page}
              best={best}
            />
          ))}
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={
            Math.floor(laps.length / itemsPerPage) * itemsPerPage < laps.length
              ? Math.floor(laps.length / itemsPerPage) + 1
              : Math.floor(laps.length / itemsPerPage)
          }
          onPageChange={page => setPage(page)}
          label={
            <Text style={styles.text}>
              {from1 + 1}-{to < laps.length ? to : laps.length} of {laps.length}
            </Text>
          }
        />
      </DataTable>
    </ScrollView>
  );
};

export default RaceLapsTable;
