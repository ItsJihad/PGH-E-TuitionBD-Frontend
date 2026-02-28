import {
  BookOpen,
  MapPin,
  BadgeDollarSign,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../../hooks/UseAxios";
import LoadingPage from "../../../../components/Loader/LoadingPage";
import Swal from "sweetalert2";

export default function ManagePrivatePosts() {
  const axios = useAxiosSecure();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH POSTS ================= */
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/allposts");
      setPosts(res.data || []);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch posts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${status} this post.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.patch(`/student/post/update/${id}`, {
        status,
      });

      await fetchPosts();

      Swal.fire({
        icon: "success",
        title: `Post ${status}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "Action failed", "error");
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Manage Private Tuition Posts
        </h1>

        <p className="text-base-content/70">
          Approve or reject student tuition requests.
        </p>
      </header>

      {/* POSTS GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >

            {/* SUBJECT */}
            <div className="flex items-center gap-2 font-semibold text-lg">
              <BookOpen size={18} className="text-primary" />
              {post.subject}
            </div>

            <p className="text-sm text-base-content/70 mt-1">
              Class {post.classLevel}
            </p>

            {/* DESCRIPTION */}
            <div className="flex items-start gap-2 mt-4 text-sm text-base-content/70">
              <FileText size={16} />
              <span>{post.description}</span>
            </div>

            {/* META INFO */}
            <div className="flex flex-wrap gap-6 mt-4 text-sm text-base-content/70">

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {post.location}
              </div>

              <div className="flex items-center gap-2">
                <BadgeDollarSign size={16} />
                ৳ {post.budget}
              </div>

              <StatusBadge status={post.status || "pending"} />

            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-6">

              <button
                onClick={() => updateStatus(post._id, "approved")}
                disabled={post.status === "approved"}
                className="btn btn-success btn-sm gap-2 disabled:opacity-50"
              >
                <CheckCircle2 size={14} />
                Approve
              </button>

              <button
                onClick={() => updateStatus(post._id, "rejected")}
                disabled={post.status === "rejected"}
                className="btn btn-error btn-sm gap-2 disabled:opacity-50"
              >
                <XCircle size={14} />
                Reject
              </button>

            </div>

          </div>
        ))}

        {posts.length === 0 && (
          <div className="col-span-2 text-center text-base-content/60">
            No private posts found.
          </div>
        )}

      </div>
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }) {
  const map = {
    approved: "badge-success",
    rejected: "badge-error",
    pending: "badge-warning",
  };

  return (
    <span className={`badge ${map[status] || "badge-warning"}`}>
      {status}
    </span>
  );
}