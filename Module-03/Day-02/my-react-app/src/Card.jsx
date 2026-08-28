
export default function Card({ children }) {
  return (
    <div className="card" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' }}>
      {children}
    </div>
  );
}