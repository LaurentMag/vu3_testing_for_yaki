export type ListElementType = {
  id: number;
  name: string;
};

export type DraggedItem = {
  item: ListElementType;
  originalList: ListElementType[];
};
