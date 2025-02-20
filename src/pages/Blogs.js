import { useState, useEffect, useContext, useCallback } from 'react';
import UserContext from '../context/UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

 

export default function Blogs() {

    const {user} = useContext(UserContext);

    const [ blogs, setBlogs ] = useState([])

    const fetchData = () => {
        let fetchUrl = "https://blogapp-server-1-uj1f.onrender.com/blogs/getBlog";

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('API Response:', data);
            
            // Check if the response is an array (some APIs wrap it in an object)
            if (Array.isArray(data)) {
                setBlogs(data);
            } else if (Array.isArray(data.blog)) {  // Fix: Use 'blog' instead of 'blogs'
                setBlogs(data.blog);
            } else {
                console.error('Unexpected API response format:', data);
                setBlogs([]);
            }

        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            setBlogs([]);
        });
    };



    useEffect(() => {
        fetchData();
    }, []);




      return(
        (user.isAdmin === true)
        ?
            <AdminView blogsData={blogs} fetchData={fetchData} />
        :
            <UserView blogsData={blogs} fetchData={fetchData} />
      )
}


