const mongoose = require('mongoose');

module.exports = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-weatherwise';
  await mongoose.connect(uri);
  console.log('MongoDB connected');
};
