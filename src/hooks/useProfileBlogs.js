import { useContext } from "react"
import { ProfileBlogsContext } from "../context"

const useProfileBlogs =()=>{
    return useContext(ProfileBlogsContext);
}

export default useProfileBlogs;