import { useEffect, useState } from "react";
import { getHistory } from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log("Fetching history...");

        const data = await getHistory();

        console.log("History response:", data);

        // Handle both possible response formats
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

  if (loading) {
    return <h2>Loading history...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>Failed to load history</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Analysis History</h1>

      {history.length === 0 ? (
        <p>No analysis history found.</p>
      ) : (
        history.map((item) => (
          <div key={item.id}>
            <h3>{item.feature}</h3>
            <p>Language: {item.language}</p>
            <p>{item.created_at}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;