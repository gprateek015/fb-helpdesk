import mongooge from 'mongoose';

export interface Page extends mongooge.Document {
  access_token: string;
  name: string;
  page_id: string;
  admin_user: mongooge.Types.ObjectId;
}

const pageSchema = new mongooge.Schema<Page>({
  access_token: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  admin_user: {
    type: mongooge.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  page_id: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongooge.models.Page || mongooge.model<Page>('Page', pageSchema);
