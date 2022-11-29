export const dateFormat = (date) => {
  const newDate = new Date(Date.parse(date));
  return newDate.toLocaleString('en-GB').split(',')[0];
};
