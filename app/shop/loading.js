export default function ShopLoading() {
  return (
    <div className="container" style={{ paddingBlock: '4rem' }}>
      <div className="skeleton" style={{ height: 44, width: 'min(420px, 70%)', marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 18, width: 'min(560px, 88%)', marginBottom: 48 }} />
      <div className="shop-grid">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton" style={{ aspectRatio: '4 / 5' }} />
            <div className="skeleton" style={{ height: 20, marginTop: 14, width: '70%' }} />
            <div className="skeleton" style={{ height: 14, marginTop: 10, width: '90%' }} />
          </div>
        ))}
      </div>
      <span className="visually-hidden" role="status">
        Loading products…
      </span>
    </div>
  );
}
