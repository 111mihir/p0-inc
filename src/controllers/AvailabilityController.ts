import { Request, Response } from "express";
import availabilityService from "../services/AvailabilityService";

class AvailabilityController {
  getAvailability(req: Request, res: Response): Response {
    const { userId, startTime, endTime } = req.query;

    if (
      typeof userId !== "string" ||
      typeof startTime !== "string" ||
      typeof endTime !== "string" ||
      !userId ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    try {
      const availability = availabilityService.getUserAvailability(
        userId,
        startTime,
        endTime,
      );
      return res.json(availability);
    } catch (e) {
      console.error(e);
      return res.status(500).send({
        message: "Error fetching availability. Please try again.",
      });
    }
  }

  setAvailability(req: Request, res: Response): Response {
    const { userId } = req.params;
    const { availability } = req.body;

    if (!userId || !availability?.length) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    try {
      availabilityService.setUserAvailability(userId, availability);
      return res.status(200).send("Availability set successfully");
    } catch (e) {
      console.error(e);
      return res.status(500).send({
        message: "Error setting availability. Please try again.",
      });
    }
  }
}

export default new AvailabilityController();
