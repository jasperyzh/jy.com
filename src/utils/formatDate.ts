/**
 * Format YYMMDD date string or number to a readable date
 * 
 * Handles numeric formats like 250217 (Feb 17, 2025) or string "250217"
 * Also handles standard Date objects
 */
export function formatYymmddDate(dateValue: string | number | Date): Date {
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
    return new Date(year, month, day);
  }
  
  // Try standard date parsing
  return new Date(dateValue);
}