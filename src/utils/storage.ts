import { nativeStorage } from "zmp-sdk";

export const setNativeStorageItem = (key: string, value: any) => {
  try {
    return nativeStorage.setItem(key, value);
  } catch (error) {
    localStorage.setItem(key, value);
  }
};

export const getNativeStorageItem = (key: string) => {
  try {
    return nativeStorage.getItem(key);
  } catch (error) {
    return localStorage.getItem(key);
  }
};

export const removeNativeStorageItem = (key: string) => {
  try {
    return nativeStorage.removeItem(key);
  } catch (error) {
    return localStorage.removeItem(key);
  }
};
