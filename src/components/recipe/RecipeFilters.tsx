import { RecipeType } from '../../types/recipe';
import { useRecipes } from '../../hooks/useRecipes';

const recipeTypes: { value: RecipeType; label: string; emoji: string }[] = [
  { value: 'entree', label: 'Entrees', emoji: '🍖' },
  { value: 'side', label: 'Sides', emoji: '🥗' },
  { value: 'dessert', label: 'Desserts', emoji: '🍰' },
  { value: 'appetizer', label: 'Appetizers', emoji: '🥟' },
];

export function RecipeFilters() {
  const {
    filters,
    categories,
    updateSearchQuery,
    toggleType,
    toggleCategory,
    clearFilters,
  } = useRecipes();

  const hasActiveFilters =
    filters.searchQuery ||
    filters.selectedTypes.length > 0 ||
    filters.selectedCategories.length > 0;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search recipes..."
          value={filters.searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
          className="input w-full"
        />
      </div>

      {/* Type filters */}
      <div>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {recipeTypes.map(({ value, label, emoji }) => (
            <button
              key={value}
              onClick={() => toggleType(value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.selectedTypes.includes(value)
                  ? 'bg-accent-primary text-white'
                  : 'bg-background-secondary text-text-primary hover:bg-background-tertiary'
              }`}
            >
              <span className="mr-2">{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Family Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.selectedCategories.includes(category)
                    ? 'bg-accent-primary text-white'
                    : 'bg-background-secondary text-text-primary hover:bg-background-tertiary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-accent-primary hover:text-accent-hover font-medium"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
