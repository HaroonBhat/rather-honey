export default function Loading() {
  return (
    <div className="loading-page" role="status" aria-live="polite">
      <span className="loader-hex" aria-hidden="true" />
      <p className="micro" style={{ color: 'rgba(36,23,15,.45)' }}>
        Warming the honey…
      </p>
    </div>
  );
}
