const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowecase: true,
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user', 'guide', 'lead-guide'],
      message: 'Please enter valid role',
    },
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Length of password should be atleast 8'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Re-enter your password to confirm'],

    //this will only work with save() and create
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: 'Password and confirm password doesnt match',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    select: false,
    default: true,
  },
});

//document middleware
userSchema.pre('save', async function (next) {
  //only runs this func if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete confirmpassword field as it is just for input purpose
  this.confirmPassword = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//query middleware
//points current qury and hence we add a filter to that query
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

//it is mongoose instance method
// these methods can then be called on instances of the model created from that schema.
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return changedTimestamp > JWTTimestamp;
  }

  //false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
