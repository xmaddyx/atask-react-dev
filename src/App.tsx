import './App.css';
import IndexPage from "./pages/Index"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
