import { Code2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <Code2 className="w-8 h-8 text-blue-500" />

          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            CodePilot AI
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-300">

          <Link
            to="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/review"
            className="hover:text-white transition"
          >
            Review
          </Link>

          <Link
            to="/explain"
            className="hover:text-white transition"
          >
            Explain
          </Link>

          <Link
            to="/tests"
            className="hover:text-white transition"
          >
            Tests
          </Link>

          <Link
            to="/complexity"
            className="hover:text-white transition"
          >
            Complexity
          </Link>

        </div>

        {/* CTA Button */}
        <Link
          to="/review"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl text-white font-medium"
        >
          Start Reviewing

          <ArrowRight className="w-5 h-5" />
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;