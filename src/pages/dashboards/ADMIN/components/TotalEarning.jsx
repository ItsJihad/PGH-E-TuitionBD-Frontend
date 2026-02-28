import { DollarSign } from "lucide-react";

export default function TotalEarning() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Total Platform Earnings
        </h1>

        <p className="text-base-content/70">
          Overview of total revenue generated.
        </p>
      </header>

      {/* CARD */}
      <div className="bg-base-200 border border-base-300 rounded-xl p-8 shadow-sm hover:shadow-md transition">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-base-content/70">
              Total Revenue
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ৳3,40,000
            </h2>
          </div>

          <div className="p-4 rounded-lg bg-primary/10 text-primary">
            <DollarSign size={24} />
          </div>

        </div>

      </div>

    </div>
  );
}