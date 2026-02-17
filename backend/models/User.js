import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// The UserSchema defines exactly what information we store for each user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true, // This ensures no two users can have the same email
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false, // This means by default, the password won't be sent back in API responses
  },
  role: {
    type: String,
    enum: ['buyer', 'farmer'], // Only these two roles are allowed
    default: 'buyer',
  },
  phone: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});

// PASSWORD HASHING (Security)
// This is a "pre-save" hook. It runs EVERY time we save a user to the database.
userSchema.pre('save', async function (next) {
  // Only runs if the password was actually modified
  if (!this.isModified('password')) return next();

  // "Salt" is a random string added to the password to make it unguessable
  const salt = await bcrypt.genSalt(10);
  // Replace plain text password with the hashed version
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// HELPER METHOD: Check if the password is correct
// We can call user.comparePassword(enteredPassword) later in our Login logic
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
