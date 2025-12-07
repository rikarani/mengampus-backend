import { Router } from "express";

import { index, create, deleteEvent } from "@/handlers/event";

const router = Router();

router.get("/", index);
router.post("/create", create);
router.post("/delete/:id", deleteEvent);

export { router as eventRouter };
