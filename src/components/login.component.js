import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../services/UserPool";
import { useHistory } from "react-router-dom";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const onSubmit = event => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    user.authenticateUser(authDetails, {

      onSuccess: data => {
        var user = data.idToken.payload["cognito:groups"];
        console.log(data);
         if (user === "Contracting-Officer") {

         } else if (user === "Program-Officer") {

         }
        console.log("onSuccess:", data);
      },

      onFailure: err => {
        console.error("onFailure:", err);
      },

    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
      <div className="col-md-6 card p-5 offset-3 mt-3">
          <h4 className="mb-4">Login</h4>
          <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" required value={email} onChange={event => setEmail(event.target.value)} />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" required
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
                </div>
                </div>
                <button className="btn btn-primary btn-primary" type="submit">Login</button>
      </div>




      </form>
    </div>
  );
};
