import React from "react";
import { useState } from "react";
import Button from "./Button";



export default function TaskList(props){
    let customStyle = props.isChecked ? {textDecoration: 'line-through'} :{}

    let saveTask = props.saveFunction;
    let deleteTask = props.deleteFunction;

    
    return (
        <>
        <div className="tasklist-container" id = {props.uniqueID}>
        <input
             type="checkbox"
             checked = {props.isChecked}
             onChange = {props.changeCheckBox} />
        <div className="test">    
        <div  onDoubleClick = {props.doubleClickHandler}style={customStyle}>{props.editMode ? <input 
        type="text"
        value={props.task}
        onChange = {props.changeHandler}
        /> : props.task}</div>


        {props.editMode && <Button value='Save' clickHandler = {saveTask} />}
        {props.editMode && <Button value='Delete' clickHandler = {deleteTask} />}

        
        </div> 
        
        </div>
        </>
    )
}