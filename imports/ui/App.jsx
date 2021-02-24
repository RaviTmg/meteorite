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
  const cronData = useTracker(() => {
    const handler = Meteor.subscribe("crunch");

    if (!handler.ready()) {
      return null;
    }
    return "message";
    console.log(handler);
    // const tasks = TasksCollection.find(
    //   hideCompleted ? pendingOnlyFilter : userFilter,
    //   {
    //     sort: { createdAt: -1 },
    //   }
    // ).fetch();
    // const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    // return { tasks, pendingTasksCount };
  });
  // console.log(cronData);
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
