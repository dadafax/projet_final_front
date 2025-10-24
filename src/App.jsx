import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import './components/UserList.css'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Gestion des Utilisateurs</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
