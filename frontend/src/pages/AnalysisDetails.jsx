import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnalysis } from "../services/api";

function AnalysisDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getAnalysis(id);
        setAnalysis(data.analysis);
      } catch (error) {
        console.error("Analysis error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <p className="text-slate-400">
          Loading analysis...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Failed to load analysis
          </h2>

          <p className="text-slate-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate("/history")}
          className="text-slate-400 hover:text-white mb-8 transition"
        >
          ← Back to History
        </button>

        {/* Header */}
        <div className="mb-10">

          <p className="text-blue-400 text-sm uppercase tracking-widest mb-3">
            CodePilot AI
          </p>

          <h1 className="text-4xl font-bold">
            {formatFeature(analysis.feature)}
          </h1>

          <div className="flex gap-4 text-slate-400 mt-3">
            <span>{analysis.language}</span>
            <span>•</span>
            <span>{formatDate(analysis.created_at)}</span>
          </div>

        </div>

        {/* Code */}
        <section className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            💻 Submitted Code
          </h2>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">

            <div className="px-5 py-3 border-b border-slate-800 text-sm text-blue-400">
              {analysis.language}
            </div>

            <pre className="p-6 overflow-x-auto text-sm leading-7 text-slate-300 font-mono">
              {analysis.code}
            </pre>

          </div>

        </section>

        {/* AI Response */}
        <section>

          <h2 className="text-xl font-semibold mb-4">
            🤖 AI Analysis
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="text-slate-300 leading-7 whitespace-pre-wrap">
              {analysis.response}
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

function formatFeature(feature) {
  if (!feature) return "Analysis";

  return feature.charAt(0).toUpperCase() + feature.slice(1);
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

export default AnalysisDetails;