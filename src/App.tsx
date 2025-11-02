import { HashRouter, Routes, Route } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { RecipeIndex } from './pages/RecipeIndex';
import { RecipeDetail } from './pages/RecipeDetail';
import { recipesAtom } from './atoms/recipes';
import { sampleRecipes } from './data/recipes';

export default function App() {
  const setRecipes = useSetAtom(recipesAtom);

  // Load recipes on mount
  useEffect(() => {
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
