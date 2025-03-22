import { Route, Routes, Navigate } from "react-router";
import './App.css'
import Home from './pages/Home';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
