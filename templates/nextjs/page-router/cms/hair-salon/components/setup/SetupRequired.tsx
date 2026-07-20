const codeStyle: React.CSSProperties = {
  backgroundColor: "#f3f4f6",
  padding: "2px 6px",
  borderRadius: 4,
  fontSize: 13,
  fontFamily: "monospace",
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
  marginBottom: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const DEPLOY_URL =
  "https://vercel.com/new/clone?repository-url=https://github.com/treyrader11/roux-templates/tree/main/templates/nextjs/page-router/cms/hair-salon&env=AUTH_SECRET,NEXTAUTH_URL&envDescription=Required%20environment%20variables&project-name=my-salon-app&integration-ids=oac_jUduyjQgOyzev1fjrW6s9QS3";

/**
 * Rendered by `_app` when the app has no database connection, so a missing
 * DATABASE_URL shows actionable setup steps instead of a crash. Inline styles
 * on purpose — this must render even if Tailwind or the theme never loads.
 */
export default function SetupRequired() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#fafafa",
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: "100%",
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "2.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: "1rem" }}>🔧</div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#111",
            marginBottom: "0.5rem",
          }}
        >
          Setup Required
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          No database connection found. Add your{" "}
          <code style={codeStyle}>DATABASE_URL</code> to get started.
        </p>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={labelStyle}>Local Development</p>
          <ol
            style={{
              paddingLeft: "1.25rem",
              color: "#4b5563",
              fontSize: 14,
              lineHeight: 2,
            }}
          >
            <li>
              Create a free database at{" "}
              <a
                href="https://neon.tech"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#6366f1" }}
              >
                neon.tech
              </a>
            </li>
            <li>Copy your connection string</li>
            <li>
              Create <code style={codeStyle}>.env.local</code> in your project
              root
            </li>
            <li>
              Add: <code style={codeStyle}>DATABASE_URL=your-connection-string</code>
            </li>
            <li>Restart the dev server</li>
          </ol>
        </div>

        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 8,
            padding: "1rem 1.25rem",
          }}
        >
          <p style={{ ...labelStyle, marginBottom: "0.5rem" }}>
            ⚡ Deploy to Vercel (Easiest)
          </p>
          <p
            style={{
              fontSize: 14,
              color: "#4b5563",
              marginBottom: "0.75rem",
              lineHeight: 1.6,
            }}
          >
            Deploy with one click — Neon database provisioned automatically, all
            env vars set for you.
          </p>
          <a href={DEPLOY_URL} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://vercel.com/button"
              alt="Deploy with Vercel"
              style={{ height: 32 }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
