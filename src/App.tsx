import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { RecipeIndex } from './pages/RecipeIndex';
import { RecipeDetail } from './pages/RecipeDetail';
import { recipesAtom } from './atoms/recipes';
import { sampleRecipes } from './data/recipes';

function AppContent() {
  const setRecipes = useSetAtom(recipesAtom);

  useEffect(() => {
    console.log('Loading recipes:', sampleRecipes.length);
    setRecipes(sampleRecipes);
  }, [setRecipes]);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<RecipeIndex />} />
          <Route path="/recipe/:slug" element={<RecipeDetail />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default function App() {
  return (
    <Provider>
      <AppContent />
    </Provider>
  );
}
