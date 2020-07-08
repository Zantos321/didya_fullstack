import React from "react";
import BodyTemplate from "../ui/BodyTemplate";
import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { MAX_CHAR_COUNT } from "../../utils/helpers";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
//import actions from "../../store/actions";

class EditTasks extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         task: this.props.editableTask.task.userText,
         checked: false,
      };
   }

   checkIsInvalidCharLimit() {
      if (
         this.state.task.length > MAX_CHAR_COUNT ||
         this.state.task.length === 0
      ) {
         return true;
      } else return false;
   }

   setTaskText(e) {
      this.setState({ task: e.target.value });
   }

   showDeleteButton() {
      this.setState({
         checked: !this.state.checked,
      });
   }

   deleteTask() {
      this.props.history.push("/all-tasks");
   }

   render() {
      return (
         <BodyTemplate>
            <h3 className="pl-2 mt-3 ml-2">EDIT TASK</h3>
            <div className="row mb-4 ml-3">
               <h6 className="text-muted">
                  {" "}
                  TASK SHOULD TAKE LESS THAN 15 MINUTES{" "}
               </h6>
            </div>

            {isEmpty(this.props.editableTask) === false && (
               <>
                  <div className="col">
                     <textarea
                        rows="4"
                        autoFocus={true}
                        defaultValue={this.props.editableTask.task.userText}
                        className="editTaskTextArea"
                        onChange={(e) => this.setTaskText(e)}
                     ></textarea>
                     <div className="row justify-content-between">
                        <p className="text-muted mr-1 ml-3">
                           Last Time Completed:{" "}
                           {toDisplayDate(
                              this.props.editableTask.task.lastDone,
                              " MMM. d, y"
                           )}
                        </p>

                        <p className="text-muted mr-3">
                           <span
                              className={classnames({
                                 "text-danger": this.checkIsInvalidCharLimit(),
                              })}
                           >
                              {this.state.task.length}/{MAX_CHAR_COUNT}
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="row justify-content-between mb-4">
                        <Link
                           to={this.props.editableTask.prevRoute}
                           className="btn edit-cancel col-4 ml-4"
                        >
                           CANCEL EDIT
                        </Link>
                        <Link
                           to={this.props.editableTask.prevRoute}
                           className={classnames("btn edit-save col-4 mr-4", {
                              disabled: this.checkIsInvalidCharLimit(),
                           })}
                        >
                           SAVE EDIT
                        </Link>
                     </div>
                  </div>
                  <div className="custom-control custom-checkbox">
                     <div className="row col-auto mb-4">
                        <div className="custom-control custom-checkbox ">
                           <input
                              type="checkbox"
                              className="custom-control-input delete-verify"
                              id="delete-check"
                              checked={this.state.checked}
                              onChange={() => {
                                 this.showDeleteButton();
                              }}
                           />
                           <label
                              className="custom-control-label delete-verify"
                              htmlFor="delete-check"
                           >
                              Show delete button
                           </label>
                        </div>
                     </div>
                     {this.state.checked && (
                        <Link
                           to="/all-tasks"
                           className="btn btn-large btn-danger "
                           id="card-delete"
                           onClick={() => {
                              this.deleteTask();
                           }}
                        >
                           DELETE THIS TASK
                        </Link>
                     )}
                  </div>
               </>
            )}
         </BodyTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      editableTask: state.editableTask,
   };
}

export default connect(mapStateToProps)(EditTasks);
