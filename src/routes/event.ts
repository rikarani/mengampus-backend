import { Router } from "express";

import { index, create } from "@/handlers/event";

const router = Router();

router.get("/", index);
router.post("/create", create);

export { router as eventRouter };
