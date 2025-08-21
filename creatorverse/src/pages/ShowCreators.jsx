import { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function loadCreators() {
      setLoading(true);
      setErr(null);
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) setErr(error.message);
      else setCreators(data || []);
      setLoading(false);
    }
    loadCreators();
  }, []);

  return (
    <main>
      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      {!loading && !err && creators.length === 0 ? (
        <p>No creators yet. Click “Add Creator” to create one.</p>
      ) : (
        <div className="grid">
          {creators.map((c) => <CreatorCard key={c.id} creator={c} />)}
        </div>
      )}
    </main>
  );
}
