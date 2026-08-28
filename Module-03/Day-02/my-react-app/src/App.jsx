
import Menu from './Menu';

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Addis Eats Menu</h1>
      {/* Pass a category to test filtering and empty states */}
      <selectedCategory selectedCategory="Main" />
      <Menu selectedCategory="Main" />
    </div>
  );
}