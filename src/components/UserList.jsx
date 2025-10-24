import { useState, useEffect, useMemo } from 'react';
import UserCard from './UserCard';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    const searchTermLower = searchTerm.toLowerCase();
    return users.filter(user => 
      user.firstName.toLowerCase().includes(searchTermLower) ||
      user.lastName.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower)
    );
  }, [users, searchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="user-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="no-results">Aucun utilisateur trouvé</div>
        )}
      </div>
    </div>
  );
};

export default UserList;