import { motion } from "framer-motion";
import { Link } from "react-router-dom";


function FeatureCard({ icon: Icon, title, description, path }) {
  return (
    <Link to={path}>
      <motion.div
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-slate-800 bg-slate-900 p-8 hover:border-blue-500/40 transition shadow-xl cursor-pointer h-full"
      >
        <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-blue-400" />
        </div>

        <h3 className="text-2xl font-semibold text-white mb-3">
          {title}
        </h3>

        <p className="text-slate-400 leading-7">
          {description}
        </p>
      </motion.div>
    </Link>
  );
}

export default FeatureCard;