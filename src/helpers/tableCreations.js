import db from '../controller/db';

const messagesTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'messages ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, sender VARCHAR(100) NOT NULL,receiver VARCHAR(100) NOT NULL,message TEXT NOT NULL,sent INTEGER DEFAULT 0,delivered  INTEGER DEFAULT 0,seen INTEGER DEFAULT 0,date datetime default current_timestamp);',
    );
  });
};

module.exports = {messagesTable};
