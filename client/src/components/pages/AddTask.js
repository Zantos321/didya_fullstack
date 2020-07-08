import React from "react";
import BodyTemplate from "../ui/BodyTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { MAX_CHAR_COUNT } from "../../utils/helpers";

export default class AddTask extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         task: "",
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

   render() {
      return (
         <BodyTemplate>
            <h3 className="pl-2 mt-3 ml-2">ADD TASK</h3>
            <div className="row mb-4 ml-3">
               <h6 className="text-muted">
                  {" "}
                  TASK SHOULD TAKE LESS THAN 15 MINUTES{" "}
               </h6>
            </div>
            <div className="col">
               <textarea
                  rows="4"
                  autoFocus={true}
                  defaultValue=""
                  className="editTaskTextArea"
                  onChange={(e) => this.setTaskText(e)}
               ></textarea>
            </div>
            <div className="row float-right">
               <p className="text-muted mr-5">
                  <span
                     className={classnames({
                        "text-danger": this.checkIsInvalidCharLimit(),
                     })}
                  >
                     {this.state.task.length}/{MAX_CHAR_COUNT}
                  </span>
               </p>
            </div>
            <div className="clearfix"></div>
            <div className="col">
               <div className="row justify-content-between mb-4">
                  <Link to="/all-tasks" className="btn edit-cancel col-4 ml-4">
                     CANCEL
                  </Link>

                  <Link
                     to="/all-tasks"
                     className={classnames("btn edit-save col-4 mr-4", {
                        disabled: this.checkIsInvalidCharLimit(),
                     })}
                  >
                     SAVE
                  </Link>
               </div>
            </div>
         </BodyTemplate>
      );
   }
}
