import { useReducer } from "react";
import { BlogsContext } from "../context"
import { BlogReducer, initialState } from "../reducer/BlogsReducer";

const BlogsProvider =({children})=>{
    const [state, dispatch] = useReducer(BlogReducer, initialState)
return(
    <BlogsContext.Provider value={{state, dispatch}}>
        {children}
    </BlogsContext.Provider>
)
}

export default BlogsProvider;