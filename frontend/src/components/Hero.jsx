import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import CodePreview from "./CodePreview";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">

      {/* Background Glow */}
      <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute top-40 right-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
          >

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-400 text-sm">

              <Sparkles className="w-4 h-4" />

              AI Powered Developer Assistant

            </div>

            <h1 className="mt-8 text-6xl lg:text-7xl font-extrabold leading-tight">

              AI Software

              <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">

                Engineering Assistant

              </span>

            </h1>

            <p className="mt-8 text-slate-400 text-xl leading-9">

              Review code.

              Explain algorithms.

              Generate unit tests.

              Analyze complexity.

              All powered by Gemini AI.

            </p>

            <div className="flex gap-5 mt-10">

              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold hover:bg-blue-700 transition">

                Start Reviewing

                <ArrowRight className="w-5 h-5"/>

              </button>

              <button className="rounded-xl border border-slate-700 px-7 py-4 hover:bg-slate-900 transition">

                Documentation

              </button>

            </div>

          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
          >

            <CodePreview/>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Hero;