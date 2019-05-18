import { Button, TextField } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import "./Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    schoolId: "",
    password: ""
  });

  const { schoolId, password } = loginData;

  const onChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <Fragment>
      <div className="login-main">
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <div>
              <TextField
                label="School ID"
                margin="normal"
                variant="outlined"
                name="schoolId"
                value={schoolId}
                onChange={e => onChange(e)}
              />
              {/* {errors.schoolId && <p>{errors.schoolId}</p>} */}
            </div>
            <div>
              <TextField
                type="password"
                label="Password"
                margin="normal"
                variant="outlined"
                name="password"
                value={password}
                onChange={e => onChange(e)}
              />
              {/* {errors.password && <p>{errors.password}</p>} */}
            </div>
            <div>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
