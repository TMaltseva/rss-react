import { Routes, Route, Navigate } from 'react-router-dom';
import MainContent from './MainContent';
import NotFound from './components/NotFound';
import CharacterDetails from './components/CharacterDetails';

import './styles/index.css';

const App = () => (
  <Routes>
    <Route path="/" element={<MainContent />}>
      <Route index element={<CharacterDetails />} />
    </Route>
    <Route path="/404" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
);

export default App;
