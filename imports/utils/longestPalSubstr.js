const longestPalSubstr = (str) => {
  let maxLength = 1;

  let start = 0;
  let len = str.length;

  let low, high;

  for (let i = 1; i < len; i++) {
    low = i - 1;
    high = i;
    while (low >= 0 && high < len && str.charAt(low) == str.charAt(high)) {
      if (high - low + 1 > maxLength) {
        start = low;
        maxLength = high - low + 1;
      }
      --low;
      ++high;
    }

    low = i - 1;
    high = i + 1;
    while (low >= 0 && high < len && str.charAt(low) == str.charAt(high)) {
      if (high - low + 1 > maxLength) {
        start = low;
        maxLength = high - low + 1;
      }
      --low;
      ++high;
    }
  }
  return str.substring(start, start + maxLength - 1);
};
export default longestPalSubstr;
