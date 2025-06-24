const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

async function generateHash(password) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  generateHash,
  comparePassword,
};