import { useForm } from "react-hook-form";
import {
  BookOpen,
  GraduationCap,
  MapPin,
  BadgeDollarSign,
  FileText,
  Send,
} from "lucide-react";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../../hooks/UseAxios";

export default function PostTuition() {
  const axios = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    const confirm = await Swal.fire({
      title: "Submit tuition?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Submit",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.post("/student/post", data);

      Swal.fire({
        icon: "success",
        title: "Posted successfully",
        timer: 1800,
        showConfirmButton: false,
      });

      reset();
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">

      {/* HEADER */}
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-primary">
          Post New Tuition
        </h1>

        <p className="text-base-content/70">
          Publish your tuition request and connect with tutors.
        </p>
      </header>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 border border-base-300 rounded-xl p-8 space-y-6 shadow-sm"
      >

        <div className="grid md:grid-cols-2 gap-6">

          <FormInput
            label="Subject"
            icon={<BookOpen size={16} />}
            register={register("subject", { required: "Subject is required" })}
            error={errors.subject}
            placeholder="e.g. Mathematics"
          />

          <FormInput
            label="Class"
            icon={<GraduationCap size={16} />}
            register={register("classLevel", { required: "Class is required" })}
            error={errors.classLevel}
            placeholder="e.g. Class 10"
          />

          <FormInput
            label="Location"
            icon={<MapPin size={16} />}
            register={register("location", { required: "Location is required" })}
            error={errors.location}
            placeholder="e.g. Gulshan, Dhaka"
          />

          <FormInput
            label="Monthly Budget"
            type="number"
            icon={<BadgeDollarSign size={16} />}
            register={register("budget", {
              required: "Budget is required",
              min: { value: 1000, message: "Minimum budget is 1000" },
            })}
            error={errors.budget}
            placeholder="e.g. 8000"
          />

        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="label">
            <span className="label-text font-medium">
              Description
            </span>
          </label>

          <textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Describe your tuition requirements..."
            className={`textarea textarea-bordered w-full ${
              errors.description ? "textarea-error" : ""
            }`}
          />

          {errors.description && (
            <p className="text-xs text-error mt-2">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full gap-2"
        >
          <Send size={16} />
          {isSubmitting ? "Posting..." : "Submit Tuition"}
        </button>

      </form>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */

function FormInput({
  label,
  icon,
  placeholder,
  register,
  error,
  type = "text",
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
          {...register}
          placeholder={placeholder}
          className={`input input-bordered w-full pl-10 ${
            error ? "input-error" : ""
          }`}
        />
      </div>

      {error && (
        <p className="text-xs text-error mt-2">
          {error.message}
        </p>
      )}
    </div>
  );
}