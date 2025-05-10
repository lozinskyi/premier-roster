import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const asyncStorage = {
  getItem: async (name: string) => {
    const value = storage.getString(name);
    return value ? Promise.resolve(value) : Promise.resolve(null);
  },
  setItem: async (name: string, value: any) => {
    storage.set(name, value);
    return Promise.resolve();
  },
  removeItem: async (name: string) => {
    storage.delete(name);
    return Promise.resolve();
  },
  getAllKeys: async (key: string) => {
    const keys = storage.getAllKeys();
    const similarKeys = keys.filter(k => k?.includes(key));

    if (!similarKeys.length) return Promise.resolve([]);

    const values = similarKeys
      .map(k => storage.getString(k))
      .filter((value): value is string => Boolean(value));

    return Promise.resolve(values);
  },
};
