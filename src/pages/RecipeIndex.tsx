import { useRecipes } from '../hooks/useRecipes';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { RecipeFilters } from '../components/recipe/RecipeFilters';

export function RecipeIndex() {
  const { filteredRecipes, filters, setSortBy } = useRecipes();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-text-primary">All Recipes</h2>
          <p className="text-text-secondary mt-1">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-text-secondary">
            Sort by:
          </label>
          <select
            id="sort"
            value={filters.sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof filters.sortBy)}
            className="input"
          >
            <option value="name">Name</option>
            <option value="type">Type</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <aside className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Filters
            </h3>
            <RecipeFilters />
          </div>
        </aside>

        {/* Recipe grid */}
        <div className="lg:col-span-3">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-text-secondary">
                No recipes found matching your filters
              </p>
              <p className="text-text-tertiary mt-2">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
