import { Router } from "express";

import { index, create, update, deleteCategory } from "@/handlers/category";

const router = Router();

router.get("/", index);
router.post("/create", create);
router.patch("/update/:id", update);
router.delete("/delete/:id", deleteCategory);

export { router as categoryRouter };
