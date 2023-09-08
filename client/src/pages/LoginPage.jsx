import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useGlobalContext();

  const login = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert("Login failed!");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="grow flex items-center justify-around">
      <div className=" mb-32">
        <h1 className=" text-4xl text-center">Login</h1>
        <form className=" max-w-lg mx-auto my-2" onSubmit={login}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
        </form>
        <div className=" text-center text-gray-600 cursor-pointer">
          Don't have an account yet?{" "}
          <Link to={"/register"} className=" underline hover:text-black">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
