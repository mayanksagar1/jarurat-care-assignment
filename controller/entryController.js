import Entry from "../model/entryModel.js";

const createEntry = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Provide all details" });
    }
    const newEntry = new Entry({ title, description });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find({});
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Bad request" });
    const entry = await Entry.findById(id);
    if (!entry) return res.status(404).json({ error: "Entry not found!" });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateEntryByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Bad request" });
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Provide all details" });
    }
    const entry = await Entry.findById(id);
    if (!entry) res.status(404).json({ error: "Entry not found!" });
    entry.title = title;
    entry.description = description;
    await entry.save();
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ error: "Bad request" });
    const entry = await Entry.findByIdAndDelete(id);
    res.status(200).json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createEntry,
  getAllEntries,
  getById,
  updateEntryByID,
  deleteEntryById
};