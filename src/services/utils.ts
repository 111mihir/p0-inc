import { Booking } from "../models/Booking";
import { MeetingSlot } from "../models/User";

/**
 * returns available slots for a user as per their configured slot size.
 */
export const getDaySlots = (
  dayStart: Date,
  dayEnd: Date,
  slot_duration: number,
  dayBookings: Booking[],
): MeetingSlot[] => {
  const slots: MeetingSlot[] = [];

  let start_time = new Date(dayStart);
  while (start_time < dayEnd) {
    const end_time = new Date(start_time);
    end_time.setMinutes(end_time.getMinutes() + slot_duration);

    if (
      !dayBookings.some(
        (booking) =>
          booking.start_time.getTime() < end_time.getTime() &&
          booking.end_time.getTime() > start_time.getTime(),
      )
    ) {
      slots.push({ start_time, end_time, type: "available" });
    }

    start_time = new Date(end_time);
  }

  return slots;
};
