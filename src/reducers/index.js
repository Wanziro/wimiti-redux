import {combineReducers} from 'redux';
import currentUser from './currentUser';
import playingVideo from './playingVideo';
import userSuggestions from './userSuggestions';
import userMessages from './userMessages';
import onlineUsers from './onlineUsers';
import socketReducer from './socket';
import shorts from './shorts';

const rootReducer = combineReducers({
  currentUser,
  playingVideo,
  userSuggestions,
  userMessages,
  onlineUsers,
  socketReducer,
  shorts,
});

export default rootReducer;
