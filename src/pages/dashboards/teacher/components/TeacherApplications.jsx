import {
  BookOpen,
  MapPin,
  BadgeDollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarDays,
} from "lucide-react";

export default function TeacherApplications() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          My Applications
        </h1>

        <p className="text-base-content/70">
          Track the status of all tuition posts you’ve applied to.
        </p>
      </header>

      {/* APPLICATION LIST */}
      <div className="grid gap-6">
        <ApplicationCard
          subject="Mathematics"
          classLevel="Class 10"
          location="Gulshan, Dhaka"
          budget="৳8,000"
          status="Pending"
          date="Jan 15, 2026"
        />
      </div>

    </div>
  );
}

/* ================= CARD ================= */

function ApplicationCard({
  subject,
  classLevel,
  location,
  budget,
  status,
  date,
}) {
  const statusMap = {
    Pending: {
      badge: "badge-warning",
      icon: <Clock size={14} />,
    },
    Approved: {
      badge: "badge-success",
      icon: <CheckCircle2 size={14} />,
    },
    Rejected: {
      badge: "badge-error",
      icon: <XCircle size={14} />,
    },
  };

  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm hover:shadow-md transition">

      {/* TITLE */}
      <div className="flex items-start justify-between flex-wrap gap-4">

        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            {subject} — {classLevel}
          </h3>

          <p className="text-xs text-base-content/50 mt-1">
            Tuition ID: #102938
          </p>
        </div>

        {/* STATUS BADGE */}
        <span className={`badge gap-1 ${statusMap[status].badge}`}>
          {statusMap[status].icon}
          {status}
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
          Budget: {budget}
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          Applied: {date}
        </div>

      </div>

    </div>
  );
}