import {
  CheckCircle2,
  XCircle,
  Star,
  Briefcase,
  BookOpen,
} from "lucide-react";

export default function TeachingApplications() {
  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Tutor Applications
        </h1>

        <p className="text-base-content/70">
          Review and approve the best tutor for your tuition.
        </p>
      </header>

      {/* ================= APPLICATION CARD ================= */}
      <div className="grid gap-6">

        <div className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm hover:shadow-md transition">

          {/* Applied For */}
          <div className="flex items-center gap-3 bg-base-100 border border-base-300 rounded-lg px-4 py-3 mb-6">
            <BookOpen size={18} className="text-primary" />

            <div>
              <p className="text-xs text-base-content/60">
                Applied For
              </p>
              <h4 className="font-semibold">
                Mathematics — Class 10 (Gulshan, Dhaka)
              </h4>
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Tutor Info */}
            <div className="flex items-center gap-5">
              <img
                src="https://ui-avatars.com/api/?name=Tutor"
                alt="Tutor"
                className="w-16 h-16 rounded-full border border-base-300"
              />

              <div>
                <h3 className="text-lg font-bold">
                  Asadullah Al Jihad
                </h3>

                <div className="flex items-center gap-2 text-sm text-base-content/70 mt-1">
                  <Briefcase size={14} />
                  MSc Math • 3 Years Experience
                </div>

                <div className="flex items-center gap-2 mt-2 font-semibold text-primary">
                  <Star size={14} className="fill-current" />
                  Expected Salary: ৳10,000
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">

              <button className="btn btn-success btn-sm gap-2">
                <CheckCircle2 size={16} />
                Accept
              </button>

              <button className="btn btn-error btn-outline btn-sm gap-2">
                <XCircle size={16} />
                Reject
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}