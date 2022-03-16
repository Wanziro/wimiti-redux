import {SET_PLAYING_VIDEO} from '../actions/playingVideo';

const initialState = {
  video: null,
};

const playingVideo = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYING_VIDEO:
      return {...state, video: action.payload};
    default:
      return state;
  }
};

export default playingVideo;
