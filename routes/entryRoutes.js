import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/handleAuth.js";
import { createEntry, getAllEntries, getById, updateEntryByID, deleteEntryById } from "../controller/entryController.js";

const router = express.Router();

router.route("/create").post(authenticate, authorizeAdmin, createEntry);
router.route("/all").get(authenticate, getAllEntries);
router.route("/byId/:id").get(authenticate, getById);
router.route("/update/:id").put(authenticate, authorizeAdmin, updateEntryByID);
router.route("/delete/:id").delete(authenticate, authorizeAdmin, deleteEntryById);

export default router;