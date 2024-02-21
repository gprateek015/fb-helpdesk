import mongooge from 'mongoose';

export interface Customer extends mongooge.Document {
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_pic?: string;
  psid: string;
}

const customerSchema = new mongooge.Schema<Customer>({
  first_name: {
    type: String,
    required: false
  },
  last_name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  profile_pic: {
    type: String,
    required: false
  },
  psid: {
    type: String,
    required: true
  }
});

export default mongooge.models.Customer ||
  mongooge.model<Customer>('Customer', customerSchema);
