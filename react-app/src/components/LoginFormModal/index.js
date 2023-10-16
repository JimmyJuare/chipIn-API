import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };
  const demoUser = async() => {
    const email = 'demo@aa.io'
    const  password = 'password'
        const demoData = await dispatch(login(email, password)
      );

      closeModal()

  };

  return (
    <div className="login-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="inner-form">
          
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="error">{error}</li>
          ))}
        </ul>
        <label>
          Email
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label>
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="modal-button">Log In</button>
        <button type="button" onClick={demoUser} className="modal-button">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
