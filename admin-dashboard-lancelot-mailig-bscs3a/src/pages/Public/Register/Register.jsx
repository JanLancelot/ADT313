import "./Register.css";

import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [role, setRole] = useState("user");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const contactNoRef = useRef();

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkPasswordStrength = (password) => {
    let strength = "";
    if (password.length < 6) {
      strength = "Weak";
    } else if (password.match(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/)) {
      strength = "Strong";
    } else {
      strength = "Moderate";
    }
    return strength;
  };

  const handleRegister = async () => {
    const data = {
      email,
      password,
      firstName,
      middleName,
      lastName,
      contactNo,
      role,
    };
    setStatus("loading");
    await axios({
      method: "post",
      url: "/admin/register",
      data,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((res) => {
        console.log(res);
        navigate("/");
        setStatus("idle");
      })
      .catch((e) => {
        console.log(e);
        setStatus("idle");
      });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Invalid email format");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  return (
    <div className="Register">
      <div className="main-container">
        <h3>Register</h3>
        <p>
          Please use a unique email sir. Mag eerror po siya sa console sir Lem
          pag registered na po uWu.
        </p>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-container">
            <div className="form-group">
              <label>E-mail:</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {showErrors && email === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label>Password:</label>
              <div className="password-container">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  ref={passwordRef}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={handleShowPassword}
                >
                  {isShowPassword ? "Hide" : "Show"}
                </button>
              </div>
              {showErrors && password === "" && (
                <span className="errors">This field is required</span>
              )}
              {password && (
                <span
                  className={`password-strength ${passwordStrength.toLowerCase()}`}
                >
                  {passwordStrength}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                ref={firstNameRef}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {showErrors && firstName === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label>Middle Name:</label>
              <input
                type="text"
                name="middleName"
                ref={middleNameRef}
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              {showErrors && middleName === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                ref={lastNameRef}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {showErrors && lastName === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="tel"
                name="contactNo"
                ref={contactNoRef}
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
              />
              {showErrors && contactNo === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label>Role:</label>
              <div className="role-container">
                <label>
                  <input
                    type="radio"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  User
                </label>
                <label>
                  <input
                    type="radio"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Admin
                </label>
              </div>
            </div>
            <div className="submit-container">
              <button
                type="button"
                disabled={status === "loading"}
                onClick={() => {
                  if (status === "loading") return;
                  setShowErrors(true);
                  if (
                    email &&
                    password &&
                    firstName &&
                    lastName &&
                    contactNo &&
                    !emailError
                  ) {
                    handleRegister();
                  } else {
                    if (!email) emailRef.current.focus();
                    else if (!password) passwordRef.current.focus();
                    else if (!firstName) firstNameRef.current.focus();
                    else if (!lastName) lastNameRef.current.focus();
                    else if (!contactNo) contactNoRef.current.focus();
                  }
                }}
              >
                {status === "idle" ? "Register" : "Loading"}
              </button>
            </div>
            <div className="login-container">
              <a href="/">
                <small>Already have an account? Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
