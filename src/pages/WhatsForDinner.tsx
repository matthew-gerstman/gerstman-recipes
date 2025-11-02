import { useMealPlan } from '../hooks/useMealPlan';
import { SwipeCard } from '../components/dinner/SwipeCard';
import { SwipeButtons } from '../components/dinner/SwipeButtons';
import { Link } from 'react-router-dom';

export function WhatsForDinner() {
  const { getCurrentRecipe, addMeal, nextRecipe, getWeeklyRecipes, removeMeal, clearWeek } = useMealPlan();
  
  const currentRecipe = getCurrentRecipe();
  const weeklyRecipes = getWeeklyRecipes();

  const handleSkip = () => {
    nextRecipe();
  };

  const handleAdd = () => {
    if (currentRecipe) {
      addMeal(currentRecipe.id);
      nextRecipe();
    }
  };

  if (!currentRecipe) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-text-secondary mb-4">
          No more recipes to browse!
        </p>
        <Link to="/" className="btn-primary">
          Back to all recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          What's for Dinner?
        </h1>
        <p className="text-text-secondary">
          Swipe right to add to your week, left to skip
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Swipe card area */}
        <div className="lg:col-span-2">
          <SwipeCard
            recipe={currentRecipe}
            onSwipeLeft={handleSkip}
            onSwipeRight={handleAdd}
          />
          
          {/* Desktop buttons */}
          <div className="hidden md:block">
            <SwipeButtons onSkip={handleSkip} onAdd={handleAdd} />
          </div>
        </div>

        {/* Weekly meal list */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                This Week's Meals
              </h3>
              {weeklyRecipes.length > 0 && (
                <button
                  onClick={clearWeek}
                  className="text-sm text-text-tertiary hover:text-accent-primary"
                >
                  Clear all
                </button>
              )}
            </div>

            {weeklyRecipes.length === 0 ? (
              <p className="text-text-tertiary text-sm text-center py-8">
                No meals added yet. Start swiping!
              </p>
            ) : (
              <ul className="space-y-3">
                {weeklyRecipes.map((recipe) => recipe && (
                  <li
                    key={recipe.id}
                    className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-text-primary text-sm">
                        {recipe.name}
                      </p>
                      <p className="text-xs text-text-tertiary capitalize">
                        {recipe.type}
                      </p>
                    </div>
                    <button
                      onClick={() => removeMeal(recipe.id)}
                      className="text-text-tertiary hover:text-accent-primary ml-2"
                      aria-label="Remove from week"
                    >
                      ✗
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {weeklyRecipes.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border-primary">
                <p className="text-sm text-text-secondary mb-2">
                  <strong>{weeklyRecipes.length}</strong> {weeklyRecipes.length === 1 ? 'meal' : 'meals'} planned
                </p>
                <Link
                  to="/"
                  className="btn-primary w-full text-center block"
                >
                  View All Recipes
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
