import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function loadOne() {
      setLoading(true);
      setErr(null);
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) setErr(error.message);
      else setCreator(data);
      setLoading(false);
    }
    loadOne();
  }, [id]);

  return (
    <main style={{ maxWidth: 720, margin: "24px auto", padding: "0 16px" }}>
      <Link to="/">← Back</Link>
      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}
      {!loading && !err && !creator && <p>Creator not found.</p>}

      {!loading && !err && creator && (
        <>
          <h1 style={{ marginTop: 12 }}>{creator.name}</h1>

          {creator.image_url && (
            <img
              src={creator.image_url}
              alt={creator.name}
              style={{
                width: "100%",
                maxHeight: 320,
                objectFit: "cover",
                borderRadius: 8,
                margin: "12px 0",
              }}
            />
          )}

          <p style={{ margin: "8px 0 16px", color: "white" }}>
            {creator.description || "No description yet."}
          </p>

          <p style={{ color: "white" }}>
            Channel:{" "}
            <a href={creator.url} target="_blank" rel="noreferrer">
              {creator.url}
            </a>
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Link to={`/creators/${creator.id}/edit`}>Edit</Link>
          </div>
        </>
      )}
    </main>
  );
}
