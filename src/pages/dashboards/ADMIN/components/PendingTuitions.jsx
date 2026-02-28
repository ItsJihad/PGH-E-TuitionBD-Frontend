import {
  User,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Phone,
  Pencil,
  Trash2,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../../hooks/UseAxios";
import LoadingPage from "../../../../components/Loader/LoadingPage";
import Swal from "sweetalert2";

export default function AllUsers() {
  const axios = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoader(true);
        const res = await axios.get("/admin/allusers");
        setUsers(res.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };

    fetchUsers();
  }, [axios]);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoading(id);
      await axios.delete(`/admin/deleteuser/${id}`);

      setUsers((prev) => prev.filter((u) => u._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Error", "Failed to delete user.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: "Update User Info",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${user.name}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${user.email}">
        <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${user.phone}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const name = document.getElementById("swal-name").value;
        const email = document.getElementById("swal-email").value;
        const phone = document.getElementById("swal-phone").value;

        if (!name || !email || !phone) {
          Swal.showValidationMessage("All fields are required");
          return false;
        }

        return { name, email, phone };
      },
    });

    if (!formValues) return;

    try {
      setActionLoading(user._id);

      await axios.patch(`/admin/updateuser/${user._id}`, formValues);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, ...formValues } : u
        )
      );

      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Error", "Failed to update user.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const getRoleBadge = (role) => {
    if (role === "admin") return "badge-error";
    if (role === "teacher") return "badge-info";
    return "badge-primary";
  };

  if (loader) return <LoadingPage />;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Users Management
        </h1>

        <p className="text-base-content/70">
          Update user information or remove accounts.
        </p>
      </header>

      {/* USERS GRID */}
      <div className="grid gap-6">

        {users.map((user) => (
          <div
            key={user._id}
            className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">

              {/* USER INFO */}
              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <User size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {user.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <Mail size={14} />
                    {user.email}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-base-content/70 mt-1">
                    <Phone size={14} />
                    {user.phone}
                  </div>

                  <div className="mt-2">
                    <span className={`badge ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">

                <button
                  disabled={actionLoading === user._id}
                  onClick={() => handleEdit(user)}
                  className="btn btn-info btn-sm"
                >
                  <Pencil size={16} />
                </button>

                <button
                  disabled={actionLoading === user._id}
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-error btn-sm"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center text-base-content/60">
            No users found.
          </div>
        )}

      </div>
    </div>
  );
}