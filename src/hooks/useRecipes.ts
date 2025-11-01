import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  recipesAtom,
  filteredRecipesAtom,
  filtersAtom,
  allCategoriesAtom,
} from '../atoms/recipes';
import { Recipe, RecipeFilters, RecipeType } from '../types/recipe';

export function useRecipes() {
  const [recipes, setRecipes] = useAtom(recipesAtom);
  const filteredRecipes = useAtomValue(filteredRecipesAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const categories = useAtomValue(allCategoriesAtom);

  const updateSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const toggleType = (type: RecipeType) => {
    setFilters((prev) => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(type)
        ? prev.selectedTypes.filter((t) => t !== type)
        : [...prev.selectedTypes, type],
    }));
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  const setSortBy = (sortBy: RecipeFilters['sortBy']) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      selectedTypes: [],
      selectedCategories: [],
      sortBy: 'name',
    });
  };

  const getRecipeBySlug = (slug: string): Recipe | undefined => {
    return recipes.find((recipe) => recipe.slug === slug);
  };

  return {
    recipes,
    filteredRecipes,
    filters,
    categories,
    updateSearchQuery,
    toggleType,
    toggleCategory,
    setSortBy,
    clearFilters,
    getRecipeBySlug,
    setRecipes,
  };
}
