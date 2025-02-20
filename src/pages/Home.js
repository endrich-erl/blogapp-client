import { useState, useEffect } from "react";
import Banner from "../components/Banner";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`https://blogapp-server-1-uj1f.onrender.com/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        })
        .catch(() => {
          setUser(null); // In case of an error, treat user as not logged in
        });
    }
  }, []);

  const data = {
    title: "Blog Website",
    content: "Post your blogs here",
    destination: user ? "/blogs" : "/login",
    buttonLabel: user ? "Browse Blogs" : "Login to Access Blogs",
  };

  return <Banner data={data} />;
}
