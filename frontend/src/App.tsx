import { Route, Routes, Navigate } from "react-router";
import './App.css'
import Home from './pages/Home';
import SetPage from './pages/set_page';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/set_page" element={<SetPage />} />
    </Routes>
  )
}

export default App
