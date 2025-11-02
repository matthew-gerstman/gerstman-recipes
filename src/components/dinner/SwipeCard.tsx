import { useState } from 'react';
import { Recipe } from '../../types/recipe';

interface SwipeCardProps {
  recipe: Recipe;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const typeEmojis: Record<Recipe['type'], string> = {
  entree: '🍖',
  side: '🥗',
  dessert: '🍰',
  appetizer: '🥟',
};

export function SwipeCard({ recipe, onSwipeLeft, onSwipeRight }: SwipeCardProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setSwipeDirection('left');
      setTimeout(() => {
        onSwipeLeft();
        setSwipeDirection(null);
      }, 300);
    } else if (isRightSwipe) {
      setSwipeDirection('right');
      setTimeout(() => {
        onSwipeRight();
        setSwipeDirection(null);
      }, 300);
    }
  };

  const cardClasses = [
    'card overflow-hidden max-w-md mx-auto transition-transform duration-300',
    swipeDirection === 'left' && '-translate-x-full opacity-0',
    swipeDirection === 'right' && 'translate-x-full opacity-0',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {recipe.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-text-primary">
            {recipe.name}
          </h3>
          <span className="text-3xl flex-shrink-0 ml-2">
            {typeEmojis[recipe.type]}
          </span>
        </div>

        <p className="text-text-secondary mb-4">
          {recipe.description}
        </p>

        <div className="bg-accent-primary/10 border-l-4 border-accent-primary p-3 rounded mb-4">
          <p className="text-sm text-text-secondary">
            <strong className="text-text-primary">Quick:</strong> {recipe.tldr}
          </p>
        </div>

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
          {recipe.cookTime && (
            <span className="flex items-center gap-1">
              🔥 {recipe.cookTime}
            </span>
          )}
        </div>
      </div>

      {/* Swipe instructions */}
      <div className="p-4 bg-background-secondary border-t border-border-primary">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-text-tertiary">
            <span>👈</span>
            <span>Swipe left to skip</span>
          </div>
          <div className="flex items-center gap-2 text-accent-primary font-medium">
            <span>Add to week</span>
            <span>👉</span>
          </div>
        </div>
      </div>
    </div>
  );
}
