export const cleanObject = (data: object) => {
  const entriesFiltered = Object.entries(data).filter(
    (entry) => ![null, undefined, ''].includes(entry[1])
  );
  const objectCleaned = Object.fromEntries(entriesFiltered);
  return objectCleaned;
};
