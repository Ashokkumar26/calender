import React, { Component } from 'react'
import {connect} from 'react-redux'
import Calender from './Calender'
import {taskAction, openAdd, openEditAction, saveTaskAction, removeTaskAction, switchToLIst} from '../redux/task/taskAction'
import {LIST, ADD, EDIT} from "../redux/task/modes"
import shortid from "shortid";
import './App.css'

const TaskList = ({tasks, edit, remove}) => 
    <table className='table'>
                    <tbody>
                        {tasks.map((task, i) => <tr className='row' key={i} onClick={() => edit(task)}>
                            <td  className='col-9'>{task.description}
                            <div>
                                <small className='text-danger'>
                                {task.date}
                                </small>
                            </div>
                            </td>
                            <td className='visibility col-3 mt-3'><button 
                            className='p-0 m-0 radius btn btn-light' onClick={e => {
                                remove(task);
                                e.stopPropagation();
                            }}>
                                <i className="material-icons m-0" style={{fontSize:"30px",color:"red"}}>delete_forever</i>
                                </button></td>
                            </tr>)}
                    </tbody>
                  </table>

const Body = ({mode: {type: mode, task}, tasks, addTask, openEdit, saveTask, removeTask, cancel}) => {
    switch(mode) {
        case LIST: return <TaskList tasks={tasks} edit={openEdit}remove={removeTask}/>
        case ADD: return <Calender onSave={task => {addTask({...task, id: shortid.generate()})}} onCancel={cancel} />
        case EDIT: return <Calender onSave={saveTask} task={task}  onCancel={cancel}/>
        default: return <h1>Undefined Mode</h1>
    }
} 

class Task extends Component {

    render() {
        console.log(this.props.tasks)
        return (
            <div className='content'>
                <div className='row border'>
                <h4 className='col-10 p-0 mt-3 pl-2'>TASKS</h4>
                <button className='col-2 btn btn-light m-0 p-0' onClick={this.props.openAdd}>
                <i class="material-icons" style={{fontSize:"48px",color:"green"}}>add</i>
                    </button>
                </div>
                <Body {...this.props}></Body>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return state
}

const mapDispatchToProps = (dispatch) => ({
        addTask: task => dispatch(taskAction(task)),
        openAdd: () => dispatch(openAdd()),
        openEdit: task => dispatch(openEditAction(task)),
        saveTask: task => dispatch(saveTaskAction(task)),
        removeTask: task => dispatch(removeTaskAction(task)),
        cancel: () => dispatch(switchToLIst())
    })


export default connect(mapStateToProps, mapDispatchToProps)(Task)
