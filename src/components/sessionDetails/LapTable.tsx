import React from 'react';
import { Lap } from '../../models/data/Result';
import { DataTable } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem } from 'react-native';

type Props = {
  data: Lap[];
};

const LapTable: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const renderItem: ListRenderItem<Lap> = ({ item, index }) => {
    return (
      <DataTable.Row>
        <DataTable.Cell style={{ flex: 0.5 }}>{index + 1}</DataTable.Cell>
        <DataTable.Cell>{item.SectorTimes[0] / 1000}s</DataTable.Cell>
        <DataTable.Cell>
          {(item.SectorTimes[1] - item.SectorTimes[0]) / 1000}s
        </DataTable.Cell>
        <DataTable.Cell>
          {(item.SectorTimes[2] - item.SectorTimes[1]) / 1000}s
        </DataTable.Cell>
        <DataTable.Cell numeric>{`${Math.floor(
          (item.Time / 1000 / 60) << 0,
        )}:${((item.Time / 1000) % 60).toFixed(3)}s`}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 0.5 }}>
          {t('result.table.lap')}
        </DataTable.Title>
        <DataTable.Title>{t('result.table.sector1')}</DataTable.Title>
        <DataTable.Title>{t('result.table.sector2')}</DataTable.Title>
        <DataTable.Title>{t('result.table.sector3')}</DataTable.Title>
        <DataTable.Title numeric>{t('result.laptime')}</DataTable.Title>
      </DataTable.Header>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `lap-${item.Time}`}
      />
    </DataTable>
  );
};

export default LapTable;
