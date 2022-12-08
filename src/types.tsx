export interface INote {
  id: string;
  title: string;
  text: string;
  tags: Tag[];
}

export interface IInitialState {
  notes: INote[];
  error: string;
}

export type Tag = {
  id: string;
  label: string;
};
