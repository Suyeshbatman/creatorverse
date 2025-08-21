import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    image_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr(null);

    // Validation
    if (!form.name.trim() || !form.url.trim()) {
      setErr("Name and URL are required.");
      return;
    }

    try {
      setSaving(true);
      const { error } = await supabase.from("creators").insert({
        name: form.name.trim(),
        url: form.url.trim(),
        description: form.description.trim() || null,
        image_url: form.image_url.trim() || null,
      });
      if (error) throw error;

      // Go back to list after successful insert
      navigate("/");
    } catch (e) {
      setErr(e.message || "Failed to add creator.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "24px auto", padding: "0 16px" }}>
      <Link to="/">← Back</Link>
      <h1>Add New Creator</h1>

      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Name *
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="e.g., Fireship"
            required
          />
        </label>

        <label>
          URL * 
          <input
            name="url"
            value={form.url}
            onChange={onChange}
            placeholder="https://youtube.com/@…"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="What do they create?"
            rows={4}
          />
        </label>

        <label>
          Image URL (optional)
          <input
            name="image_url"
            value={form.image_url}
            onChange={onChange}
            placeholder="https://…/image.jpg"
          />
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Add Creator"}
        </button>
      </form>
    </main>
  );
}
