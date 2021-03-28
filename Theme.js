import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f2f2f',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f2f2f2',
  },
  text: {
    color: '#f2f2f2',
  },
  backgroundColor: {
    backgroundColor: '#2f2f2f',
  },
  paddingHorizontal5: {
    paddingHorizontal: 5,
  },
  paddingVertical5: {
    paddingVertical: 5,
  },
  paddingTop15: {
    paddingTop: 15,
  },
  padding5: {
    padding: 5,
  },
  padding10: {
    padding: 10,
  },
});
