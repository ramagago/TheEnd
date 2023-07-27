import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    document.body.style.zoom = "1";
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/admin");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <div className="input-login-container">
          <label className="login-label" htmlFor="username">
            Username:
          </label>
          <input
            className="login-input"
            type="email"
            name="username"
            onChange={(e) => setEmail(e.target.value)}
            required
            inputMode="text"
          />
        </div>

        <div className="input-login-container">
          <label className="login-label" htmlFor="pass">
            Password:
          </label>
          <input
            className="login-input"
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="login-error-message">
            Invalid username or password.
          </div>
        )}
        <input className="btn-login" type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default AdminLogin;
