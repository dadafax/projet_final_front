import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <Link to={`/users/${user.id}`} className="user-card-link">
      <div className="user-card">
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