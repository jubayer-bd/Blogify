export default function CategoryCloud() {
  const categories = ["Design", "Development", "SaaS", "Productivity", "Tutorials", "Life"];

  return (
    <div className="flex flex-wrap gap-3 justify-center py-8">
      {categories.map((cat, i) => (
        <button
          key={cat}
          className={`
            px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${i % 2 === 0
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20 ring-2 ring-orange-600 ring-offset-2' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-600 hover:text-orange-600'
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}