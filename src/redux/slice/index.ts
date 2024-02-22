import userSlice from '@/redux/slice/user';
import conversationSlice from '@/redux/slice/conversation';

const reducers = {
  user: userSlice,
  conversation: conversationSlice
};

export default reducers;
