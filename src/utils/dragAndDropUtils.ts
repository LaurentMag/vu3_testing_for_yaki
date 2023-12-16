/*
Extends is used to create a constraint on a generic type. 
In this case, T extends { id: any } is saying that whatever type T is, 
it must be an object that includes an id property of any type.
*/

/**
 * Find the index of the selected item from the initial list
 * Remove the selected item from the initial list
 * Add the selected item to the target list
 *
 * While using the function the item Type must be specified : switchItemFromListToList< TypeToUse >();
 * @param item
 * @param initialList
 * @param targetList
 */
export const switchItemFromListToList = <T extends {id: any}>(
  item: T,
  initialList: T[],
  targetList: T[]
) => {
  const index = initialList.findIndex((elem) => elem.id === item.id);
  // Remove the dragged item from its original list
  initialList.splice(index, 1);
  // Add the dragged item to the new list at the dropped position
  targetList.push(item);
};
