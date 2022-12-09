export interface INote {
  id: string;
  title: string;
  text: string;
  tags: ITag[];
}

export interface IInitialState {
  notes: INote[];
  tags: ITag[];
  error: string;
  selectedNote: INote | null;
  formError: {
    errorTitle: boolean;
    errorText: boolean;
  };
}

export type ITag = {
  id: string;
  label: string;
};
