import { Link, useNavigate } from "react-router-dom";
import AutoFitHeading from "./AutoFitHeading";

export default function CreatorCard({ creator }) {
  if (!creator) return null;
  const { id, name, url, description, image_url } = creator;
  const navigate = useNavigate();

  const fallbackSrc = "/images/crea.webp";

  function goToDetails() {
    navigate(`/creators/${id}`);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetails();
    }
  }

  // helper to stop the card click when pressing inner buttons/links
  function stop(e) {
    e.stopPropagation();
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={onKeyDown}
      style={{
        cursor: "pointer",
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.18)",
        padding: 12
      }}
    >
      <div
        style={{
            width: "100%",
            height: 180,
            overflow: "hidden",
            borderRadius: 6,
            marginBottom: 10,
        }}
        >
            <img
                src={image_url || fallbackSrc}
                alt={name}
                onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackSrc;
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
        </div>

        <header>
        <AutoFitHeading max={22} min={12} style={{ margin: 0, lineHeight: 1.15 }}>
            {name}
        </AutoFitHeading>
        </header>

      <p style={{ marginTop: 0 }}>{description || "No description yet."}</p>

      <footer
            style={{
                display: "flex",
                justifyContent: "center",  
                alignItems: "center",
                gap: 12,
                padding: "8px 0"
            }}
        >
        {/* Stop propagation so the card click doesn't fire */}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          role="button"
          className="secondary"
          onClick={stop}
        >
          Visit
        </a>
        <Link
          to={`/creators/${id}/edit`}
          role="button"
          className="outline"
          onClick={stop}
        >
          Edit
        </Link>
      </footer>
    </article>
  );
}
