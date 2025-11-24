/**
 * Parses a YYMMDD date string or number into a Date object.
 * @param dateValue The date input, which can be a Date object, a YYMMDD string (e.g., '250217'), or a YYMMDD number (e.g., 250217).
 * @returns A Date object if parsing is successful, otherwise null.
 */
export function parseDateYYMMDD(dateValue: string | number | Date): Date | null {
  // If already a Date object, return it
  if (dateValue instanceof Date) {
    return dateValue;
  }
  
  // Convert to string for consistent handling
  const dateStr = String(dateValue);
  
  // Check if it's in YYMMDD format (6 digits)
  if (/^\d{6}$/.test(dateStr)) {
    const year = parseInt(dateStr.substring(0, 2)) + 2000;
    const month = parseInt(dateStr.substring(2, 4)) - 1; // JS months are 0-based
    const day = parseInt(dateStr.substring(4, 6));
    const parsedDate = new Date(year, month, day);
    // Validate if the parsed date is actually valid (e.g., handles '251301' -> invalid month)
    if (parsedDate.getFullYear() === year && parsedDate.getMonth() === month && parsedDate.getDate() === day) {
      return parsedDate;
    }
  }
  
  // If not a valid YYMMDD format or Date object, return null
  return null;
}

/**
 * Formats a Date object into a YYMMDD string (e.g., '250217' for February 17, 2025).
 * @param date The Date object to format.
 * @returns A YYMMDD string if the date is valid, otherwise an empty string.
 */
export function formatDateYYMMDD(date: Date | null | undefined): string {
  if (!date || !(date instanceof Date) || isNaN(date.valueOf())) {
    return "";
  }
  
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  
  return `${year}${month}${day}`;
}