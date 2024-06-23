import { getUserBookings } from "../models/Booking";
import { MeetingSlot, getUserConfiguration } from "../models/User";
import { createTimeFromString } from "../models/utils";
import { getDaySlots } from "./utils";

interface IBookingService {
  getOverlappingSlots(
    userId1: string,
    userId2: string,
    startTime: string,
    endTime: string,
  ): MeetingSlot[];
}

class BookingService implements IBookingService {
  public getOverlappingSlots(
    userId1: string,
    userId2: string,
    startTime: string,
    endTime: string,
  ): MeetingSlot[] {
    if (
      !userId1 ||
      !userId2 ||
      !Date.parse(startTime) ||
      !Date.parse(endTime)
    ) {
      throw new Error("invalid input for getOverlappingSlots");
    }

    if (Date.parse(startTime) > Date.parse(endTime)) {
      throw new Error("start time cannot be greater than end time");
    }

    // get user1's availability and bookings
    const user1Configuration = getUserConfiguration(userId1);
    const user1Bookings = getUserBookings(userId1);

    // get user2's availability and bookings
    const user2Configuration = getUserConfiguration(userId2);
    const user2Bookings = getUserBookings(userId2);

    // get overlapping slots between user1 and user2
    const overlappingSlots: MeetingSlot[] = [];

    if (!user1Configuration || !user2Configuration) {
      throw new Error("error fetching user configuration");
    }

    // return if requested time range is outside of either user's
    // working hours

    if (
      new Date(startTime).getUTCHours() <
        createTimeFromString(
          user1Configuration.work_day.startTime,
        ).getUTCHours() ||
      new Date(endTime).getUTCHours() >
        createTimeFromString(user1Configuration.work_day.endTime).getHours() ||
      new Date(startTime).getUTCHours() <
        createTimeFromString(
          user2Configuration.work_day.startTime,
        ).getUTCHours() ||
      new Date(endTime).getUTCHours() >
        createTimeFromString(user2Configuration.work_day.endTime).getHours()
    ) {
      return [];
    }

    // for each day of the requested time period,
    // we will compare slots between user1 and user2
    // filtering out the slots that are not overlapping
    // and existing bookings for both users
    // returning the slots that are overlapping
    const start = new Date(startTime);
    const end = new Date(endTime);

    while (start < end) {
      const dayEnd = new Date(start);
      dayEnd.setHours(
        createTimeFromString(user1Configuration.work_day.endTime).getHours(),
        createTimeFromString(user1Configuration.work_day.endTime).getMinutes(),
      );

      const dayStart = new Date(start);
      dayStart.setHours(
        createTimeFromString(user1Configuration.work_day.startTime).getHours(),
        createTimeFromString(
          user1Configuration.work_day.startTime,
        ).getMinutes(),
      );

      const user1BookingsForDay = user1Bookings.filter(
        (booking) =>
          booking.start_time >= dayStart && booking.end_time <= dayEnd,
      );

      const user2BookingsForDay = user2Bookings.filter(
        (booking) =>
          booking.start_time >= dayStart && booking.end_time <= dayEnd,
      );

      const user1Slots = getDaySlots(
        dayStart,
        dayEnd,
        user1Configuration.slot_duration,
        user1BookingsForDay,
      );

      const user2Slots = getDaySlots(
        dayStart,
        dayEnd,
        user2Configuration.slot_duration,
        user2BookingsForDay,
      );

      user1Slots.forEach((slot) => {
        const overlappingSlot = user2Slots.find(
          (user2Slot) =>
            user2Slot.start_time.getTime() === slot.start_time.getTime() &&
            user2Slot.end_time.getTime() === slot.end_time.getTime(),
        );

        if (overlappingSlot) {
          overlappingSlots.push(slot);
        }
      });

      start.setDate(start.getDate() + 1);
    }

    // return all overlapping slots
    return overlappingSlots;
  }
}

export default new BookingService();
