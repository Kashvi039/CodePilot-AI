import {
  BrainCircuit,
  BookOpen,
  TestTube,
  ChartColumn,
  Rocket,
} from "lucide-react";
import { Bug } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { GraduationCap } from "lucide-react";


import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="bg-slate-950 text-white py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center">
          Powerful AI Features
        </h2>

        <p className="text-center text-slate-400 mt-5 max-w-2xl mx-auto">
          Everything you need to review, understand, optimize,
          and improve your code using AI.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          <FeatureCard
            icon={BrainCircuit}
            title="AI Code Review"
            description="Detect bugs, code smells and receive intelligent suggestions."
            path="/review"
          />
          <FeatureCard
    icon={GraduationCap}
    title="Interview Mode"
    description="Practice coding interviews with AI-generated questions and feedback."
    path="/interview"
/>
          <FeatureCard
  icon={ShieldCheck}
  title="Security Review"
  description="Detect vulnerabilities and receive secure coding recommendations."
  path="/security"
/>

          <FeatureCard
            icon={BookOpen}
            title="Explain Code"
            description="Understand complex algorithms with easy AI-generated explanations."
            path="/explain"
          />

          <FeatureCard
            icon={ChartColumn}
            title="Complexity Analysis"
            description="Analyze time and space complexity with detailed insights."
            path="/complexity"
          />

          <FeatureCard
            icon={TestTube}
            title="Generate Tests"
            description="Automatically create unit test cases for your code."
            path="/tests"
          />

          <FeatureCard
            icon={Rocket}
            title="Optimize Code"
            description="Improve performance, readability and efficiency using AI."
            path="/optimize"
          />
          <FeatureCard
  icon={Bug}
  title="Bug Finder"
  description="Detect logical bugs, runtime issues, memory leaks and edge cases."
  path="/bugs"
/>

        </div>

      </div>

    </section>
  );
}

export default Features;