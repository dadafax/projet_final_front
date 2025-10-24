import UserList from './components/UserList'
import './components/UserList.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <header>
        <h1>Gestion des Utilisateurs</h1>
      </header>
      <main>
        <UserList />
      </main>
    </div>
  );
}

export default App
