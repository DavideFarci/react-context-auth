import { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";
import PostCreateOverlay from "./PostCreateOverlay";
import FapButton from "./FapButton";
import axios from "axios";

const initialData = {
  title: "",
  image: "",
  content: "",
  categoryId: null,
  tags: [],
  published: false,
};

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [postSelected, setPostSelected] = useState(initialData);
  const [show, setShow] = useState(false);
  const [isNew, setIsNew] = useState(true);

  async function getPosts() {
    const data = await (await fetch("http://localhost:5174/posts")).json();
    setPosts(data.data);
  }

  const handleSelectedPost = (post) => {
    setIsNew(false);
    setPostSelected(post);
    setShow(true);
  };

  const handleClosing = () => {
    setIsNew(true);
    setShow(false);
    setPostSelected(initialData);
  };

  const savePost = async (payload) => {
    console.log(payload);
    if (isNew) {
      await axios.post("http://localhost:5174/posts", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      // await axios.put(`http://localhost:5174/posts/${payload.slug}`, payload);
      await axios.put(`http://localhost:5174/posts/${payload.slug}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-center text-4xl font-bold py-8">Posts List</h2>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Post onSelectedPost={handleSelectedPost} key={post.id} post={post} />
        ))}
      </div>
      <FapButton openOverlay={() => setShow(true)} />
      <PostCreateOverlay
        onClosing={handleClosing}
        show={show}
        postToEdit={postSelected}
        onSave={savePost}
        isNew={isNew}
      />
    </div>
  );
};

export default PostsList;
