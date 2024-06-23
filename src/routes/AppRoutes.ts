import { Response, Router } from "express";
import AvailabilityController from "../controllers/AvailabilityController";
import BookingController from "../controllers/BookingController";
import { users } from "../models/User";

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

export default router;

// sample curl requests:

// get user availability
// curl -X GET http://localhost:3000/availability?userId=1&startTime=2024-09-01T00:00:00Z&endTime=2024-09-01T23:59:59Z

// set user availability
// curl -X POST http://localhost:3000/availability/1 -H "Content-Type: application/json" -d '{ "availability": [{ "start_time": "2024-09-01T11:00:00Z", "end_time": "2024-09-01T12:00:00Z", "type": "busy" }] }'
// curl -X POST http://localhost:3000/availability/1 -H "Content-Type: application/json" -d '[{"start_time": "2024-09-01T11:00:00Z", "end_time": "2024-09-01T12:00:00Z"}]'

// find overlapping slots
// curl -X POST http://localhost:3000/booking/find -H "Content-Type: application/json" -d '{"userId1": "1", "userId2": "2", "startTime": "2024-09-01T09:00:00Z", "endTime": "2024-09-01T17:00:00Z"}'
