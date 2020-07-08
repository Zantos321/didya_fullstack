import React from "react";
import classnames from "classnames";
import hash from "object-hash";
import { v4 as getUuid } from "uuid";
import { EMAIL_REGEX } from "../../utils/helpers";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";

class LogIn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         inDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async setEmailState(emailInput) {
      const lowerCasedEmailInput = emailInput.toLowerCase();
      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (EMAIL_REGEX.test(lowerCasedEmailInput) === false) {
         this.setState({
            emailError: "Not a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   async setPasswordState(passwordInput, emailInput) {
      if (passwordInput === "") {
         this.setState({
            passwordError: "Please enter your password.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndCreateUser() {
      const emailInput = document.getElementById("login-email-input").value;
      const passwordInput = document.getElementById("login-password-input")
         .value;
      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         const user = {
            id: getUuid(),
            email: emailInput,
            password: hash(passwordInput),
            createdAt: Date.now(),
         };
         console.log("User object for POST", user);
         axios
            .get(
               "https://raw.githubusercontent.com/Zantos321/didya/master/src/mock-data/user.json"
            )
            .then((res) => {
               // handle success
               const currentUser = res.data;
               console.log(currentUser);
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: res.data,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
         this.props.history.push("/home");
      }
   }

   render() {
      return (
         <div className="mt-5">
            <div className="card">
               <div className="card-body">
                  <div className="landing-card">
                     <h2 className="login-title text-bold pl-2">LOGIN</h2>

                     <div className="form-group" id="login-form">
                        <label className="input-text sr-only" htmlFor="email">
                           Email Address
                        </label>
                        <input
                           type="email"
                           className={classnames({
                              "form-control": true,
                              "landing-input": true,
                              "mb-3": true,
                              "is-invalid": this.state.hasEmailError,
                           })}
                           id="login-email-input"
                           placeholder="EMAIL ADDRESS"
                           aria-describedby="email-help"
                        />
                        {this.state.hasEmailError && (
                           <div
                              className="alert alert-danger"
                              role="alert"
                              id="login-email-alert"
                           >
                              {this.state.emailError}
                           </div>
                        )}

                        <div className="form-group" id="login-form">
                           <label
                              className="input-text sr-only"
                              htmlFor="password"
                           >
                              Password
                           </label>
                           <input
                              type="password"
                              className={classnames({
                                 "form-control": true,
                                 "landing-input": true,
                                 "is-invalid": this.setState.hasPasswordError,
                              })}
                              id="login-password-input"
                              placeholder="PASSWORD"
                              aria-describedby="password-help"
                           />
                           {this.state.hasPasswordError && (
                              <div
                                 className="alert alert-danger"
                                 role="alert"
                                 id="login-password-alert"
                              >
                                 {this.state.passwordError}
                              </div>
                           )}
                        </div>
                        <button
                           to="/home"
                           className="btn landing-submit-button btn-md mt-1"
                           onClick={() => {
                              this.validateAndCreateUser();
                           }}
                        >
                           SUBMIT
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(LogIn));
