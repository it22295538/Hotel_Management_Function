const bcrypt = require('bcrypt');

const saltRounds = 10; // Adjust the number of salt rounds as needed

exports.GeneratehashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

exports.comparePasswords = async (plainPassword, hashedPassword) => {
  console.log("in compire passwords function");
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};
 

