import React from "react";
import classnames from "classnames";
import hash from "object-hash";
import { v4 as getUuid } from "uuid";
import { EMAIL_REGEX } from "../../utils/helpers";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";

class Signup extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isDisplayInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
      };
   }

   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async setEmailState(emailInput) {
      //Email Cannot be blank
      //must have valid email regex
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

   //pulls locat part of the email and checks to see if the password is contained in the local email
   checkHasLocalPart(passwordInput, emailInput) {
      const localPart = emailInput.split("@")[0];
      if (localPart === "") return false;
      else if (localPart.length < 4) return false;
      else return passwordInput.includes(localPart);
   }

   async setPasswordState(passwordInput, emailInput) {
      // can't be blank
      // must be at least 9 charcters
      // cannot contain the local-part of the email
      // must have at least 3 unique characters

      const uniqChars = [...new Set(passwordInput)];
      if (passwordInput === "") {
         this.setState({
            passwordError: "Please create a password.",
            hasPasswordError: true,
         });
      } else if (passwordInput.length < 9) {
         this.setState({
            passwordError: "Your password must be at least 9 characters.",
            hasPasswordError: true,
         });
      } else if (this.checkHasLocalPart(passwordInput, emailInput)) {
         // return true if has local part in the password
         // set error state
         this.setState({
            passwordError:
               "For your safety, your password cannot contain your email address.",
            hasPasswordError: true,
         });
      } else if (uniqChars.length < 3) {
         this.setState({
            passwordError:
               "For your safety, your password must contain at least 3 unique characters.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndCreateUser() {
      const emailInput = document.getElementById("signup-email-input").value;
      const passwordInput = document.getElementById("signup-password-input")
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
         this.props.history.push("/add-task");
      }
   }

   render() {
      return (
         <div className=" mt-5">
            <div className="card">
               <div className="card-body">
                  <div className="landing-card">
                     <h2 className="signup-title text-bold">SIGN UP</h2>
                     <p className="card-text">
                        Sign Up with your email address and password
                     </p>
                     <div className="form-group" id="signup-form">
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
                           id="signup-email-input"
                           placeholder="EMAIL ADDRESS"
                           aria-describedby="email-help"
                        />
                        {this.state.hasEmailError && (
                           <div
                              className="alert alert-danger"
                              role="alert"
                              id="signup-email-alert"
                           >
                              {this.state.emailError}
                           </div>
                        )}
                        <input
                           type="password"
                           className={classnames({
                              "form-control": true,
                              "landing-input": true,
                              "is-invalid": this.setState.hasPasswordError,
                           })}
                           id="signup-password-input"
                           placeholder="PASSWORD"
                           aria-describedby="password-help"
                        />
                        {this.state.hasPasswordError && (
                           <div
                              className="alert alert-danger"
                              role="alert"
                              id="signup-password-alert"
                           >
                              {this.state.passwordError}
                           </div>
                        )}
                        <button
                           to="/add-task"
                           className="btn landing-submit-button btn-md mt-3"
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

export default withRouter(connect(mapStateToProps)(Signup));
