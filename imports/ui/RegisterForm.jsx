import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";

export const RegisterForm = ({ onReqLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.call("finduserbyusername", username, (error, exists) => {
      if (error) {
        alert("Could not create the user");
        return;
      }
      if (!exists)
        Accounts.createUser({
          username,
          password,
        });
      else {
        alert("an account with that username already exists");
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

        <button type="submit">Register</button>
      </form>
      <span>or</span>
      <button onClick={onReqLogin}>login</button>
    </div>
  );
};
