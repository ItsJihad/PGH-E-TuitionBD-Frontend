import {
  Calendar,
  DollarSign,
  TrendingUp,
  BookOpen,
} from "lucide-react";

export default function RevenueHistory() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Revenue History
        </h1>

        <p className="text-base-content/70">
          Track your completed payments and total earnings.
        </p>
      </header>

      {/* SUMMARY CARDS */}
      <div className="grid sm:grid-cols-3 gap-6">

        <SummaryCard
          title="Total Earnings"
          value="৳20,000"
          icon={<DollarSign size={18} />}
        />

        <SummaryCard
          title="This Month"
          value="৳12,000"
          icon={<TrendingUp size={18} />}
        />

        <SummaryCard
          title="Total Transactions"
          value="2"
          icon={<BookOpen size={18} />}
        />

      </div>

      {/* TABLE CARD */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm">

        <div className="overflow-x-auto">
          <table className="table table-zebra">

            <thead>
              <tr>
                <th>Tuition</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>
                  <p className="font-semibold">
                    Mathematics — Class 10
                  </p>
                  <p className="text-xs text-base-content/50">
                    Tuition ID: #203948
                  </p>
                </td>

                <td className="font-bold text-success">
                  ৳8,000
                </td>

                <td className="flex items-center gap-2 text-base-content/70">
                  <Calendar size={14} />
                  Jan 12, 2026
                </td>

                <td>
                  <span className="badge badge-success">
                    Paid
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="font-semibold">
                    Physics — Class 12
                  </p>
                  <p className="text-xs text-base-content/50">
                    Tuition ID: #203949
                  </p>
                </td>

                <td className="font-bold text-success">
                  ৳12,000
                </td>

                <td className="flex items-center gap-2 text-base-content/70">
                  <Calendar size={14} />
                  Feb 03, 2026
                </td>

                <td>
                  <span className="badge badge-success">
                    Paid
                  </span>
                </td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-6 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-base-content/70">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-1">
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