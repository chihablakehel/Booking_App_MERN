import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. welcome to Airbnb clone");
    } catch (error) {
      alert("Registration failed! Try again later");
    }
  };
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
