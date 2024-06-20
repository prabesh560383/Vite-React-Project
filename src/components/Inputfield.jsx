import React from "react";

export default function Inputfield(props){
    return(
        <>
        <input 
        type="text" 
        placeholder="Please type in your todo task"
        value = {props.value}
        onChange={props.change}

        />
        </>
    )
}