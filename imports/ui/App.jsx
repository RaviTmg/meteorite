import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Meteor } from "meteor/meteor";
import QuestionList from "./QuestionList";
import PalindromeCalc from "./PalindromeCalc";
import RandomNum from "./RandomNum";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [showLogin, setShowLogin] = useState(true);
  const logout = () => Meteor.logout();
  return (
    <div className="main">
      <div className="reddit-row">
        {user ? (
          <>
            <header className="user-header">
              <span>Hello {user.username}</span>
              <button onClick={logout}>log out</button>
            </header>
            <QuestionList />
          </>
        ) : showLogin ? (
          <LoginForm onReqRegister={() => setShowLogin(false)} />
        ) : (
          <RegisterForm onReqLogin={() => setShowLogin(true)} />
        )}
      </div>
      <div className="util-row">
        <PalindromeCalc />
        <RandomNum />
      </div>
    </div>
  );
};
