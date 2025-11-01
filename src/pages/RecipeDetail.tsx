import { useParams, Link, Navigate } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';

const typeEmojis: Record<string, string> = {
  entree: '🍖',
  side: '🥗',
  dessert: '🍰',
  appetizer: '🥟',
};

export function RecipeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { getRecipeBySlug } = useRecipes();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Recipe not found
        </h2>
        <Link to="/" className="btn-primary">
          Back to all recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center text-accent-primary hover:text-accent-hover mb-6"
      >
        ← Back to all recipes
      </Link>

      {/* Hero section with image and TLDR */}
      <div className="card overflow-hidden mb-8">
        {recipe.imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">
                {recipe.name}
              </h1>
              <p className="text-lg text-text-secondary">{recipe.description}</p>
            </div>
            <span className="text-4xl flex-shrink-0 ml-4">
              {typeEmojis[recipe.type]}
            </span>
          </div>

          {/* Tags and metadata */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="badge capitalize">{recipe.type}</span>
            {recipe.familyCategories.map((cat) => (
              <span key={cat} className="badge bg-background-tertiary text-text-secondary">
                {cat}
              </span>
            ))}
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {recipe.prepTime && (
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="text-xl">⏱️</span>
                <div>
                  <div className="text-xs uppercase tracking-wide">Prep Time</div>
                  <div className="font-medium">{recipe.prepTime}</div>
                </div>
              </div>
            )}
            {recipe.cookTime && (
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="text-xl">🔥</span>
                <div>
                  <div className="text-xs uppercase tracking-wide">Cook Time</div>
                  <div className="font-medium">{recipe.cookTime}</div>
                </div>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="text-xl">👥</span>
                <div>
                  <div className="text-xs uppercase tracking-wide">Servings</div>
                  <div className="font-medium">{recipe.servings}</div>
                </div>
              </div>
            )}
          </div>

          {/* TLDR */}
          <div className="bg-accent-primary/10 border-l-4 border-accent-primary p-4 rounded">
            <h3 className="font-semibold text-text-primary mb-2">Quick Summary</h3>
            <p className="text-text-secondary">{recipe.tldr}</p>
          </div>
        </div>
      </div>

      {/* Ingredients and Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Ingredients */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id} className="flex items-start text-text-secondary">
                  <span className="text-accent-primary mr-2">•</span>
                  <span>
                    <span className="font-medium text-text-primary">
                      {ingredient.amount} {ingredient.unit && `${ingredient.unit} `}
                    </span>
                    {ingredient.name}
                    {ingredient.notes && (
                      <span className="text-text-tertiary text-sm ml-1">
                        ({ingredient.notes})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-primary text-white flex items-center justify-center font-semibold mr-4">
                    {index + 1}
                  </span>
                  <p className="text-text-secondary pt-1">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      {recipe.commonMistakes && recipe.commonMistakes.length > 0 && (
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <span>⚠️</span>
            Common Mistakes to Avoid
          </h2>
          <ul className="space-y-3">
            {recipe.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent-primary mr-3 flex-shrink-0">✗</span>
                <p className="text-text-secondary">{mistake}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Family History */}
      {recipe.familyHistory && (
        <div className="card p-6 bg-background-secondary border-2 border-accent-primary/20">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <span>📖</span>
            Family History
          </h2>
          <p className="text-text-secondary leading-relaxed italic">
            {recipe.familyHistory}
          </p>
        </div>
      )}
    </div>
  );
}
