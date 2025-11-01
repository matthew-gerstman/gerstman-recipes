export type RecipeType = 'entree' | 'side' | 'dessert' | 'appetizer';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit?: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  name: string;
  slug: string;
  type: RecipeType;
  familyCategories: string[];
  description: string;
  tldr: string;
  imageUrl?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  ingredients: Ingredient[];
  instructions: string[];
  commonMistakes?: string[];
  familyHistory?: string;
  tags: string[];
}

export interface RecipeFilters {
  searchQuery: string;
  selectedTypes: RecipeType[];
  selectedCategories: string[];
  sortBy: 'name' | 'type' | 'recent';
}
