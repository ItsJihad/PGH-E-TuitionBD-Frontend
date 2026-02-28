import {
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Receipt,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../../hooks/UseAxios";
import LoadingPage from "../../../../components/Loader/LoadingPage";

export default function AdminOverview() {
  const axios = useAxiosSecure();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTuitions: 0,
    pendingReviews: 0,
  });

  const [loader, setLoader] = useState(false);

  /* ================= FETCH DASHBOARD DATA ================= */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoader(true);

        const [usersRes, tuitionsRes, postsRes] = await Promise.all([
          axios.get("/admin/allusers"),
          axios.get("/private/allprivateposts"),
          axios.get("/admin/allposts"),
        ]);

        const users = usersRes.data || [];
        const tuitions = tuitionsRes.data || [];
        const posts = postsRes.data || [];

        const pending = posts.filter(
          (post) => post.status === "pending"
        );

        setStats({
          totalUsers: users.length,
          totalTuitions: tuitions.length,
          pendingReviews: pending.length,
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchDashboardData();
  }, [axios]);

  if (loader) return <LoadingPage />;

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Admin Dashboard
        </h1>

        <p className="text-base-content/70">
          Monitor platform performance, financial activity and system health.
        </p>
      </header>

      {/* ================= STATS ================= */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users size={18} />}
        />

        <StatCard
          title="Total Tuitions"
          value={stats.totalTuitions}
          icon={<BookOpen size={18} />}
        />

        <StatCard
          title="Pending Reviews"
          value={stats.pendingReviews}
          icon={<LayoutDashboard size={18} />}
        />

        <StatCard
          title="Total Revenue"
          value="৳3,40,000"
          icon={<DollarSign size={18} />}
        />

      </section>

      {/* ================= ANALYTICS ================= */}
      <section className="space-y-6">

        <header>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Reports & Analytics
          </h2>

          <p className="text-base-content/70 text-sm mt-1">
            Financial overview and transaction insights.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <AnalyticsCard
            title="Platform Earnings (This Month)"
            value="৳48,000"
            icon={<DollarSign size={18} />}
          />

          <AnalyticsCard
            title="Successful Transactions"
            value="126"
            icon={<Receipt size={18} />}
          />

          <AnalyticsCard
            title="Active Revenue Streams"
            value="Tuition Fees"
            icon={<Activity size={18} />}
          />

        </div>
      </section>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, icon }) {
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
        </div>

        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>

      </div>

    </div>
  );
}

/* ================= ANALYTICS CARD ================= */

function AnalyticsCard({ title, value, icon }) {
  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-6 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-base-content/70">
            {title}
          </p>

          <h3 className="text-lg font-bold mt-1">
            {value}
          </h3>
        </div>

        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>

      </div>

    </div>
  );
}