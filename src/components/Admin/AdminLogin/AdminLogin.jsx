import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa la función 'signInWithEmailAndPassword' del módulo 'auth'
import { auth } from "../../../firebase"; // Asegúrate de importar el objeto 'auth' desde tu archivo 'firebase'
import { useHistory } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password) // Utiliza la función 'signInWithEmailAndPassword' pasando el objeto 'auth' como primer argumento
      .then((cred) => {
        console.log(cred.user);
        history.push("/AdminLogin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <div>
          <label className="login-label" htmlFor="username">
            Username:
          </label>
          <input
            className="login-input"
            type="email"
            // id="username"
            name="username"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="login-label" htmlFor="pass">
            Password (8 characters minimum):
          </label>
          <input
            className="login-input"
            type="password"
            // id="pass"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default AdminLogin;
