import {
  User,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../../hooks/UseAxios";
import LoadingPage from "../../../../components/Loader/LoadingPage";
import Swal from "sweetalert2";

export default function ManageTeachers() {
  const axios = useAxiosSecure();

  const [teachers, setTeachers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [changingId, setChangingId] = useState(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoader(true);
        const res = await axios.get("/admin/allteachers");
        setTeachers(res.data || []);
      } catch {
        Swal.fire("Error", "Failed to load teachers", "error");
      } finally {
        setLoader(false);
      }
    };

    fetchTeachers();
  }, [axios]);

  /* ================= ROLE CHANGE ================= */
  const handleChangeRole = async (teacher) => {
    const { value: newRole } = await Swal.fire({
      title: "Change Role",
      input: "select",
      inputOptions: {
        admin: "Admin",
        teacher: "Teacher",
        student: "Student",
      },
      inputValue: teacher.role,
      showCancelButton: true,
      confirmButtonText: "Update Role",
    });

    if (!newRole || newRole === teacher.role) return;

    try {
      setChangingId(teacher._id);

      await axios.patch(`/admin/updateuser/${teacher._id}`, {
        role: newRole,
      });

      setTeachers((prev) =>
        prev.map((t) =>
          t._id === teacher._id ? { ...t, role: newRole } : t
        )
      );

      Swal.fire({
        icon: "success",
        title: "Role Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire(
        "Update Failed",
        error.response?.data?.message || "Server error",
        "error"
      );
    } finally {
      setChangingId(null);
    }
  };

  /* ================= ROLE UI ================= */
  const getRoleBadge = (role) => {
    if (role === "admin") return "badge-error";
    if (role === "teacher") return "badge-info";
    return "badge-primary";
  };

  const getRoleIcon = (role) => {
    if (role === "admin") return <ShieldCheck size={14} />;
    if (role === "teacher") return <Briefcase size={14} />;
    return <GraduationCap size={14} />;
  };

  if (loader) return <LoadingPage />;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Manage Teachers
        </h1>

        <p className="text-base-content/70">
          Change teacher roles dynamically.
        </p>
      </header>

      {/* LIST */}
      <div className="grid gap-6">

        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              {/* USER INFO */}
              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <User size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {teacher.name}
                  </h3>

                  <p className="text-sm text-base-content/70">
                    {teacher.email}
                  </p>

                  <span
                    className={`badge mt-2 flex items-center gap-1 ${getRoleBadge(
                      teacher.role
                    )}`}
                  >
                    {getRoleIcon(teacher.role)}
                    {teacher.role}
                  </span>
                </div>

              </div>

              {/* ACTION */}
              <button
                disabled={changingId === teacher._id}
                onClick={() => handleChangeRole(teacher)}
                className="btn btn-primary btn-sm"
              >
                <RefreshCw size={16} />
                Change Role
              </button>

            </div>
          </div>
        ))}

        {teachers.length === 0 && (
          <div className="text-center text-base-content/60">
            No teachers found.
          </div>
        )}

      </div>
    </div>
  );
}