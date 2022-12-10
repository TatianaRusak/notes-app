export interface INote {
  id: string;
  title: string;
  text: string;
  tags: ITag[];
  tagsIds: string[];
}

export interface IInitialState {
  notes: INote[];
  filteredNotes: INote[];
  noMatches: boolean;
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
