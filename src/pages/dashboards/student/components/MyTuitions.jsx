import { useEffect, useState } from "react";
import {
  MapPin,
  BookOpen,
  BadgeDollarSign,
  FileText,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { useAxiosSecure } from "../../../../hooks/UseAxios";
import UseAuth from "../../../../hooks/UseAuth";
import LoadingPage from "../../../../components/Loader/LoadingPage";
import Swal from "sweetalert2";

export default function MyTuitions() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  const axios = useAxiosSecure();
  const { currentUser } = UseAuth();

  /* ================= FETCH POSTS ================= */
  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      setLoader(true);
      const res = await axios.get("/student/alluserposts");
      setPosts(res.data.data);
      setLoader(false);
    };

    fetchData();
  }, [currentUser]);

  if (loader) return <LoadingPage />;

  /* ================= EDIT ================= */
  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Update post?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!confirm.isConfirmed) return;

    try {
      const updatedData = {
        subject: selectedPost.subject,
        classLevel: selectedPost.classLevel,
        budget: selectedPost.budget,
        location: selectedPost.location,
        description: selectedPost.description,
      };

      await axios.patch(
        `/student/post/update/${selectedPost._id}`,
        updatedData
      );

      setPosts((prev) =>
        prev.map((p) =>
          p._id === selectedPost._id ? selectedPost : p
        )
      );

      closeModal();

      Swal.fire("Updated!", "", "success");
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/student/post/delete/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      Swal.fire("Deleted!", "", "success");
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-primary">
          My Tuition Posts
        </h1>
        <p className="text-base-content/70 mt-2">
          Manage and update your tuition requests.
        </p>
      </header>

      {/* POSTS GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-base-200 border border-base-300 rounded-xl p-6 hover:shadow-lg transition"
          >
            {/* Title */}
            <div className="flex items-center gap-2 font-semibold text-lg text-primary">
              <BookOpen size={20} />
              {post.subject}
            </div>

            <p className="text-sm text-base-content/70 mt-1">
              {post.classLevel}
            </p>

            {/* Description */}
            <div className="flex items-start gap-2 mt-4 text-sm text-base-content/80">
              <FileText size={16} className="mt-1 opacity-60" />
              <span>{post.description}</span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {post.location}
              </div>

              <div className="flex items-center gap-2 text-success">
                <BadgeDollarSign size={16} />
                ৳{post.budget}/month
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleEdit(post)}
                className="btn btn-outline btn-primary btn-sm gap-2"
              >
                <Pencil size={14} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(post._id)}
                className="btn btn-outline btn-error btn-sm gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {isOpen && selectedPost && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">

            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            >
              <X size={16} />
            </button>

            <h3 className="font-bold text-lg mb-6">
              Update Tuition Post
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="subject"
                value={selectedPost.subject}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              <input
                name="classLevel"
                value={selectedPost.classLevel}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              <input
                name="budget"
                type="number"
                value={selectedPost.budget}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              <input
                name="location"
                value={selectedPost.location}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              <textarea
                name="description"
                value={selectedPost.description}
                onChange={handleChange}
                rows={3}
                className="textarea textarea-bordered w-full"
              />

              <button className="btn btn-primary w-full mt-2">
                Save Changes
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}