export function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filter by category">
      <button
        type="button"
        className={`chip ${active === "All" ? "chip-active" : ""}`}
        onClick={() => onChange("All")}
        role="tab"
        aria-selected={active === "All"}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`chip ${active === category ? "chip-active" : ""}`}
          onClick={() => onChange(category)}
          role="tab"
          aria-selected={active === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
