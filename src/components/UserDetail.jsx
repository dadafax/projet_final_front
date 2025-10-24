import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserDetail.css';


const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();
      
      if (!data || !data.id) {
        throw new Error('Utilisateur non trouvé');
      }
      
      setUser(data);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return (
      <div className="user-detail">
        <button className="back-btn" onClick={() => navigate(-1)}>← Retour</button>
        <div className="loading-state">
          <div className="loader"></div>
          <p>Chargement des informations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-detail">
        <button className="back-btn" onClick={() => navigate(-1)}>← Retour</button>
        <div className="error-state">
          <h2>Oups ! Une erreur est survenue</h2>
          <p>{error}</p>
          <button onClick={fetchUser} className="retry-btn">Réessayer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>← Retour</button>
      <div className="detail-card">
        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="detail-avatar" />
        <h2>{user.firstName} {user.lastName}</h2>
        <p>
          <span className="user-info-label">Email:</span>
          {user.email}
        </p>
        <p>
          <span className="user-info-label">Téléphone:</span>
          {user.phone}
        </p>
        <p>
          <span className="user-info-label">Entreprise:</span>
          {user.company?.name}
        </p>
        <p>
          <span className="user-info-label">Adresse:</span>
          {user.address?.address}, {user.address?.city}
        </p>
        <p>
          <span className="user-info-label">Age:</span>
          {user.age}
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
