import {
  SET_DISLIKES,
  SET_DISLIKE,
  UPDATE_DISLIKE,
  REMOVE_DISLIKE,
  IS_LOADING_DISLIKES,
  LOADING_DISLIKES_ERROR,
} from '../actions/postDislikes';

const initialState = {
  dislikes: [],
  isLoadingLikes: true,
  error: '',
};

const postDislikes = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISLIKES:
      return {...state, dislikes: action.payload};
    case SET_DISLIKE: {
      let exists = state.dislikes.find(
        item =>
          item.postId == action.payload.postId &&
          item.username == action.payload.username,
      );
      if (!exists) {
        return {...state, dislikes: [...state.dislikes, action.payload]};
      } else {
        return state;
      }
    }
    case REMOVE_DISLIKE:
      return {
        ...state,
        dislikes: state.dislikes.filter(
          item =>
            item.username != action.payload.username &&
            item.postId != action.payload.postId,
        ),
      };
    case UPDATE_DISLIKE: {
      const allLikes = state.dislikes;
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
          dislikes: allLikes,
        };
      } else {
        return state;
      }
    }
    case IS_LOADING_DISLIKES:
      return {...state, isLoadingLikes: action.payload};
    case LOADING_DISLIKES_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
};

export default postDislikes;
