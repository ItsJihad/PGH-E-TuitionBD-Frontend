import {
  BookOpen,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function TeacherOverview() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Teacher Dashboard
        </h1>

        <p className="text-base-content/70">
          Monitor your applications, approvals and earnings at a glance.
        </p>
      </header>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Total Applications"
          value="18"
          sub="3 new this week"
          icon={<BookOpen size={18} />}
        />

        <StatCard
          title="Approved Tuitions"
          value="6"
          sub="Currently active"
          icon={<CheckCircle size={18} />}
        />

        <StatCard
          title="Total Revenue"
          value="৳60,000"
          sub="↑ 12% this month"
          icon={<DollarSign size={18} />}
        />

      </div>

      {/* ACTIVITY + ACTIONS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <div className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm">

          <h2 className="text-lg font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-5 text-sm">

            <ActivityItem
              icon={<Clock size={14} />}
              text="Applied to Mathematics - Class 10"
              time="2 hours ago"
            />

            <ActivityItem
              icon={<CheckCircle size={14} />}
              text="Approved for Physics - Class 12"
              time="Yesterday"
            />

            <ActivityItem
              icon={<TrendingUp size={14} />}
              text="Received ৳12,000 payment"
              time="3 days ago"
            />

          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm">

          <h2 className="text-lg font-semibold mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <QuickAction
              title="View My Applications"
              desc="Track pending and approved tuition requests."
            />

            <QuickAction
              title="Check Approved Tuitions"
              desc="See your active tuition responsibilities."
            />

            <QuickAction
              title="Review Revenue History"
              desc="Monitor your monthly earnings and payments."
            />

          </div>

        </div>

      </div>

    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, sub, icon }) {
  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-6 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-base-content/70">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {value}
          </h2>

          <p className="text-xs text-base-content/50 mt-2">
            {sub}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>

      </div>

    </div>
  );
}

/* ================= ACTIVITY ITEM ================= */

function ActivityItem({ icon, text, time }) {
  return (
    <div className="flex items-start gap-4">

      <div className="p-2 rounded-lg bg-base-300 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-base-content">
          {text}
        </p>

        <p className="text-xs text-base-content/50 mt-1">
          {time}
        </p>
      </div>

    </div>
  );
}

/* ================= QUICK ACTION ================= */

function QuickAction({ title, desc }) {
  return (
    <div className="group border border-base-300 rounded-lg p-4 hover:bg-base-300 transition cursor-pointer">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="text-sm text-base-content/70 mt-1">
            {desc}
          </p>
        </div>

        <ArrowRight
          size={16}
          className="text-primary group-hover:translate-x-1 transition"
        />

      </div>

    </div>
  );
}