import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import UserCard from './UserCard';
import SortSelect from './SortSelect';
import './UserList.css';

const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const searchTerm = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'none';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const ITEMS_PER_PAGE = 10; 

  const sortUsers = (users) => {
    if (sortBy === 'none') return users;
    
    return [...users].sort((a, b) => {
      switch (sortBy) {
        case 'name_asc':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'name_desc':
          return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
        case 'age_asc':
          return a.age - b.age;
        case 'age_desc':
          return b.age - a.age;
        default:
          return 0;
      }
    });
  };

  const { paginatedUsers, totalPages } = useMemo(() => {
    let result = users;
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      result = users.filter(user => 
        user.firstName.toLowerCase().includes(searchTermLower) ||
        user.lastName.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower)
      );
    }
    
  result = sortUsers(result);

  const totalPages = Math.ceil(result.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedUsers = result.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { paginatedUsers, totalPages };
  }, [users, searchTerm, sortBy, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

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
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou email..."
            value={searchTerm}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);
              if (e.target.value) {
                params.set('q', e.target.value);
              } else {
                params.delete('q');
              }
              params.set('page', '1');
              setSearchParams(params);
            }}
            className="search-input"
          />
        </div>
        
        <div className="sort-controls">
          <SortSelect 
            value={sortBy}
            onChange={(value) => {
              const params = new URLSearchParams(searchParams);
              if (value !== 'none') {
                params.set('sort', value);
              } else {
                params.delete('sort');
              }
              setSearchParams(params);
            }}
          />
        </div>
      </div>

      <div className="user-list">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="no-results">Aucun utilisateur trouvé</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('page', Math.max(1, currentPage - 1).toString());
              setSearchParams(params);
            }}
            disabled={currentPage === 1}
            className="pagination-btn"
            aria-label="Page précédente"
          >
            ←
          </button>

          <div className="page-numbers">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const isCurrentPage = pageNum === currentPage;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', pageNum.toString());
                    setSearchParams(params);
                  }}
                  className={`page-number ${isCurrentPage ? 'active' : ''}`}
                  aria-label={`Page ${pageNum}`}
                  aria-current={isCurrentPage ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('page', Math.min(totalPages, currentPage + 1).toString());
              setSearchParams(params);
            }}
            disabled={currentPage === totalPages}
            className="pagination-btn"
            aria-label="Page suivante"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;