import { atom } from 'jotai';
import { Recipe, RecipeFilters } from '../types/recipe';

export const recipesAtom = atom<Recipe[]>([]);

export const filtersAtom = atom<RecipeFilters>({
  searchQuery: '',
  selectedTypes: [],
  selectedCategories: [],
  sortBy: 'name',
});

export const filteredRecipesAtom = atom((get) => {
  const recipes = get(recipesAtom);
  const filters = get(filtersAtom);

  let filtered = [...recipes];

  // Search filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Type filter
  if (filters.selectedTypes.length > 0) {
    filtered = filtered.filter((recipe) =>
      filters.selectedTypes.includes(recipe.type)
    );
  }

  // Category filter
  if (filters.selectedCategories.length > 0) {
    filtered = filtered.filter((recipe) =>
      recipe.familyCategories.some((cat) =>
        filters.selectedCategories.includes(cat)
      )
    );
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  return filtered;
});

export const allCategoriesAtom = atom((get) => {
  const recipes = get(recipesAtom);
  const categories = new Set<string>();
  recipes.forEach((recipe) => {
    recipe.familyCategories.forEach((cat) => categories.add(cat));
  });
  return Array.from(categories).sort();
});
