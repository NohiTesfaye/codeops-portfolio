import  { useState, useEffect, useRef } from 'react';

// Simulated API endpoint or imported JSON file
const API_URL = '/dishes.json'; 

export default function AddisEatsMenu() {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref to auto-focus the search input on mount
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Focus search input on initial load
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Create an AbortController instance for cleanup
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchDishes() {
      setLoading(true);
      setError(null);

      try {
        // Append category as a query parameter if applicable
        const url = category === 'All' ? API_URL : `${API_URL}?category=${encodeURIComponent(category)}`;
        
        const response = await fetch(url, { signal });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to fetch menu items (Status: ${response.status})`);
        }

        const data = await response.json();
        setDishes(data);
      } catch (err) {
        // Ignore abort errors caused by cleanup
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();

    // Cleanup function to cancel the previous request if category changes
    return () => {
      controller.abort();
    };
  }, [category]); // Refetches whenever the category changes

  // Filter dishes locally based on the search input
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Early return for loading state
  if (loading && dishes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-600 animate-pulse">Loading Addis Eats menu...</p>
      </div>
    );
  }

  // Early return for error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
        <p className="text-lg font-semibold text-red-600 mb-2">Oops! Something went wrong.</p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Addis Eats Menu</h1>
        <p className="text-gray-500">Authentic flavors delivered to your doorstep.</p>
      </header>

      {/* Controls: Search & Categories */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 flex-1"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="All">All Categories</option>
          <option value="Traditional">Traditional</option>
          <option value="Fasting">Fasting</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>

      {/* Dish Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <div key={dish.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
                <span className="text-orange-600 font-bold">{dish.price} ETB</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                {dish.category}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-2 text-center py-8">No dishes found matching your search.</p>
        )}
      </div>
    </div>
  );
}