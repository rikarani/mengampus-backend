import { Router } from "express";

import { index, create, detail, edit, deleteEvent } from "@/handlers/event";

const router = Router();

router.get("/", index);
router.post("/create", create);
router.get("/detail/:id", detail);
router.patch("/edit/:id", edit);
router.delete("/delete/:id", deleteEvent);

export { router as eventRouter };
