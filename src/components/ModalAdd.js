/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import addNew from "../img/plus.png";
import { addAction } from "../redux/actions/Actions";
import "./ModalTodo.css";
import { connect } from "react-redux";

const ModalExample = ({ trigger, toggle, dataSet, addNewTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  let date = new Date();
  let dateToday = date.getDate();
  let monthToday = date.getMonth();
  let yearToday = date.getFullYear();
  let hourToday = date.getHours();
  let minuteToday = date.getMinutes();
  console.log(dataSet);

  const data = {
    id: dataSet.length + 1,
    title,
    description,
    status: 0,
    createdAt: `${yearToday}-${monthToday}-${dateToday} ${hourToday}:${minuteToday}`,
  };

  const handleSave = () => {
    addNewTodo(data);
    toggle();
  };

  const handleCancel = () => {
    toggle();
  };

  return (
    <div>
      <img src={addNew} alt="add" className="add-new" onClick={toggle} />
      <Modal isOpen={trigger} toggle={toggle} className="modal-todo">
        <ModalHeader toggle={toggle}>
          <div className="modal-title">
            <h1>Add New Todo</h1>
          </div>
        </ModalHeader>
        <ModalBody className="modal-description">
          <label>Title: </label>
          <input
            placeholder="Enter the title of the task"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br />
          <label>Description: </label>
          <input
            placeholder="Enter the description of the task"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
          <br />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const stateProps = (initialState) => {
  return {
    dataSet: initialState.data,
  };
};

const dispatchProps = (dispatch) => {
  return {
    addNewTodo: (data) => dispatch(addAction(data)),
  };
};

export default connect(stateProps, dispatchProps)(ModalExample);
