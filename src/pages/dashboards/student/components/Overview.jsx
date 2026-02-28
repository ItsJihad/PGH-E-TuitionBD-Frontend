import {
  BookOpen,
  Users,
  UserCheck,
  PlusCircle,
  Lightbulb,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function Overview() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      title: "How do I get more tutor applications?",
      content:
        "Make sure your tuition post has clear subject details, realistic budget, and accurate location.",
    },
    {
      title: "When is a tutor considered active?",
      content:
        "A tutor becomes active after approval and successful payment.",
    },
    {
      title: "Can I edit my tuition after posting?",
      content:
        "Yes, you can update details anytime before approving a tutor.",
    },
  ];

  return (
    <div className="relative space-y-14">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Student Dashboard
        </h1>

        <p className="text-base-content/70 text-lg">
          Manage your tuition activity at a glance.
        </p>
      </header>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Tuitions"
          value="12"
          icon={<BookOpen size={22} />}
        />
        <StatCard
          title="Tutor Applications"
          value="8"
          icon={<Users size={22} />}
        />
        <StatCard
          title="Active Tutors"
          value="3"
          icon={<UserCheck size={22} />}
        />
      </div>

      {/* SUGGESTIONS */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lightbulb size={20} className="text-warning" />
          Smart Suggestions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <SuggestionCard
            title="Increase Budget"
            desc="Higher budgets attract more experienced tutors."
          />
          <SuggestionCard
            title="Add More Details"
            desc="Detailed descriptions improve application quality."
          />
          <SuggestionCard
            title="Respond Quickly"
            desc="Faster responses increase hiring success."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">
          Helpful Information
        </h2>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-base-200 border border-base-300 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5"
              >
                <span className="font-medium">
                  {item.title}
                </span>

                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-sm text-base-content/70 leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-base-200 border border-base-300 rounded-2xl p-10 text-center space-y-4">
        <h2 className="text-2xl font-bold">
          Need a Tutor?
        </h2>

        <p className="text-base-content/70 max-w-xl mx-auto">
          Create a new tuition request and start receiving tutor applications instantly.
        </p>

        <button className="btn btn-primary gap-2">
          <PlusCircle size={18} />
          Post a New Tuition
        </button>
      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-base-content/70">{title}</p>
          <h2 className="text-3xl font-bold mt-1">{value}</h2>
        </div>

        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}

function SuggestionCard({ title, desc }) {
  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-6 transition hover:shadow-md">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-base-content/70">{desc}</p>
    </div>
  );
}