import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Review from "./pages/Review";
import Explain from "./pages/Explain";
import Tests from "./pages/Tests";
import Complexity from "./pages/Complexity";
import Optimize from "./pages/Optimize";
import BugFinder from "./pages/BugFinder";
import SecurityReview from "./pages/SecurityReview";
import InterviewMode from "./pages/InterviewMode";
import History from "./pages/History";
import AnalysisDetails from "./pages/AnalysisDetails";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/explain" element={<Explain />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/complexity" element={<Complexity />} />
        <Route path="/optimize" element={<Optimize />} />
        <Route path="/bugs" element={<BugFinder />} />
        <Route path="/security" element={<SecurityReview />} />
        <Route path="/interview" element={<InterviewMode />} />

        <Route path="/history" element={<History />} />
        <Route
  path="/history/:id"
  element={<AnalysisDetails />}
/>
<Route
  path="/history/:id"
  element={<AnalysisDetails />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;