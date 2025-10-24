import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import Header from './components/Header'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App
