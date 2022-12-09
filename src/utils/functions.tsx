import { INote, ITag } from '../types';

type dataKey = 'NOTES' | 'TAGS';

export const getDataFromLS = (key: dataKey) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const setDataToLS = (key: dataKey, data: INote[] | ITag[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
