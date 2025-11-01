import { Link } from 'react-router-dom';
import { Recipe } from '../../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

const typeEmojis: Record<Recipe['type'], string> = {
  entree: '🍖',
  side: '🥗',
  dessert: '🍰',
  appetizer: '🥟',
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${recipe.slug}`} className="block">
      <article className="card p-0 overflow-hidden group">
        {recipe.imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
              {recipe.name}
            </h3>
            <span className="text-2xl flex-shrink-0 ml-2">
              {typeEmojis[recipe.type]}
            </span>
          </div>

          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge capitalize">{recipe.type}</span>
            {recipe.familyCategories.slice(0, 2).map((cat) => (
              <span key={cat} className="badge bg-background-tertiary text-text-secondary">
                {cat}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-text-tertiary">
            {recipe.prepTime && (
              <span className="flex items-center gap-1">
                ⏱️ {recipe.prepTime}
              </span>
            )}
            {recipe.servings && (
              <span className="flex items-center gap-1">
                👥 {recipe.servings}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
