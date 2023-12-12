import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Post = ({ post, onSelectedPost }) => {
  const { title, slug, image, content, published, category, createdAt, tags } =
    post;

  return (
    <div className="card border p-3 max-w-3xl flex">
      <div className="p-2">
        <h3 className="font-bold text-2xl text-center">{title}</h3>
        <img
          className="max-w-xs"
          src={"http://localhost:5174/" + image}
          alt={slug}
        />
        <button
          title="Modifica"
          onClick={() => onSelectedPost(post)}
          className="  px-4 py-2 rounded-md border border-yellow-500 bg-yellow-500/20 hover:bg-yellow-500/40 duration-100 mr-2"
        >
          <i className="fa-solid fa-pen-to-square text-yellow-500"></i>
        </button>
        <button
          title="Elimina"
          className=" px-4 py-2 rounded-md border border-red-500 bg-red-500/20 hover:bg-red-500/40 duration-100 mr-2"
        >
          <i className="fa-solid fa-trash-can text-red-500"></i>
        </button>
        <Link
          title="Visualizza Post"
          to={`/posts/${slug}`}
          className=" px-4 py-2 rounded-md border border-green-500 bg-green-500/20 hover:bg-green-500/40 duration-100"
        >
          <i className="fa-solid fa-eye text-green-700"></i>
        </Link>
      </div>
      <div className="p-2">
        <p className="text-sm mb-3">{content}</p>
        <div className="mb-2">
          <span className="font-bold">Category: </span>
          {category?.name}
        </div>
        <div className="mb-2">
          <span className="font-bold">Tags: </span>
          {tags.map((tag, i) => {
            return (
              <span className="mr-2" key={i}>
                {tag.name}
              </span>
            );
          })}
        </div>
        <div className="mb-2">
          <span className="font-bold">Creato: </span>
          {createdAt.slice(0, 10)}
        </div>
        <div>
          Pubblicato{" "}
          {published ? (
            <i className="fa-regular fa-circle-check text-green-600"></i>
          ) : (
            <i className="fa-regular fa-circle-xmark text-red-600"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
