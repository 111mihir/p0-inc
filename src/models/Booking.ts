type Booking = {
  organizer: string;
  start_time: Date;
  end_time: Date;
  participants: string[];
  type: "event" | "out_of_office" | "busy";
};

const bookingsByUserId: Record<string, Booking[]> = {
  "1": [
    {
      organizer: "1",
      start_time: new Date("2024-01-01T10:00:00Z"),
      end_time: new Date("2024-01-01T11:00:00Z"),
      participants: ["1", "2"],
      type: "event",
    },
    {
      organizer: "1",
      start_time: new Date("2024-01-01T15:00:00Z"),
      end_time: new Date("2024-01-01T16:00:00Z"),
      participants: ["1"],
      type: "busy",
    },
  ],
  "2": [
    {
      organizer: "2",
      start_time: new Date("2024-01-01T11:00:00Z"),
      end_time: new Date("2024-01-01T12:00:00Z"),
      participants: ["1", "2"],
      type: "event",
    },
    {
      organizer: "2",
      start_time: new Date("2024-01-01T14:00:00Z"),
      end_time: new Date("2024-01-01T15:00:00Z"),
      participants: ["2"],
      type: "busy",
    },
  ],
};

const bookings: Booking[] = [
  {
    organizer: "1",
    start_time: new Date("2024-01-01T10:00:00Z"),
    end_time: new Date("2024-01-01T11:00:00Z"),
    participants: ["1", "2"],
    type: "event",
  },
  {
    organizer: "2",
    start_time: new Date("2024-01-01T11:00:00Z"),
    end_time: new Date("2024-01-01T12:00:00Z"),
    participants: ["1", "2"],
    type: "event",
  },
  {
    organizer: "1",
    start_time: new Date("2024-01-01T15:00:00Z"),
    end_time: new Date("2024-01-01T16:00:00Z"),
    participants: ["1"],
    type: "busy",
  },
  {
    organizer: "2",
    start_time: new Date("2024-01-01T14:00:00Z"),
    end_time: new Date("2024-01-01T15:00:00Z"),
    participants: ["2"],
    type: "busy",
  },
];

const getUserBookings = (userId: string) => bookingsByUserId[userId];

const createBooking = (booking: Booking) => {
  bookings.push(booking);
  booking.participants.forEach((participant) => {
    if (!bookingsByUserId[participant]) {
      bookingsByUserId[participant] = [];
    }
    bookingsByUserId[participant].push(booking);
  });
};

export { Booking, bookings, bookingsByUserId, createBooking, getUserBookings };
