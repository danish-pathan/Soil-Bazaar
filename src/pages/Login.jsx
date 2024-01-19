import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.signinUserWithEmailAndPass(email, password);
    console.log("You are logged in");
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <h1 className="mt-5 mb-5">OR</h1>
      <button onClick={firebase.signinWithGoogle} className="btn btn-danger">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
