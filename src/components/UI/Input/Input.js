import React from "react";
import classes from './Input.css'

const Input = props => {
    const inputType = props.type || 'text'
    const cls = [classes.Input]
    const htmlFor = `${inputType}-${Math.random()}`

    function isInvalid({valid, touched, shouldValidate}){
        return !valid && shouldValidate && touched
    }

    if (isInvalid(props)){
        cls.push(classes.invalid)
    }
    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type="text"
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />

            { isInvalid(props) ? <span>{props.errorMessage}</span> : null}
        </div>
    )
}

export default Input