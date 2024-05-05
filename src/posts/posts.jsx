import { useEffect, useState } from "react";
import Post from "./post";
import axios from "axios";



function Home() {
    
    const [posts , setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {


        async function fetchPosts() {
          setIsLoading(true);
          try {
            const { data } = await axios.get("https://blog-api-if9c.onrender.com"+"/posts");
            setIsLoading(false);
            setPosts(data.data);
          } catch (err) {
            setIsLoading(false);
            setIsError(true)
          }
        }
        
        fetchPosts();
      }, []);

  return (
    <div className="graybg main" onClick={()=>!profilMenu&&setProfilemenu("hidden")}>

      <div className="sm:px-20 md:px-32 lg:px-60 xl:px-80 main ">
        <div className="flex flex-col pt-9 w-full main items-center bg-white relative">
         {isLoading && <div className="three-body" title="loading">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>}
          {!isLoading&&isError && <div className="error" role="alert">
            <h1 className="text-red-500 text-xl">Something went wrong !!</h1>
          </div>}
          {!isLoading&&!isError&&!posts.length && <div className="error">
            <h1 className="text-green-500 text-xl">there is no posts</h1>
          </div>}
          {posts &&
            posts.map((post) => (
              <Post
                key={post._id}
                data={post}
                
              ></Post>
            ))}

        </div>
      </div>


    </div>
  );
}

export default Home;
