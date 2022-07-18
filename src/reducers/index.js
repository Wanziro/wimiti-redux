import {combineReducers} from 'redux';
import currentUser from './currentUser';
import playingVideo from './playingVideo';
import userSuggestions from './userSuggestions';
import userMessages from './userMessages';
import onlineUsers from './onlineUsers';
import socketReducer from './socket';
import shorts from './shorts';
import posts from './posts';
import postLikes from './postLikes';
import postDislikes from './postDislikes';
import setupPanel from './setupPanel';
import videoCallReducer from './call';
import peopleReducer from './people';

const rootReducer = combineReducers({
  currentUser,
  playingVideo,
  userSuggestions,
  userMessages,
  onlineUsers,
  socketReducer,
  shorts,
  posts,
  postLikes,
  postDislikes,
  setupPanel,
  videoCallReducer,
  peopleReducer,
});

export default rootReducer;
