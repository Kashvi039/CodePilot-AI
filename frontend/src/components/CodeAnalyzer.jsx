import { useState } from "react";
import { analyzeCode } from "../services/api";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import jsPDF from "jspdf";

function CodeAnalyzer({ title, feature }) {

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {

    if (!code.trim()) {
      toast.error("Please enter some code.");
      return;
    }

    try {

      setLoading(true);

      const response = await analyzeCode({
        feature,
        language,
        code,
      });

      setResult(response.response);

      toast.success("Analysis Complete!");

    } catch (error) {

      console.error(error);

      if (error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error(error.message);
      }

    } finally {

      setLoading(false);

    }

  };

  const clearEditor = () => {

    setCode("");
    setResult("");

    toast.success("Editor Cleared");

  };

  const downloadPDF = () => {

    if (!result) {
      toast.error("Nothing to download!");
      return;
    }

    const pdf = new jsPDF();

    pdf.setFont("helvetica");

    pdf.setFontSize(12);

    const lines = pdf.splitTextToSize(result, 180);

    pdf.text(lines, 10, 15);

    pdf.save("AI_Analysis.pdf");

    toast.success("PDF Downloaded");

  };
  const handleFileUpload = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const allowedExtensions = [
    ".cpp",
    ".c",
    ".py",
    ".java",
    ".js",
    ".ts",
    ".cs",
  ];

  const isValid = allowedExtensions.some((ext) =>
    file.name.toLowerCase().endsWith(ext)
  );

  if (!isValid) {
    toast.error("Unsupported file type!");
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    setCode(e.target.result);
    toast.success(`${file.name} loaded successfully!`);
  };

  reader.readAsText(file);
};

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            {title}
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Paste your code, choose a language and let AI analyze it.
          </p>

        </div>

        {/* Language */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Programming Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 w-72"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>

        </div>

        {/* Workspace */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT PANEL */}

          <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-lg">

            <div className="px-5 py-4 border-b border-slate-700 text-lg font-semibold">

              💻 Code Editor

            </div>

            <Editor

              height="650px"

              language={language}

              theme="vs-dark"

              value={code}

              onChange={(value) => setCode(value || "")}

              options={{

                minimap: {
                  enabled: false,
                },

                fontSize: 15,

                automaticLayout: true,

                scrollBeyondLastLine: false,

                wordWrap: "on",

                tabSize: 4,

              }}

            />

          </div>
                    {/* RIGHT PANEL */}

          <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-lg overflow-hidden">

            {/* Response Header */}

            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-700">

              <h2 className="text-lg font-semibold">
                🤖 AI Response
              </h2>

              <div className="flex gap-3">

                <CopyToClipboard
                  text={result}
                  onCopy={() => toast.success("Copied Successfully!")}
                >
                  <button
                    disabled={!result}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 px-4 py-2 rounded-lg transition"
                  >
                    📋 Copy
                  </button>
                </CopyToClipboard>

                <button
                  onClick={downloadPDF}
                  disabled={!result}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-slate-700 px-4 py-2 rounded-lg transition"
                >
                  ⬇ PDF
                </button>

              </div>

            </div>

            {/* Response Body */}

            <div className="h-[650px] overflow-y-auto p-6">

              {loading ? (

                <div className="flex flex-col justify-center items-center h-full">

                  <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-500 mb-6"></div>

                  <p className="text-xl">
                    AI is analyzing your code...
                  </p>

                </div>

              ) : result ? (

                <div className="prose prose-invert max-w-none">

                  <ReactMarkdown
                    components={{
                      code({ inline, className, children, ...props }) {

                        const match = /language-(\w+)/.exec(className || "");

                        return !inline && match ? (

                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>

                        ) : (

                          <code
                            className="bg-slate-800 px-1 py-0.5 rounded"
                            {...props}
                          >
                            {children}
                          </code>

                        );

                      },
                    }}
                  >
                    {result}
                  </ReactMarkdown>

                </div>

              ) : (

                <div className="flex flex-col justify-center items-center h-full text-slate-500">

                  <div className="text-7xl mb-6">
                    🤖
                  </div>

                  <h3 className="text-2xl font-semibold mb-3">
                    No Analysis Yet
                  </h3>

                  <p className="text-center">
                    Paste your code into the editor and click
                    <br />
                    <span className="font-semibold text-white">
                      Analyze Code
                    </span>
                    .
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* Bottom Buttons */}

       <div className="flex flex-wrap gap-4 mt-8">

  <label className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-semibold cursor-pointer transition">
    📂 Upload File

    <input
      type="file"
      accept=".cpp,.c,.py,.java,.js,.ts,.cs"
      onChange={handleFileUpload}
      className="hidden"
    />
  </label>

  <button
    onClick={handleAnalyze}
    disabled={loading}
    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 px-8 py-3 rounded-xl font-semibold transition"
  >
    {loading ? "Analyzing..." : "🚀 Analyze Code"}
  </button>

  <button
    onClick={clearEditor}
    className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-semibold transition"
  >
    🗑 Clear
  </button>

</div>

      </div>

    </div>

  );

}

export default CodeAnalyzer;