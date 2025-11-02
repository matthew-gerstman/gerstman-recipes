import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { RecipeIndex } from './pages/RecipeIndex';
import { RecipeDetail } from './pages/RecipeDetail';
import { ErrorBoundary } from './components/ErrorBoundary';
import { recipesAtom } from './atoms/recipes';
import { sampleRecipes } from './data/recipes';

function AppContent() {
  const setRecipes = useSetAtom(recipesAtom);

  useEffect(() => {
    console.log('AppContent: Loading', sampleRecipes.length, 'recipes');
    setRecipes(sampleRecipes);
  }, [setRecipes]);

  console.log('AppContent: Rendering');

  return (
    <HashRouter>
      <Layout>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<RecipeIndex />} />
            <Route path="/recipe/:slug" element={<RecipeDetail />} />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </HashRouter>
  );
}

export default function App() {
  console.log('App: Rendering');
  
  return (
    <Provider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Provider>
  );
}
