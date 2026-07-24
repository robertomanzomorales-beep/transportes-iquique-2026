export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#07064a",
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section>
        <h1 style={{ marginBottom: "16px", fontSize: "clamp(30px, 5vw, 52px)" }}>
          Sitio temporalmente no disponible
        </h1>

        <p style={{ margin: 0, fontSize: "18px", opacity: 0.85 }}>
          Estamos realizando labores administrativas.
        </p>
      </section>
    </main>
  );
}