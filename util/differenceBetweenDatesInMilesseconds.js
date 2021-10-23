export default (a, b) => {
  const initialDate = new Date(a);
  const endDate = new Date(b);

  return endDate - initialDate;
};
