import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";

export const RegisterForm = ({ onReqLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username,
        password,
      });
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="login-form">
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

        <button type="submit">Register</button>
      </form>
      or
      <button onClick={onReqLogin}>login</button>
    </div>
  );
};
