import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

const Logout = () => {
  let history = useHistory();

  function handleLogOut() {
    localStorage.clear('token');
    history.push('/');
  }

  return (
    <button type="button" className = "navButton linkButton" onClick={handleLogOut}><FontAwesomeIcon icon ={faSignOutAlt} />
      LogOut
    </button>
  );
};

export default Logout;

  