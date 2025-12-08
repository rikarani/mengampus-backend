import { Router } from "express";

import { index, create, detail, deleteEvent } from "@/handlers/event";

const router = Router();

router.get("/", index);
router.post("/create", create);
router.get("/detail/:id", detail);
router.post("/delete/:id", deleteEvent);

export { router as eventRouter };
