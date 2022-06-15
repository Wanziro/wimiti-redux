import {
  SET_POSTS,
  DELETE_POST,
  LOADING_POSTS_ERROR,
  IS_LOADING_POSTS,
} from '../actions/posts';

const initialState = {
  posts: [],
  isLoadingPosts: true,
  error: '',
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {...state, posts: action.payload};
    case IS_LOADING_POSTS:
      return {...state, isLoadingPosts: action.payload};
    case LOADING_POSTS_ERROR:
      return {...state, isLoadingPosts: false, error: action.payload};
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item.id != action.payload.id),
      };
    default:
      return state;
  }
};

export default posts;
