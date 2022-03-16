import {combineReducers} from 'redux';
import currentUser from './currentUser';
import playingVideo from './playingVideo';
import userSuggestions from './userSuggestions';
import userMessages from './userMessages';

const rootReducer = combineReducers({
  currentUser,
  playingVideo,
  userSuggestions,
  userMessages,
});

export default rootReducer;
