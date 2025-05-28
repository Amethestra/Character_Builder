// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://amethestra:KjaF35%229W69%24!3%3B%25@characters.fte9gdv.mongodb.net/?retryWrites=true&w=majority&appName=Characters';

mongoose.connect(MONGODB_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Character schema
const talentSchema = new mongoose.Schema({
  current_level: Number,
  goal_level: Number,
  farmable_days: [String],
});

const weaponGoalSchema = new mongoose.Schema({
  level: Number,
  farmable_days: [String],
});

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  talents: [talentSchema],
  level_goal: String,
  weapon_goal: weaponGoalSchema,
  artifact_plan: {
    sands: String,
    goblet: String,
    circlet: String,
  },
});

const Character = mongoose.model('Character', characterSchema);

// Basic routes

// GET all characters
app.get('/characters', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new character
app.post('/characters', async (req, res) => {
  try {
    const character = new Character(req.body);
    await character.save();
    res.status(201).json(character);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update character by id
app.put('/characters/:id', async (req, res) => {
  try {
    const updated = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Character not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE character by id
app.delete('/characters/:id', async (req, res) => {
  try {
    const deleted = await Character.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Character not found' });
    res.json({ message: 'Character deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
