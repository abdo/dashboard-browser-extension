enum StorageKeys {
  isOnline,
  exampleKey,
}

export default StorageKeys;

export enum ExampleKeyOptions {
  option1,
  option2,
}

export const defaultStorageValues = {
  [StorageKeys.isOnline]: true,
  [StorageKeys.exampleKey]: ExampleKeyOptions.option1,
};

export type storageValuesTypes = {
  [StorageKeys.isOnline]: boolean;
  [StorageKeys.exampleKey]: ExampleKeyOptions;
};
