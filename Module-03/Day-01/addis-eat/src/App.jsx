import Header from './Header';
import Dish from './Dish';

const dishes = [
  { id: 1, name: 'Doro Wat', price: '450 ETB' },
  { id: 2, name: 'Kitfo', price: '500 ETB' },
  { id: 3, name: 'Shiro Special', price: '250 ETB' },
  { id: 4, name: 'Beyaynetu', price: '300 ETB' },
];

export default function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', padding: '2rem' }}>
      <Header />
      <main>
        <h2>Menu</h2>
        {dishes.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}