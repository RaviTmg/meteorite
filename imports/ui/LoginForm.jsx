import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const LoginForm = ({ onReqRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (err) => {
      console.log("err", err.message);
      if (err) {
        alert(err.reason);
      }
    });
  };

  return (
    <div className="login-area">
      <form onSubmit={submit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      or
      <button onClick={onReqRegister}>sign up</button>
    </div>
  );
};
