import React from 'react'
import Todos from './Todos'
import Done from './Done'
import './MainScreen.css'
import { useState } from 'react'
import ModalAdd from './ModalAdd'

function MainScreen() {
    const [tab, setTab] = useState('todos')
    const [trigger, setTrigger] = useState(false)

    const toggle = () => setTrigger(!trigger)

    return (
        <div>
            <div className="container">
                <div className="wrapper">
                    <h1 className='headline'>Your To Do List</h1>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex">
                                <h2>Todos</h2>
                                <ModalAdd
                                    trigger={trigger}
                                    toggle={toggle}
                                />
                            </div>
                            <Todos />
                        </div>
                        <div className="col">
                            <h2>Done</h2>
                            <Done />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainScreen
