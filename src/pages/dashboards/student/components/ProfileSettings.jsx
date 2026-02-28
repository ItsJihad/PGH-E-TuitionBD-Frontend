import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Save,
  User,
} from "lucide-react";

import Swal from "sweetalert2";
import useAuth from "../../../../hooks/UseAuth";

export default function ProfileSettings() {
  const { currentUser, ProfileUpdate, updateEmail } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
      setPhotoURL(currentUser.photoURL || "");
    }
  }, [currentUser]);

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!currentUser) return;

    const confirm = await Swal.fire({
      title: "Update profile?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!confirm.isConfirmed) return;

    try {
      await ProfileUpdate(currentUser, {
        displayName: name,
        photoURL,
      });

      if (email !== currentUser.email) {
        await updateEmail(currentUser, email);
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-3xl space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Profile Settings
        </h1>

        <p className="text-base-content/70">
          Update your personal information.
        </p>
      </header>

      {/* CARD */}
      <div className="bg-base-200 border border-base-300 rounded-xl p-8 space-y-8 shadow-sm">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={
              photoURL ||
              "https://api.dicebear.com/7.x/initials/svg?seed=User"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border border-base-300"
          />
        </div>

        {/* FORM */}
        <div className="space-y-6">

          {/* Name */}
          <FormInput
            label="Full Name"
            icon={<User size={16} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <FormInput
            label="Email Address"
            type="email"
            icon={<Mail size={16} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Phone */}
          <FormInput
            label="Phone Number"
            type="tel"
            icon={<Phone size={16} />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="btn btn-primary w-full gap-2"
        >
          <Save size={16} />
          Save Changes
        </button>

      </div>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */

function FormInput({
  label,
  icon,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="label">
        <span className="label-text font-medium">
          {label}
        </span>
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input input-bordered w-full pl-10"
        />
      </div>
    </div>
  );
}