import { useEffect, useState } from "react";
import { connect } from "react-redux";
import types from "../redux/actions/Types";
import './Todos.css'
import ModalTodo from './ModalTodo'
import { updateAction } from "../redux/actions/Actions";

const Todos = ({ data, isLoading, isError, getData, updateTodo }) => {
    const [trigger, setTrigger] = useState(false)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [todoId, setTodoId] = useState('')
    const [todoStatus, setTodoStatus] = useState('')
    const [createdAt, setCreatedAt] = useState('')

    useEffect(() => {
        getData()
    }, [getData])

    const handleClick = e => {
        setDescription(e.target.id.split('&').slice(1, 2))
        setTitle(e.target.id.split('&').slice(0, 1))
        setTodoId(e.target.id.split('&').slice(2, 3))
        setTodoStatus(e.target.id.split('&').slice(4, 5))
        setCreatedAt(e.target.id.split('&').slice(3, 4))
        setTrigger(true)
    }

    const handleCheckBox = e => {
        const data = [{
            id: parseInt(e.target.id.split('&').slice(2, 3)),
            title: e.target.id.split('&').slice(0, 1),
            description: e.target.id.split('&').slice(1, 2),
            status: 1,
            createdAt: e.target.id.split('&').slice(3, 4),
        }]
        updateTodo(data)
        console.log(e.target.id.split('&').slice(0, 1))
    }

    const toggle = () => setTrigger(!trigger)

    return (
        <div>
            {isLoading &&
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>}
            {data && data.filter(chosen => chosen.status === 0).sort(function(a, b){return new Date (a.createdAt) - new Date (b.createdAt)}).map(todos =>
                <div className='d-flex'>
                    <input type="checkbox" className='check' id={`${todos.title}&${todos.description}&${todos.id}&${todos.createdAt}&${todos.status}`} onChange={e => handleCheckBox(e)} checked={false}/>
                    <h4 onClick={(e) => handleClick(e, 'value')} id={`${todos.title}&${todos.description}&${todos.id}&${todos.createdAt}&${todos.status}`}>{todos.title}</h4>
                </div>
            )}
            <ModalTodo
                trigger={trigger}
                title={title}
                description={description}
                toggle={toggle}
                id={todoId}
                status={todoStatus}
                createdAt={createdAt}
                removable={true} />
        </div>
    );
}

const stateProps = initialState => {
    return {
        data: initialState.data,
        isLoading: initialState.isLoading,
        isError: initialState.isError,
    }
}

const dispatchProps = dispatch => {
    return {
        getData: () => dispatch({ type: types.TODO_REQUEST }),
        updateTodo: (data) => dispatch(updateAction(data))
    }
}

export default connect(stateProps, dispatchProps)(Todos);