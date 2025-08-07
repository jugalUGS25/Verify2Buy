import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'r2a.db' });

export const useRewardHistory = () => {
  const saveRewards = useCallback(async (updatedCounter) => {
    try {
      await AsyncStorage.setItem('rewards', updatedCounter.toString());
      const rewards = await AsyncStorage.getItem('rewards');
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO r2a_rewardstable (rewards_points) VALUES (?)',
          [rewards]
        );
      });
    } catch (error) {
      console.error('Failed to save rewards:', error);
    }
  }, []);

  const saveHistoryData = useCallback((res) => {
    if (res?.product) {
      const { ean, name, category } = res.product;
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO r2a_usertable ( barcode, prodname,category) VALUES (?,?,?)',
          [ean, name, category]
        );
      });
    }
  }, []);

  return { saveRewards, saveHistoryData };
};
