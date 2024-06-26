import actions from "../actions";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  page: 1,
  isMorePage: true,
};

const BlogReducer = (state, action) => {
  switch (action.type) {
    case actions.blogs.FETCHING_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case actions.blogs.FETCHED_BLOGS: {
      return {
        ...state,
        blogs: [...state.blogs, ...action.payload],
        page: state.page + 1,
        loading: false,
      };
    }
    case actions.blogs.FETCHED_EMPTY_BLOGS: {
      return {
        ...state,
        isMorePage: false,
        loading: false,
      };
    }
    case actions.blogs.BLOG_DELETED: {
      return {
        ...state,
        blogs: state?.blogs?.filter((item) => item.id !== action.payload),
      };
    }
    case actions.blogs.BLOG_EDITED: {
      return {
        ...state,
        blogs: state?.blogs?.map((blog) =>
          blog.id !== action.payload.id ? blog : action.payload
        ),
      };
    }
    case actions.blogs.FETCHING_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export { BlogReducer, initialState };
