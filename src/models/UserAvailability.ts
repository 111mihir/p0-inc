/**
 * defines a basic unit of a user's
 * availability against a start time and end time.
 */

type Day = {
  startTime: Date;
  endTime: Date;
};

interface UserAvailability {
  startTime: Date;
  endTime: Date;
}
