/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const initialData = {
  title: "",
  image: null,
  content: "",
  categoryId: null,
  tags: [],
  published: false,
};

const PostCreateOverlay = ({ show, onClosing, postToEdit, onSave, isNew }) => {
  // States
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [formValues, setFormValues] = useState(initialData);
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState(false);

  // Methods
  const getCategoriesAndTags = async () => {
    try {
      const respCategories = await fetch("http://localhost:5174/categories");
      const dataCategories = await respCategories.json();
      const respTags = await fetch("http://localhost:5174/tags");
      const dataTags = await respTags.json();

      setCategories(dataCategories);
      setTags(dataTags);
    } catch (error) {
      console.error("Errore durante il recupero delle categorie:", error);
    }
  };

  // Funzione per ottenere i dati inseriti negli input e settare lo stato formValues per salvare i dati
  const handleDataForm = (e, input) => {
    let value = e.target.value;
    const checked = e.target.checked;

    let newValue = e.target.type === "checkbox" ? checked : value;

    if (input === "image") {
      newValue = e.target.files[0];
    }

    if (input === "tags") {
      let currentTags = formValues.tags;

      if (checked) {
        currentTags.push(+value);
      } else {
        currentTags = currentTags.filter((tagId) => tagId !== value);
      }
      newValue = currentTags;
    }

    if (input === "published") {
      if (checked) {
        setFormValues((oldValue) => {
          return {
            ...oldValue,
            [input]: true,
          };
        });
      } else {
        setFormValues((oldValue) => {
          return {
            ...oldValue,
            [input]: false,
          };
        });
      }
    }

    if (input === "categoryId") {
      newValue = +value;
    }

    setFormValues((oldValue) => {
      return {
        ...oldValue,
        [input]: newValue,
      };
    });
  };

  const selectTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((tagId) => tagId !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Funzione per inviare i dati e inviarli al server (passata come prop a PostsList)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataTOSend = new FormData();
    Object.keys(formValues).forEach((key) => {
      formDataTOSend.append(key, formValues[key]);
    });

    try {
      // await onSave(formValues);
      await onSave(isNew ? formValues : formDataTOSend);

      onClosing();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  // Funz. per ottenere l'anteprima dell'immagine selezionata nel form
  const handleImgPreview = () => {
    return typeof formValues.image === "string"
      ? "http://localhost:5174/" + formValues.image
      : URL.createObjectURL(formValues.image);
  };

  // Hooks
  useEffect(() => {
    getCategoriesAndTags();
  }, []);

  useEffect(() => {
    if (!isNew) {
      setFormValues(postToEdit);
      const _selectedTags = [...postToEdit.tags].map((tag) => tag.id);
      setSelectedTags(_selectedTags);
    } else {
      setFormValues(initialData);
      setSelectedTags([]);
    }
  }, [postToEdit, isNew]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[60] overflow-auto"
      onClick={onClosing}
    >
      <div
        className="w-2/3 p-3 absolute z-[60] bg-green-600 top-40 left-48 rounded-md shadow-2xl shadow-slate-800 flex flex-col items-center border-2 border-green-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={onClosing} className="text-2xl self-end">
          <i className="fa-regular fa-circle-xmark text-green-800 text-4xl hover:text-white hover:cursor-pointer duration-75"></i>
        </div>
        <form
          className="mb-8 w-3/4"
          id="postCreate"
          onSubmit={handleFormSubmit}
        >
          {error && (
            <div className="text-lg font-bold p-2 bg-red-400 text-red-800 mt-2 shadow-md rounded">
              Errore nella creazione del post
            </div>
          )}
          {/* Titolo  */}
          <div className="mb-4 flex flex-col">
            <label htmlFor="title" className="font-semibold mb-0.5">
              Titolo
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formValues.title}
              onChange={(e) => handleDataForm(e, "title")}
              className="p-1 rounded-md text-black shadow-md"
            />
          </div>
          {/* Immagine  */}
          <div className="mb-4 flex flex-col">
            <label htmlFor="image" className="font-semibold mb-0.5">
              Immagine
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleDataForm(e, "image")}
              className="p-1 rounded-md text-black shadow-md"
            />
            {formValues.image && (
              <img
                src={handleImgPreview()}
                alt={formValues.title}
                className="w-52 mt-2"
              />
            )}
          </div>
          {/* Contenuto  */}
          <div className="mb-4 flex flex-col">
            <label htmlFor="content" className="font-semibold mb-0.5">
              Contenuto
            </label>
            <textarea
              name="content"
              cols="30"
              rows="5"
              value={formValues.content}
              onChange={(e) => handleDataForm(e, "content")}
              className="p-1 rounded-md text-black shadow-md"
            ></textarea>
          </div>

          {/* Categoria  */}
          <h4 className="font-semibold mb-1 mr-2">Categoria</h4>
          <div className="flex items-center mb-2">
            {categories.map((categ) => {
              return (
                <div key={categ.id}>
                  <label className="inline-block before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10">
                    <input
                      type="radio"
                      name={`categoryId`}
                      id={categ.id}
                      value={categ.id}
                      checked={formValues.categoryId == categ.id}
                      onChange={(e) => handleDataForm(e, "categoryId")}
                      className="hidden peer"
                    />
                    <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="#f8fafc"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <span className="inline-block align-[4px] mr-0.5 px-2 py-0.5 text-sm font-semibold">
                    {categ.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tags  */}
          <h4 className="font-semibold mb-1">Aggiungi Tag</h4>
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((tag) => {
              return (
                <div key={tag.id}>
                  <label
                    htmlFor={`tag-${tag.id}`}
                    className={`inline-block align-[3px] rounded-full hover:cursor-pointer hover:scale-95 duration-75 mr-0.5 text-xs font-semibold ${
                      selectedTags.includes(tag.id)
                        ? "bg-green-800 border-3 border-green-400"
                        : "bg-green-200 border-3 border-green-800"
                    }`}
                  >
                    <span
                      onClick={() => selectTag(tag.id)}
                      className={`inline-block align-[4px] mr-0.5 px-2 py-0.5 text-sm font-semibold ${
                        selectedTags.includes(tag.id)
                          ? "text-white"
                          : "text-green-800"
                      }`}
                    >
                      {tag.name}
                    </span>
                  </label>
                  <input
                    type="checkbox"
                    name={`tag-${tag.id}`}
                    id={`tag-${tag.id}`}
                    value={tag.id}
                    checked={formValues.tags?.includes(tag.id)}
                    onChange={(e) => handleDataForm(e, "tags")}
                    className="hidden peer"
                  />
                </div>
              );
            })}
          </div>

          {/* Pubblicazione  */}
          <div className="flex items-center mb-3">
            <span className="font-semibold mr-2">Publica </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formValues.published}
                onChange={(e) => handleDataForm(e, "published")}
                className="sr-only peer"
              />
              <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0"></div>
            </label>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-green-800 shadow-md hover:px-6 hover:bg-green-900 duration-150 font-semibold"
          >
            {!isNew ? "Modifica" : "Crea"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCreateOverlay;
