import { openDatabase } from 'react-native-sqlite-storage';

let db;

export const connect = () => {
  if (!db) {
    db = openDatabase({ name: 'r2a.db' });
  }
  return db;
};

export const disconnect = () => {
  if (db) {
    db.close();
    db = undefined;
  }
};
