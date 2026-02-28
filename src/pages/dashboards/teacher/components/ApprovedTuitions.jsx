import {
  CheckCircle,
  MapPin,
  BadgeDollarSign,
  CalendarDays,
  Clock,
  BookOpen,
} from "lucide-react";

export default function ApprovedTuition() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Approved Tuitions
        </h1>

        <p className="text-base-content/70">
          These are the tuition posts you’ve been hired for.
        </p>
      </header>

      {/* LIST */}
      <div className="grid gap-6">
        <ApprovedCard
          subject="Physics"
          classLevel="Class 12"
          location="Banani, Dhaka"
          salary="৳12,000"
          startDate="Jan 20, 2026"
        />
      </div>
    </div>
  );
}

/* ================= CARD ================= */

function ApprovedCard({
  subject,
  classLevel,
  location,
  salary,
  startDate,
}) {
  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm hover:shadow-md transition">

      {/* TOP */}
      <div className="flex flex-wrap justify-between items-start gap-4">

        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            {subject} — {classLevel}
          </h3>

          <p className="text-xs text-base-content/50 mt-1">
            Tuition ID: #203948
          </p>
        </div>

        <span className="badge badge-success gap-1">
          <CheckCircle size={14} />
          Approved
        </span>
      </div>

      {/* DETAILS */}
      <div className="flex flex-wrap gap-6 mt-6 text-sm text-base-content/70">

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {location}
        </div>

        <div className="flex items-center gap-2">
          <BadgeDollarSign size={16} />
          {salary} / month
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          Started: {startDate}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 pt-4 border-t border-base-300 flex items-center justify-between flex-wrap gap-4">

        <div className="flex items-center gap-2 text-sm text-base-content/60">
          <Clock size={14} />
          Ongoing Tuition
        </div>

        <div className="text-right">
          <p className="text-xs text-base-content/60">
            Monthly Revenue
          </p>

          <p className="text-lg font-bold text-success">
            {salary}
          </p>
        </div>
      </div>

    </div>
  );
}