import { useState, useEffect } from 'react'
import Inputfield from './components/Inputfield'
import Button from './components/Button'
import TaskList from './components/TaskList'
import { nanoid } from 'nanoid';
import './App.css'

export default function App (){

  const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('localTaskList')))
  const [userInput, setUserInput] = useState('')
 
  
  

  function onChange(e){
    setUserInput(e.target.value)
  }

  function enableEdit(e){
    let parent = e.target.parentElement;
    let activeId = parent.parentElement.id;
    setTaskList(prev => {
      return (prev.map(
        el => {return(activeId === el.id ? {...el, isSelected: !el.isSelected} : el)
          
        }
      ))
    })
    
  }

  function addTask(){
    let task = userInput;
    if (userInput){
    setTaskList(prev => [{
      id:nanoid(),
       taskName: task,
        isChecked: false,
        isSelected: false

        },...prev])
        
    setUserInput('')
  }
  else (alert('Input cannot be empty'))
}
  function checkBox(id){
    
    setTaskList(prev => {
      return (prev.map(
        el => {return(id === el.id ? {...el, isChecked: !el.isChecked} : el)
          
        }
      ))
    })

  }
  function changeUserInput(e){
    let text = e.target.value;
    let id = e.target.parentElement.parentElement.parentElement.id;
    setTaskList(prev => {
      return (prev.map(
        el => {return(id === el.id ? {...el, taskName: text} : el)
          
        }
      ))
    })


  }

  function save(id){
    setTaskList(prev => {
      return (prev.map(
        el => {return(id === el.id ? {...el, isSelected: !el.isSelected} : el)
          
        }
      ))
    })
   
    
    
  }

  function deleteItem(id){
    setTaskList(prev=>{return(
      prev.filter(el => el.id !== id)
    )})
  }


 
  useEffect(()=>{localStorage.setItem('localTaskList', JSON.stringify(taskList))}, [taskList])
  
  let taskListContainer = taskList.map(el=>{
    return(
      <TaskList 
        task = {el.taskName}
        key = {el.id}
        uniqueID = {el.id}
        isChecked = {el.isChecked}
        changeCheckBox = {()=>{checkBox(el.id)}}
        editMode = {el.isSelected}
        doubleClickHandler = {enableEdit}
        saveFunction = {()=>save(el.id)}
        deleteFunction = {()=>deleteItem(el.id)}
        changeHandler = {changeUserInput}
        
        />
    )
  })


  return(
  <>
    <div className='top'>
    <Inputfield value ={userInput} change = {onChange} />
    <Button value = 'Add' clickHandler = {addTask}/>
    </div>
    {taskListContainer}
    </>
  )
}