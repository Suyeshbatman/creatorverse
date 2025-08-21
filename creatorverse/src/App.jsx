import { useRoutes, Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";
import AddCreator from "./pages/AddCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";

export default function App() {
  const element = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/creators/new", element: <AddCreator /> },
    { path: "/creators/:id", element: <ViewCreator /> },
    { path: "/creators/:id/edit", element: <EditCreator /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      {/* Top Nav */}
      <div className="container content" style={{ maxWidth: 1100, margin: "24px auto 12px", padding: 8 }}>
        <nav
          aria-label="Main"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 12,
            padding: "6px 8px",
          }}
        >
          <div style={{ justifySelf: "start", display: "flex", gap: 12 }}>
            <Link to="/" role="button" className="secondary">Home</Link>
          </div>

          <h1 className="brand" style={{ margin: 0, textAlign: "center" }}>Creatorverse</h1>

          <div style={{ justifySelf: "end", display: "flex", gap: 12 }}>
            <Link to="/creators/new" role="button">Add Creator</Link>
          </div>
        </nav>
      </div>

      {/* Content container (cards, pages, etc.) */}
      <div className="container content" style={{ maxWidth: 1100, margin: "0 auto 24px", padding: 16 }}>
        {element}
      </div>
    </>
  );
}

function NotFound() {
  return <h2>404 — Page not found</h2>;
}
