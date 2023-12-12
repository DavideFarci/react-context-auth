import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Show = () => {
  const { slug } = useParams();

  const [post, setPost] = useState();

  const getPost = async () => {
    const currentPost = await axios.get("http://localhost:5174/posts/" + slug);
    setPost(currentPost.data);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1>
        Sono la show N°{post?.id} - {post?.title}
      </h1>
    </>
  );
};

export default Show;
