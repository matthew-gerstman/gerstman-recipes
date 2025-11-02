import { atom } from 'jotai';

export interface WeeklyMeal {
  recipeId: string;
  day?: string;
}

export const weeklyMealsAtom = atom<WeeklyMeal[]>([]);

export const currentSwipeIndexAtom = atom<number>(0);
