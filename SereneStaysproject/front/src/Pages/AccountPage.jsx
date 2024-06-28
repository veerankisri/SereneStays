import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();

    // Set default subpage if it's undefined
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        try {
            await axios.post('/logout');
            setUser(null); // Clear user context
            setRedirect('/'); // Redirect to homepage
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle logout failure (e.g., show error message)
        }
    }

    // Redirect to login if user is not authenticated
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />;
    }

    // Function to dynamically generate classes based on subpage
 
    // Render component
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
          <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}

