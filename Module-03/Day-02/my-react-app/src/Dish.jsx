import PropTypes from 'prop-types';

export default function Dish({ name, price, spicy, currency }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: {price} {currency}</p>
      {/* Guard non-booleans and render conditionally */}
      {Boolean(spicy) && <span style={{ color: 'red', fontWeight: 'bold' }}>🌶️ Spicy</span>}
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

Dish.defaultProps = {
  currency: 'ETB',
};