export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-[var(--text-secondary)]">Page not found</p>
        <a href="/" className="text-[var(--accent)] mt-4 inline-block">
          Go to JSONPretty
        </a>
      </div>
    </div>
  );
}
