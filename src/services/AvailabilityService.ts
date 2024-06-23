import { Booking, createBooking, getUserBookings } from "../models/Booking";
import { MeetingSlot, getUser, getUserConfiguration } from "../models/User";
import { createTimeFromString } from "../models/utils";
import { getDaySlots } from "./utils";

class AvailabilityService {
  // for a given start and end time,
  // returns available slots for a user as per their configured slot size.
  getUserAvailability(
    userId: string,
    startTime: string,
    endTime: string,
  ): {
    slots: MeetingSlot[];
    slot_duration: string;
  } {
    if (!userId || !startTime || !endTime) {
      throw new Error("invalid input for getUserAvailability");
    }

    const user = getUser(userId.toString());

    if (!user) {
      throw new Error("invalid user!");
    }

    const userConfig = getUserConfiguration(user.id);

    if (!userConfig) {
      throw new Error("error fetching user configuration");
    }

    const {
      slot_duration,
      work_day: { startTime: startOfDay, endTime: endOfDay },
    } = userConfig;

    const userBookings = getUserBookings(userId);

    const availableSlots: MeetingSlot[] = [];

    // for each day of the requested time period,
    // we will look at existing bookings and remove them from slots.
    // then we will create slots as per user's configured slot size.
    let start = new Date(startTime);
    const end = new Date(endTime);

    while (start < end) {
      const dayEnd = new Date(start);
      dayEnd.setHours(
        createTimeFromString(endOfDay).getHours(),
        createTimeFromString(endOfDay).getMinutes(),
      );

      const dayStart = new Date(start);
      dayStart.setHours(
        createTimeFromString(startOfDay).getHours(),
        createTimeFromString(startOfDay).getMinutes(),
      );

      const dayBookings = userBookings.filter(
        (booking) =>
          booking.start_time >= dayStart && booking.end_time <= dayEnd,
      );

      const daySlots = getDaySlots(
        dayStart,
        dayEnd,
        slot_duration,
        dayBookings,
      );

      availableSlots.push(...daySlots);

      start.setDate(start.getDate() + 1);
    }

    return {
      slot_duration: `${slot_duration.toString()} minutes`,
      slots: availableSlots,
    };
  }

  setUserAvailability(userId: string, availability: MeetingSlot[]): void {
    if (!userId || !availability) {
      throw new Error("invalid input for setUserAvailability");
    }

    const user = getUser(userId);

    if (!user) {
      throw new Error("invalid user!");
    }

    // for each of the availability slots, we will create a booking
    // if type of availability is not available.
    availability.forEach((slot) => {
      if (slot.start_time >= slot.end_time) {
        throw new Error("invalid slot!");
      }

      if (slot.type === "available") {
        return;
      }

      // create booking
      const newBooking: Booking = {
        organizer: userId,
        start_time: new Date(slot.start_time),
        end_time: new Date(slot.end_time),
        participants: [userId],
        type: slot.type,
      };

      createBooking(newBooking);
    });

    return;
  }
}

export default new AvailabilityService();
