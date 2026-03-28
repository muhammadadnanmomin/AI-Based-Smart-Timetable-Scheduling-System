import { Link } from "react-router-dom";
import {
  CalendarDays,
  ShieldCheck,
  Users,
  Zap,
  ArrowRight,
  ClipboardList,
  SlidersHorizontal,
  Play,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Easy Scheduling",
    description:
      "Intuitive interface to set up and manage your academic timetables effortlessly.",
  },
  {
    icon: ShieldCheck,
    title: "Conflict-Free Timetables",
    description:
      "Automatically detects and resolves scheduling conflicts so you don't have to.",
  },
  {
    icon: Users,
    title: "Teacher & Room Management",
    description:
      "Manage teachers, rooms, and subjects in one centralized place.",
  },
  {
    icon: Zap,
    title: "Fast Generation",
    description:
      "Generate optimized timetables in seconds with our smart algorithm.",
  },
];

const steps = [
  {
    number: "1",
    icon: ClipboardList,
    title: "Add Teachers & Subjects",
    description: "Enter your teachers, subjects, classes, and rooms.",
  },
  {
    number: "2",
    icon: SlidersHorizontal,
    title: "Define Constraints",
    description: "Set preferences, time slots, and scheduling rules.",
  },
  {
    number: "3",
    icon: Play,
    title: "Generate Timetable",
    description: "Click generate and get an optimized, conflict-free timetable.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
            SmartTT
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Simple illustration */}
          <div className="mx-auto mb-8 w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <CalendarDays className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Smart Timetable Scheduling Made Simple
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            Automatically generate optimized class schedules with ease.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-md transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-300 hover:border-gray-400 hover:text-gray-900 px-6 py-2.5 rounded-md transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Everything You Need
            </h2>
            <p className="mt-2 text-gray-500 text-sm sm:text-base">
              Powerful features to simplify your scheduling workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-2 text-gray-500 text-sm sm:text-base">
              Three simple steps to your perfect timetable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={step.number} className="text-center relative">
                {/* Connector line (desktop only) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-gray-200" />
                )}
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-4 relative z-10">
                  {step.number}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Start building your timetable today
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Create a free account and generate your first timetable in minutes.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-md transition-colors"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <span className="font-medium text-gray-600">SmartTT</span>
          <span>© 2026 SmartTT. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
