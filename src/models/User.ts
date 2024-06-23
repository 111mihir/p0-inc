type UserConfiguration = {
  user_id: string;
  // predefined duration of meeting slots in minutes. eg: 30
  slot_duration: number;
  // this will define a base level availability for a user
  work_day: {
    startTime: string;
    endTime: string;
  };
};

interface MeetingSlot {
  start_time: Date;
  end_time: Date;
  type: "event" | "out_of_office" | "busy" | "available";
}

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Mihir",
    email: "mihir@p0.com",
  },
  {
    id: "2",
    name: "Prakash",
    email: "prakash@p0.com",
  },
];

const usersConfiguration: UserConfiguration[] = [
  {
    user_id: "1",
    slot_duration: 45,
    work_day: {
      // start time of the work day
      startTime: "09:00",
      endTime: "17:00",
    },
  },
  {
    user_id: "2",
    slot_duration: 30,
    work_day: {
      startTime: "09:00",
      endTime: "17:00",
    },
  },
];

const configurationByUserId: Record<string, UserConfiguration> = {
  "1": {
    user_id: "1",
    slot_duration: 30,
    work_day: {
      startTime: "09:00",
      endTime: "17:00",
    },
  },
  "2": {
    user_id: "2",
    slot_duration: 30,
    work_day: {
      startTime: "09:00",
      endTime: "17:00",
    },
  },
};

const getUser = (id: string): User | undefined =>
  users.find((u) => u.id === id);

const getUserConfiguration = (userId: string): UserConfiguration | undefined =>
  configurationByUserId[userId];

export {
  MeetingSlot,
  User,
  UserConfiguration,
  configurationByUserId,
  getUser,
  getUserConfiguration,
  users,
  usersConfiguration,
};
