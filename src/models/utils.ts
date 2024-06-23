// Converts a time string to a Date object on an arbitrary date
export const createTimeFromString = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const arbitraryDate = new Date();
  arbitraryDate.setHours(hours, minutes, 0, 0); // Reset seconds and milliseconds for consistency
  return arbitraryDate;
};
