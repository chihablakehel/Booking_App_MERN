import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useGlobalContext();

  const register = async (ev) => {
    ev.preventDefault();
    try {
      if (!name || !email || !password) {
        return alert("Please, Fill all fields");
      }
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      setUser(data);
      alert("Registration successful. welcome to Airbnb clone");
      setRedirect(true);
    } catch (error) {
      alert("Registration failed! Try again later");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }


  return (
    <div className="grow flex items-center justify-around">
      <div className=" mb-32">
        <h1 className=" text-4xl text-center">Register</h1>
        <form className=" max-w-lg mx-auto my-2" onSubmit={register}>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <button className="primary">Register</button>
        </form>
        <div className=" text-center text-gray-600 cursor-pointer">
          Already a member!{" "}
          <Link to={"/login"} className=" underline hover:text-black">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
