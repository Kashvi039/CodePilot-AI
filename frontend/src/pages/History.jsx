import { useEffect, useState } from "react";
import { getHistory } from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();

        if (Array.isArray(data)) {
          setHistory(data);
        } else if (data.history) {
          setHistory(data.history);
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error("History error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-slate-400 text-lg">
            Loading your analysis history...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">⚠️</div>

          <h2 className="text-xl font-semibold mb-2">
            Failed to load history
          </h2>

          <p className="text-slate-400 text-sm break-words">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-16">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">

          <div>
            <p className="text-blue-400 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              CodePilot AI
            </p>

            <h1 className="text-4xl md:text-5xl font-bold">
              Analysis{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                History
              </span>
            </h1>

            <p className="text-slate-400 mt-4 max-w-xl text-lg">
              Review your previous code analyses, insights and AI-generated
              recommendations.
            </p>
          </div>

          {/* Analysis Count */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl px-7 py-5 min-w-[150px]">
            <p className="text-slate-500 text-sm">
              Total Analyses
            </p>

            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-bold text-white">
                {history.length}
              </span>

              <span className="text-slate-400 mb-1">
                saved
              </span>
            </div>
          </div>

        </div>

        {/* Empty State */}
        {history.length === 0 ? (
          <div className="border border-slate-800 bg-slate-900/50 rounded-3xl py-20 px-6 text-center">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-4xl mb-6">
              📂
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              No analysis history yet
            </h2>

            <p className="text-slate-400 max-w-lg mx-auto">
              Your previous code reviews, bug analyses, optimizations,
              explanations and interview assessments will appear here.
            </p>

          </div>
        ) : (

          /* History Cards */
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

            {history.map((item) => (

              <div
                key={item.id}
                className="group bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.12)]"
              >

                {/* Card Header */}
                <div className="p-6">

                  <div className="flex items-start justify-between">

                    <div className="flex items-center gap-4">

                      {/* Feature Icon */}
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
                        {getFeatureIcon(item.feature)}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {formatFeature(item.feature)}
                        </h3>

                        <p className="text-sm text-slate-400 mt-1">
                          {item.language}
                        </p>
                      </div>

                    </div>

                    <span className="text-xs text-slate-500 bg-slate-800/80 px-2.5 py-1 rounded-lg">
                      #{item.id}
                    </span>

                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-5">
                    <span>🕒</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>

                </div>

                {/* Code Preview */}
                <div className="mx-6 mb-5 rounded-xl overflow-hidden border border-slate-800 bg-[#020617]">

                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">

                    <span className="text-xs font-semibold text-slate-400 tracking-wider">
                      CODE
                    </span>

                    <span className="text-xs text-blue-400">
                      {item.language}
                    </span>

                  </div>

                  <pre className="p-4 text-xs leading-6 text-slate-300 font-mono whitespace-pre-wrap break-words h-32 overflow-hidden">
                    {item.code?.length > 220
                      ? item.code.substring(0, 220) + "..."
                      : item.code}
                  </pre>

                </div>

                {/* AI Analysis */}
                <div className="mx-6 mb-6 rounded-xl border border-purple-500/10 bg-purple-500/5 p-4">

                  <div className="flex items-center justify-between mb-3">

                    <span className="text-xs font-semibold text-purple-400 tracking-wider">
                      AI ANALYSIS
                    </span>

                    <span>✨</span>

                  </div>

                  <p className="text-sm text-slate-400 leading-6">
                    {getAnalysisPreview(item.response)}
                  </p>

                </div>

                {/* Footer */}
                <div className="border-t border-slate-800 px-6 py-4">

                  <button
                    className="w-full flex items-center justify-between text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={() =>
                      console.log("Selected analysis:", item)
                    }
                  >
                    <span>View Full Analysis</span>

                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}


/* --------------------------------
   Helper Functions
-------------------------------- */

function formatFeature(feature) {
  if (!feature) return "Analysis";

  return feature.charAt(0).toUpperCase() + feature.slice(1);
}


function getFeatureIcon(feature) {
  switch (feature?.toLowerCase()) {

    case "bugs":
      return "🐞";

    case "review":
      return "🔍";

    case "explain":
      return "📖";

    case "tests":
      return "🧪";

    case "complexity":
      return "⚡";

    case "optimize":
      return "🚀";

    case "interview":
      return "🎯";

    case "security":
      return "🔐";

    default:
      return "💻";
  }
}


function formatDate(date) {
  if (!date) return "Unknown date";

  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}


function getAnalysisPreview(response) {
  if (!response) {
    return "No analysis available.";
  }

  const clean = response
    .replace(/#{1,6}\s?/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return clean.length > 180
    ? clean.substring(0, 180) + "..."
    : clean;
}


export default History;