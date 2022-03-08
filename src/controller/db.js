import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase(
  {
    name: 'wimiti',
    location: 'default',
  },
  () => {
    console.log('db opened');
  },
  error => {
    console.log(error);
  },
);

module.exports = db;
