import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function loadOne() {
      setErr(null);
      setLoading(true);
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();
      if (error) setErr(error.message);
      else if (data)
        setForm({
          name: data.name || "",
          url: data.url || "",
          description: data.description || "",
          image_url: data.image_url || "",
        });
      setLoading(false);
    }
    loadOne();
  }, [id]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr(null);
    if (!form.name.trim() || !form.url.trim()) {
      setErr("Name and URL are required.");
      return;
    }
    try {
      setSaving(true);
      const { error } = await supabase
        .from("creators")
        .update({
          name: form.name.trim(),
          url: form.url.trim(),
          description: form.description.trim() || null,
          image_url: form.image_url.trim() || null,
        })
        .eq("id", id);
      if (error) throw error;
      navigate(`/creators/${id}`);
    } catch (e) {
      setErr(e.message || "Failed to update creator.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    const ok = window.confirm(
      "Delete this creator? This cannot be undone."
    );
    if (!ok) return;

    try {
      setErr(null);
      setDeleting(true);
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) throw error;
      navigate("/");
    } catch (e) {
      setErr(e.message || "Failed to delete creator.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "24px auto", padding: "0 16px" }}>
      <Link to={`/creators/${id}`}>← Back</Link>
      <h1>Edit Creator</h1>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      {!loading && (
        <>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
            <label>
              Name *
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
              />
            </label>

            <label>
              URL *
              <input
                name="url"
                value={form.url}
                onChange={onChange}
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                rows={4}
              />
            </label>

            <label>
              Image URL
              <input
                name="image_url"
                value={form.image_url}
                onChange={onChange}
              />
            </label>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button type="submit" disabled={saving || deleting}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <Link to={`/creators/${id}`}>Cancel</Link>
            </div>
          </form>

          <hr style={{ margin: "24px 0" }} />

          <div>
            <button
              type="button"
              onClick={onDelete}
              disabled={saving || deleting}
              style={{
                background: "crimson",
                color: "white",
                border: "none",
                padding: "10px 14px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {deleting ? "Deleting…" : "Delete Creator"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
