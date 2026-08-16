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

        console.log("Analysis details:", data);

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
          <h2 className="text-2xl font-bold text-red-400">
            Failed to load analysis
          </h2>

          <p className="text-slate-400 mt-2">
            {error}
          </p>

          <button
            onClick={() => navigate("/history")}
            className="mt-6 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
          >
            Back to History
          </button>
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
          className="text-blue-400 hover:text-blue-300 mb-8"
        >
          ← Back to History
        </button>

        {/* Header */}
        <div className="mb-10">

          <p className="text-sm text-blue-400 font-semibold tracking-wider">
            CODEPILOT AI
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {analysis.feature} Analysis
          </h1>

          <div className="flex gap-4 mt-4 text-sm text-slate-400">
            <span>{analysis.language}</span>
            <span>•</span>
            <span>Analysis #{analysis.id}</span>
          </div>

        </div>

        {/* Code */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8">

          <div className="px-6 py-4 border-b border-slate-800 flex justify-between">
            <span className="font-semibold">
              Source Code
            </span>

            <span className="text-sm text-slate-400">
              {analysis.language}
            </span>
          </div>

          <pre className="p-6 overflow-x-auto text-sm text-slate-300">
            <code>{analysis.code}</code>
          </pre>

        </div>

        {/* AI Analysis */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          <div className="px-6 py-4 border-b border-slate-800">
            <span className="font-semibold">
              ✨ AI Analysis
            </span>
          </div>

          <div className="p-6">

            <div className="whitespace-pre-wrap text-slate-300 leading-7">
              {analysis.response}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AnalysisDetails;