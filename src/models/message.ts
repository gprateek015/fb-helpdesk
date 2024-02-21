import mongooge from 'mongoose';

export interface Message extends mongooge.Document {
  timestamp: string;
  content: string;
  conversation: mongooge.Types.ObjectId;
  msg_by: 'customer' | 'user';
}

const messageSchema = new mongooge.Schema<Message>({
  timestamp: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  msg_by: {
    type: String,
    enum: ['customer', 'user'],
    required: true,
    default: 'customer'
  },
  conversation: {
    type: mongooge.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  }
});

export default mongooge.models.Message ||
  mongooge.model<Message>('Message', messageSchema);
