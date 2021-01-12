/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import editIcon from '../img/edit.svg'
import { updateAction, deleteAction } from '../redux/actions/Actions';
import types from '../redux/actions/Types';
import './ModalTodo.css'
import { connect } from 'react-redux'

const ModalExample = ({ trigger, toggle, description, title, id, updateTodo, dataSet, status, createdAt, removable, deleteTodo }) => {
    const [editHeader, setEditHeader] = useState(false)
    const [titleChange, setTitleChange] = useState(title)
    const [descChange, setDescChange] = useState(description)
    let todoId = id
    let todoStatus = status
    let todoCreatedAt = createdAt

    const data = [{
        id: parseInt(todoId[0]),
        title: titleChange,
        description: descChange === '' ? description[0] : descChange,
        status: parseInt(todoStatus[0]),
        createdAt: todoCreatedAt,
    }]

    const handleSave = () => {
        updateTodo(data)
        toggle()
    }

    const handleDelete = () => {
        deleteTodo(data)
        toggle()
    }

    return (
        <div>
            <Modal isOpen={trigger} toggle={toggle} className='modal-todo'>
                <ModalHeader toggle={toggle}>
                    <div className="modal-title">
                        <input defaultValue={title} className='form-control' onChange = {e => setTitleChange(e.target.value)}/>
                        {/* <img src={editIcon} alt="edit" className='edit-title' onClick={() => setEditHeader(true)}/> */}
                    </div>
                </ModalHeader>
                <ModalBody className='modal-description'>
                    <p>Description: </p>
                    <input defaultValue={description} className='form-control' onChange={e => setDescChange(e.target.value)}/> <br/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>Save</Button>{' '}
                    {removable ? <Button color="danger" onClick={handleDelete}>Delete</Button> : ''}
                </ModalFooter>
            </Modal>
        </div>
    );
}

const stateProps = (initialState) => {
    return {
        dataSet: initialState.data
    }
}

const dispatchProps = (dispatch) => {
    return {
        updateTodo: (data) => dispatch(updateAction(data)),
        deleteTodo: (data) => dispatch(deleteAction(data)),
    }
}

export default connect (stateProps, dispatchProps) (ModalExample);