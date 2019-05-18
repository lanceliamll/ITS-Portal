import { Button, TextField } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import "./Register.css";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    schoolId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
  });

  const {
    schoolId,
    firstName,
    lastName,
    email,
    password,
    password2
  } = registerData;

  const onChange = e => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      console.log(registerData);
    }
  };

  return (
    <Fragment>
      <div className="register-main">
        <div className="register-container">
          <h1>Register</h1>
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
                label="First Name"
                margin="normal"
                variant="outlined"
                name="firstName"
                value={firstName}
                onChange={e => onChange(e)}
              />
              {/* {errors.firstName && <p>{errors.firstName}</p>} */}
            </div>
            <div>
              <TextField
                label="Last Name"
                margin="normal"
                variant="outlined"
                name="lastName"
                value={lastName}
                onChange={e => onChange(e)}
              />
              {/* {errors.lastName && <p>{errors.lastName}</p>} */}
            </div>
            <div>
              <TextField
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
              {/* {errors.email && <p>{errors.email}</p>} */}
            </div>
            <div>
              <TextField
                label="Password"
                margin="normal"
                type="password"
                variant="outlined"
                name="password"
                value={password}
                onChange={e => onChange(e)}
              />
              {/* {errors.password && <p>{errors.password}</p>} */}
            </div>
            <div>
              <TextField
                label="Confirm Password"
                margin="normal"
                type="password"
                variant="outlined"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
              />
              {/* {errors.password2 && <p>{errors.password2}</p>} */}
            </div>
            <div>
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
