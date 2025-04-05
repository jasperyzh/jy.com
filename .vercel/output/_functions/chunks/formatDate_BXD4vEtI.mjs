function formatYymmddDate(dateValue) {
  if (dateValue instanceof Date) {
    return dateValue;
  }
  const dateStr = String(dateValue);
  if (/^\d{6}$/.test(dateStr)) {
    const year = parseInt(dateStr.substring(0, 2)) + 2e3;
    const month = parseInt(dateStr.substring(2, 4)) - 1;
    const day = parseInt(dateStr.substring(4, 6));
    return new Date(year, month, day);
  }
  return new Date(dateValue);
}

export { formatYymmddDate as f };
