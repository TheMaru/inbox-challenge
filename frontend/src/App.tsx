import './App.css';
import { LandingPage } from './pages/LandingPage';
import { Route, Routes } from 'react-router';
import { Pages } from './utils/pages';
import { CreateMessage } from './pages/CreateMessagePage';

function App() {
  return (
    <>
      <Routes>
        <Route path={Pages.LANDING_PAGE} element={<LandingPage />} />
        <Route path={Pages.CREATION_PAGE} element={<CreateMessage />} />
      </Routes>
    </>
  );
}

export default App;
