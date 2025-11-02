import { useRecipes } from '../hooks/useRecipes';
import { RecipeCard } from '../components/recipe/RecipeCard';

export function RecipeIndex() {
  const { filteredRecipes } = useRecipes();

  console.log('RecipeIndex: rendering with', filteredRecipes.length, 'recipes');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-text-primary">All Recipes</h2>
        <p className="text-text-secondary mt-1">
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16 col-span-full">
            <p className="text-xl text-text-secondary">
              No recipes loaded yet
            </p>
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
}
