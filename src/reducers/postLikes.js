import {
  SET_LIKES,
  SET_LIKE,
  UPDATE_LIKE,
  REMOVE_LIKE,
  IS_LOADING_LIKES,
  LOADING_LIKES_ERROR,
} from '../actions/postLikes';

const initialState = {
  likes: [],
  isLoadingLikes: true,
  error: '',
};

const postLikes = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIKES:
      return {...state, likes: action.payload};
    case SET_LIKE: {
      let exists = state.likes.find(
        item =>
          item.postId == action.payload.postId &&
          item.username == action.payload.username,
      );
      if (!exists) {
        return {...state, likes: [...state.likes, action.payload]};
      } else {
        return state;
      }
    }
    case REMOVE_LIKE:
      return {
        ...state,
        likes: state.likes.filter(
          item =>
            item.username != action.payload.username &&
            item.postId != action.payload.postId,
        ),
      };
    case UPDATE_LIKE: {
      const allLikes = state.likes;
      let index = null;
      for (let i = 0; i < allLikes.length; i++) {
        if (
          action.payload.postId == allLikes[i].postId &&
          action.payload.username == allLikes[i].username
        ) {
          index = i;
          break;
        }
      }
      if (index !== null) {
        allLikes[index] = action.payload;
        return {
          ...state,
          likes: allLikes,
        };
      } else {
        return state;
      }
    }
    case IS_LOADING_LIKES:
      return {...state, isLoadingLikes: action.payload};
    case LOADING_LIKES_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
};

export default postLikes;
