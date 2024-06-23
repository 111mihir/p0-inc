import { Response, Router } from "express";
import AvailabilityController from "../controllers/AvailabilityController";
import BookingController from "../controllers/BookingController";
import { bookings, bookingsByUserId } from "../models/Booking";
import {
  configurationByUserId,
  users,
  usersConfiguration,
} from "../models/User";

const router = Router();

router.get("/", (_, res: Response) => {
  res.send("Welcome.");
});

router.get("/users", (_, res: Response) => {
  res.send(users);
});

router.get("/availability", AvailabilityController.getAvailability);
router.post("/availability/:userId", AvailabilityController.setAvailability);
router.post("/booking/find", BookingController.findOverlap);

// debug route
router.get("/debug", (_, res: Response) => {
  res.send({
    users: {
      users,
      usersConfiguration,
      configurationByUserId,
    },
    bookings: {
      bookings,
      bookingsByUserId,
    },
  });
});

export default router;
