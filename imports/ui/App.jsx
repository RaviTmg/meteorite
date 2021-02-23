import React, { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Meteor } from "meteor/meteor";
import QuestionList from "./QuestionList";
import PalindromeCalc from "./PalindromeCalc";
import RandomNum from "./RandomNum";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  console.log("App -> user", user);
  const [showLogin, setShowLogin] = useState(true);
  const logout = () => Meteor.logout();
  return (
    <div className="main">
      {user ? (
        <Fragment>
          <div onClick={logout}>Hello {user.username}</div>
          <QuestionList />
        </Fragment>
      ) : showLogin ? (
        <LoginForm onReqRegister={() => setShowLogin(false)} />
      ) : (
        <RegisterForm onReqLogin={() => setShowLogin(true)} />
      )}
      <div>
        <PalindromeCalc />
        <RandomNum />
      </div>
    </div>
  );
};
