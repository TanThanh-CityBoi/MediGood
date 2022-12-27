export const numberUtils = {
  numberWithThousandSeperator,
};

function numberWithThousandSeperator(number) {
  // if (number instanceof Number)
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // else return number;
}
