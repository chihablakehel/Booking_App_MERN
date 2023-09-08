import { Link, Navigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import axios from "axios";
import { useState } from "react";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useGlobalContext();
  let { subpage } = useParams();

  if (!ready) {
    return "Loading....";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  function logout() {
    axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mx-8 max-sm:mx-2 ">
      <AccountNav />
      {subpage === "profile" && (
        <div className=" text-center mx-auto max-w-lg ">
          <p className=" mb-2">
            Logged in as {user.name} ({user.email})<br />
          </p>
          <button onClick={logout} className="primary max-w-s mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};
export default ProfilePage;
