export default function ForbiddenPage() {
  return (
    <main className="forbidden-page">
      <h1>Access denied</h1>
      <p>Your account does not have permission to view this page.</p>
      <a href="/top">Return to application</a>
    </main>
  );
}