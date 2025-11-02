import { useAtom, useAtomValue } from 'jotai';
import { weeklyMealsAtom, currentSwipeIndexAtom, WeeklyMeal } from '../atoms/mealPlan';
import { recipesAtom } from '../atoms/recipes';

export function useMealPlan() {
  const [weeklyMeals, setWeeklyMeals] = useAtom(weeklyMealsAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentSwipeIndexAtom);
  const allRecipes = useAtomValue(recipesAtom);

  const addMeal = (recipeId: string) => {
    setWeeklyMeals((prev) => [...prev, { recipeId }]);
  };

  const removeMeal = (recipeId: string) => {
    setWeeklyMeals((prev) => prev.filter((meal) => meal.recipeId !== recipeId));
  };

  const nextRecipe = () => {
    setCurrentIndex((prev) => (prev + 1) % allRecipes.length);
  };

  const getCurrentRecipe = () => {
    return allRecipes[currentIndex];
  };

  const getWeeklyRecipes = () => {
    return weeklyMeals.map((meal) => 
      allRecipes.find((recipe) => recipe.id === meal.recipeId)
    ).filter(Boolean);
  };

  const clearWeek = () => {
    setWeeklyMeals([]);
    setCurrentIndex(0);
  };

  return {
    weeklyMeals,
    currentIndex,
    addMeal,
    removeMeal,
    nextRecipe,
    getCurrentRecipe,
    getWeeklyRecipes,
    clearWeek,
  };
}
