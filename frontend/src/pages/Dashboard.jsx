import { useEffect, useState } from "react";
import { getStatistics } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics();

        console.log("Statistics:", data);

        setStats(data);
      } catch (error) {
        console.error("Statistics error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <p className="text-slate-400">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-400">
            Failed to load dashboard
          </h2>

          <p className="text-slate-400 mt-2">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-10">

          <p className="text-blue-400 text-sm font-semibold tracking-widest">
            CODEPILOT AI
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Developer Dashboard
          </h1>

          <p className="text-slate-400 mt-3">
            Overview of your AI-powered code analysis activity.
          </p>

        </div>


        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Total Analyses
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.total_analyses}
            </h2>

          </div>


          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Bug Analyses
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.by_feature?.bugs || 0}
            </h2>

          </div>


          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Code Reviews
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.by_feature?.review || 0}
            </h2>

          </div>

        </div>


        {/* Raw statistics for now */}

        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Analysis Breakdown
          </h2>

          <pre className="text-slate-300 text-sm overflow-x-auto">
            {JSON.stringify(stats.by_feature, null, 2)}
          </pre>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;