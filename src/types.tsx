export interface INote {
  id: string;
  title: string;
  text: string;
  tags: Tag[];
}

export interface IInitialState {
  notes: INote[];
  error: string;
  selectedNote: INote | null;
  formError: {
    errorTitle: boolean;
    errorText: boolean;
  };
}

export type Tag = {
  id: string;
  label: string;
};
