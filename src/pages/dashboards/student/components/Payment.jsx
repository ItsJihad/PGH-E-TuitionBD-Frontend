import { CheckCircle2, Clock, CreditCard } from "lucide-react";

export default function Payments() {
  return (
    <div className="space-y-12">

      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-primary">
          Payments
        </h1>

        <p className="text-base-content/70 mt-2 text-lg">
          Track your completed and pending transactions.
        </p>
      </header>

      {/* TABLE CARD */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm">

        {/* Card Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-base-300">
          <CreditCard size={20} className="text-primary" />
          <h2 className="font-semibold text-lg">
            Transaction History
          </h2>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">

            <thead>
              <tr>
                <th>Tutor</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {/* Paid Row */}
              <tr>
                <td className="font-medium">
                  Asadullah
                </td>

                <td className="font-semibold">
                  ৳10,000
                </td>

                <td>
                  <span className="badge badge-success gap-1">
                    <CheckCircle2 size={14} />
                    Paid
                  </span>
                </td>

                <td className="text-base-content/60">
                  Jan 12, 2026
                </td>
              </tr>

              {/* Pending Row */}
              <tr>
                <td className="font-medium">
                  Meraz
                </td>

                <td className="font-semibold">
                  ৳8,000
                </td>

                <td>
                  <span className="badge badge-warning gap-1">
                    <Clock size={14} />
                    Pending
                  </span>
                </td>

                <td className="text-base-content/60">
                  Jan 15, 2026
                </td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}