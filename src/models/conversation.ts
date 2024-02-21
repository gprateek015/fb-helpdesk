import mongooge from 'mongoose';

export interface Conversation extends mongooge.Document {
  customer?: mongooge.Types.ObjectId;
  page?: mongooge.Types.ObjectId;
  last_msg?: mongooge.Types.ObjectId;
  modified_at: Date;
}

const conversationSchema = new mongooge.Schema<Conversation>({
  customer: {
    type: mongooge.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  page: {
    type: mongooge.Schema.Types.ObjectId,
    ref: 'Page',
    required: true
  },
  last_msg: {
    type: mongooge.Schema.Types.ObjectId,
    ref: 'Message'
  },
  modified_at: {
    type: Date,
    required: true
  }
});

export default mongooge.models.Conversation ||
  mongooge.model<Conversation>('Conversation', conversationSchema);
