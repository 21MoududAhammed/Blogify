import { useState } from "react";
import { ProfileBlogsContext } from "../context"

const ProfileBlogsProvider = ({children}) =>{
    const [profileBlogs, setProfileBlogs] = useState([])
    return(
        <ProfileBlogsContext.Provider value={{profileBlogs, setProfileBlogs}}>
            {children}
        </ProfileBlogsContext.Provider>
    )
}

export default ProfileBlogsProvider;