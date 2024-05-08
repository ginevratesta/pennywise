const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    surname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    dateOfBirth: {
      type: String,
      required: true,
      default: () => new Date().toISOString().substring(0, 10),
    },

    occupation: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      validate: {
        validator: function (password) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
          return passwordRegex.test(password);
        },
        message: 'La password deve contenere almeno una lettera maiuscola, un numero e un carattere speciale, e deve essere lunga tra 8 e 12 caratteri.',
      },
    },
  },
  { timestamps: true, strict: true }
);

UserSchema.pre('save', async function(next) {
  const user = this; 
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', UserSchema, 'appUsers');
