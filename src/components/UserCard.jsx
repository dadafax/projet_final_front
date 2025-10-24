import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import './UserCard.css';

const UserCard = ({ user }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Empêcher la navigation lors du clic sur l'étoile
    toggleFavorite(user.id);
  };

  return (
    <Link to={`/users/${user.id}`} className="user-card-link">
      <div className="user-card">
        <button
          onClick={handleFavoriteClick}
          className={`favorite-button ${isFavorite(user.id) ? 'is-favorite' : ''}`}
          aria-label={isFavorite(user.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="user-avatar" />
        <div className="user-info">
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
          <p>{user.email}</p>
          <p>{user.company?.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;