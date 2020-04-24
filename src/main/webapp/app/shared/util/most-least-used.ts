export interface IMostAndLeastUsed {
  mostUsed?: object[];
  leastUsed?: object[];
}

/**
 * If value is not equal to previous max value
 * Find and remove all previously stored max values
 */
export const spliceOldValues = (array: object[] | undefined, previousValue: number, index: number) => {
  const previousValues = array?.filter(x => x['count'] === previousValue);
  console.error(previousValues);
  if (previousValues) {
    array?.splice(0, previousValues.length);
  }
};

/**
 * Get the most used and the least used items from the list
 *
 * @param list The array to check
 * @param field The field to check
 * @param name The field to present on UI
 */
export const getMostAndLeastUsed = (list: any, field: string): IMostAndLeastUsed => {
  const mostAndLeastUsed: IMostAndLeastUsed = {
    mostUsed: [],
    leastUsed: []
  };

  let max: number;
  let min: number;

  // Sort array before loop
  list.sort((a: any, b: any) => (a['count'] > b['count'] ? -1 : a['count'] < b['count'] ? 1 : 0));

  list.forEach(function(item: any, index: number): void {
    if (max <= item[field] || !max) {
      if (max && max !== item[field]) {
        spliceOldValues(mostAndLeastUsed.mostUsed, max, index);
      }

      max = item[field];
      mostAndLeastUsed.mostUsed?.push(item);
    }

    if (min >= item[field] || !min) {
      if (min && min !== item[field]) {
        spliceOldValues(mostAndLeastUsed.leastUsed, min, index);
      }

      min = item[field];
      mostAndLeastUsed.leastUsed?.push(item);
    }
  });

  return mostAndLeastUsed;
};
