import {LapData} from '../../../types/raceData';
import React from 'react';
import {DataTable, Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface LapProps {
  data: LapData;
  lap: number;
  best: number[];
}

const LapComponent: React.FC<LapProps> = ({data, lap, best}) => {
  const laptime = () => {
    return `${Math.floor((data.Time / 1000 / 60) << 0)}:${(
      (data.Time / 1000) %
      60
    ).toFixed(3)}s`;
  };

  return (
    <DataTable.Row
      style={data.Time === best[2] ? {backgroundColor: 'purple'} : null}>
      <DataTable.Cell centered>
        <Text>{lap}</Text>
      </DataTable.Cell>
      <DataTable.Cell centered>
        <Text>P{data.PositionInClass}</Text>
      </DataTable.Cell>
      <DataTable.Cell
        centered
        style={
          data.SectorTimes[0] === best[0] ? {backgroundColor: 'purple'} : null
        }>
        <Text>{data.SectorTimes[0] / 1000}s</Text>
      </DataTable.Cell>
      <DataTable.Cell centered>
        <Text>{(data.SectorTimes[1] - data.SectorTimes[0]) / 1000}s</Text>
      </DataTable.Cell>
      <DataTable.Cell centered>
        <Text>{(data.SectorTimes[2] - data.SectorTimes[1]) / 1000}s</Text>
      </DataTable.Cell>
      <DataTable.Cell centered>
        <AntDesign
          name={data.Valid ? 'check' : 'close'}
          color={data.Valid ? '#24B533' : '#BB2124'}
          size={20}
        />
      </DataTable.Cell>
      <DataTable.Cell centered>
        <Text>{laptime()}s</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default LapComponent;
