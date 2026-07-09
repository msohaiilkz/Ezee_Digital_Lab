export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        color: "#333",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        textAlign: "center",
        padding: "2rem"
      }}
    >
      <div>
        <h1 style={{ fontSize: "6rem", margin: 0, fontWeight: 800, letterSpacing: "-0.04em", color: "#111" }}>Error 404</h1>
        <p style={{ marginTop: "1rem", fontSize: "1.125rem", color: "#666" }}>This page could not be found.</p>
      </div>
    </div>
  );
}
