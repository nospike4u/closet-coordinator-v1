import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/free-photo/user-profile-icon-front-side-with-white-background_187299-40010.jpg?t=st=1721037053~exp=1721040653~hmac=b100a5fe2292042e955bb460b1597a97ca1c04f5991dec15c7a3e2cd8c53022c&w=740',
    },
  },
  // {
  //   toJSON: {
  //     transform: (doc, ret) => {
  //       ret.id = ret._id;
  //       delete ret._id;
  //       delete ret.__v;
  //       return ret;
  //     },
  //   },
  // },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model('User', userSchema);

export default User;
