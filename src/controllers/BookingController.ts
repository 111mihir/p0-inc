import { Request, Response } from "express";
import BookingService from "../services/BookingService";

class BookingController {
  findOverlap(req: Request, res: Response): Response {
    const { userId1, userId2, startTime, endTime } = req.body;

    if (!userId1 || !userId2 || !startTime || !endTime) {
      return res.status(400).json({ message: "invalid input" });
    }

    try {
      const slots = BookingService.getOverlappingSlots(
        userId1,
        userId2,
        startTime,
        endTime,
      );
      return res.json(slots);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "error creating booking" });
    }
  }
}

export default new BookingController();
