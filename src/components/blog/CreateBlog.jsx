import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateBlog() {
  const navigate = useNavigate();
  const { api } = useAxios();
  const inputRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleThumbnail = () => {
    inputRef.current.click();
  };

  const getThumbnail = (e) => {
    const file = e.target.files[0];
    const cashThumbnail = URL.createObjectURL(file);
    setThumbnailURL(cashThumbnail);
    setThumbnail(file);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const tagsArray = data?.tags.split(",");
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("tags", tagsArray);

      try {
        const response = await api.post(`/blogs`, formData);
        if (response?.status === 201) {
          toast.success('A blog post created.')
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.warning('Select an image as thumbnail.');
    }
  };

  return (
    <div className="container">
      {/* Form Input field for creating Blog Post */}
      <form onSubmit={handleSubmit(onSubmit)} className="createBlog">
        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
          {!thumbnailURL ? (
            <div
              className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
              onClick={handleThumbnail}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <p>Upload Your Image</p>
            </div>
          ) : (
            <img
              className="max-w-52 max-h-32"
              src={thumbnailURL}
              alt=""
              onClick={handleThumbnail}
            />
          )}
        </div>

        <input
          className="hidden"
          ref={inputRef}
          type="file"
          name="thumbnail"
          id="thumbnail"
          onChange={getThumbnail}
        />

        <Field error={errors?.title}>
          <input
            {...register("title", { required: "Title is required." })}
            type="text"
            id="title"
            name="title"
            placeholder="Enter your blog title"
          />
        </Field>
        <Field error={errors?.tags}>
          <input
            {...register("tags", { required: "Tags are required." })}
            type="text"
            id="tags"
            name="tags"
            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
          />
        </Field>
        <Field error={errors?.content}>
          <textarea
            {...register("content", { required: "Content is required." })}
            id="content"
            name="content"
            placeholder="Write your blog content"
            rows={4}
          />
        </Field>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}
