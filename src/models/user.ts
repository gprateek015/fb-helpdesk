import mongooge from 'mongoose';

export interface User extends mongooge.Document {
  name: string;
  email: string;
  password: string;
  page?: mongooge.Types.ObjectId;
}

const userSchema = new mongooge.Schema<User>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  page: {
    type: mongooge.Schema.Types.ObjectId,
    ref: 'Page'
  }
});

export default mongooge.models.User || mongooge.model<User>('User', userSchema);
