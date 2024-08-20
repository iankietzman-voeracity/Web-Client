import { getAuth, signOut } from "firebase/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
  
export default function Layout() {
    const { user } = useAuth();
    const navigate = useNavigate();
    console.log(useAuth());
    
    const auth = getAuth();

    function logout() {
        signOut(auth).then(() => {
            console.log('signed out');
            navigate('/login');
            
          }).catch((error) => {
            console.log('error signing out', error)
          });
    }

    return (
        <div>
            <nav>
                <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user && 
                    <>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                        <li>
                            <a onClick={logout}>Logout</a>
                        </li>
                    </>
                }
                {!user && 
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                }
                </ul>
            </nav>

            <hr />

            <Outlet />

        </div>
    )
}