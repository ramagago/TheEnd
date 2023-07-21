import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa la función 'signInWithEmailAndPassword' del módulo 'auth'
import { auth } from "../../../firebase"; // Asegúrate de importar el objeto 'auth' desde tu archivo 'firebase'
import { useHistory } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password) // Utiliza la función 'signInWithEmailAndPassword' pasando el objeto 'auth' como primer argumento
      .then((cred) => {
        history.push("/Admin");
      })
      .catch((error) => {
        setError(true);
      });
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
