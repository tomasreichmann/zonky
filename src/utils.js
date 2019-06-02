export const truncate = (text, maxWords = 20, maxLength = 200) => {
  let fittingWords = text.split(' ').slice(0, maxWords);
  if (maxLength <= 0) {
    throw new Error('maxLength must be greater than 0');
  }
  while (fittingWords.join(' ').length > maxLength ) {
    fittingWords = fittingWords.slice(0, -1);
  }
  const shortenedText = fittingWords.join(' ');
  const optionalHellip = shortenedText !== text ? '…' : '';
  const output = `${shortenedText}${optionalHellip}`;
  return output;
};

export const sortLoans = (loans, key, isAsc) => {
  return loans.sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    const directionModifier = isAsc ? 1 : -1;
    if (aVal < bVal) {
      return -directionModifier;
    }
    if (aVal > bVal) {
      return directionModifier;
    }
    return 0;
  })
}
