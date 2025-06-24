import { Schema, model } from "mongoose";
const { generateHash, comparePassword } = require('../lib/hash');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, informe um email válido'],
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    select: false,
    minlength: [4, 'A senha deve ter no mínimo 4 caracteres'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, 
  },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await generateHash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await comparePassword(candidatePassword, this.password);
};

UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

export default model("User", UserSchema);