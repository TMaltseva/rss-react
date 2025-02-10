import { Routes, Route, Navigate } from 'react-router-dom';
import MainContent from './MainContent';
import NotFound from './components/NotFound';
import CharacterDetails from './components/CharacterDetails';

import './styles/index.css';

const basePath = process.env.NODE_ENV === 'production' ? '/rss-react/' : '';

const App = () => (
  <Routes>
    <Route path={`${basePath}/`} element={<MainContent />}>
      <Route index element={<CharacterDetails />} />
    </Route>
    <Route path={`${basePath}/404`} element={<NotFound />} />
    <Route path="*" element={<Navigate to={`${basePath}/404`} replace />} />
  </Routes>
);

export default App;
