interface SwipeButtonsProps {
  onSkip: () => void;
  onAdd: () => void;
}

export function SwipeButtons({ onSkip, onAdd }: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-8 mt-8">
      <button
        onClick={onSkip}
        className="w-16 h-16 rounded-full bg-background-secondary border-2 border-border-primary hover:border-text-tertiary transition-colors flex items-center justify-center text-2xl"
        aria-label="Skip this recipe"
      >
        ✗
      </button>
      <button
        onClick={onAdd}
        className="w-20 h-20 rounded-full bg-accent-primary hover:bg-accent-hover transition-colors flex items-center justify-center text-3xl shadow-lg"
        aria-label="Add to week"
      >
        ✓
      </button>
    </div>
  );
}
