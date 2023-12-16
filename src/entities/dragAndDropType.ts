export type ItemType = {
  id: number;
  name: string;
};

export type DraggedItem = {
  item: ItemType;
  originalList: ItemType[];
};
