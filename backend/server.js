const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env

const pollRoutes = require('./routes/pollRoutes');
const Poll = require('./models/Poll');

const app = express();

app.use(cors());
app.use(express.json());

// Load environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Use poll routes
app.use('/poll', pollRoutes);

// Optional: Seed initial poll data if empty
async function seedPollOptions() {
  const count = await Poll.countDocuments();
  if (count === 0) {
    await Poll.insertMany([
      { option: 'React', votes: 0 },
      { option: 'Angular', votes: 0 },
      { option: 'Vue', votes: 0 },
    ]);
    console.log('🌱 Default poll options seeded!');
  }
}
seedPollOptions();

// ✅ NEW: Reset all votes to 0 every time the server restarts
async function resetVotes() {
  try {
    await Poll.updateMany({}, { $set: { votes: 0 } });
    console.log('🗳️ All votes reset to 0 on startup!');
  } catch (err) {
    console.error('❌ Error resetting votes:', err);
  }
}

// ✅ Call it after seeding
resetVotes();

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
