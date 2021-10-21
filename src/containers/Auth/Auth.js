import React, {Component} from "react";
import classes from './Auth.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component{

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                placeholder: 'Write Email',
                errorMessage: 'Write correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                placeholder: 'Write Password',
                errorMessage: 'Write correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler(){

    }
    registerHandler(){

    }
    submitHandler = event => {
        event.preventDefault()
    }
    validateControl(value, validation){
        if (!validation){
            return 1
        }
        let isValid = true
        if (validation.required){
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email){
            isValid = validateEmail(value) && isValid
        }
        if (validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }
    onChangeHandler(event, controlName){
        console.log(`${controlName}:`, event.target.value)

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({formControls, isFormValid})
    }
    renderInputs(){
        return  Object.keys(this.state.formControls).map((controlName, index ) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    placeholder={control.placeholder}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>

                    <form onSubmit={this.submitHandler} action="" method={'POST'}>
                        { this.renderInputs() }

                        <Button type={"success"} onClick={this.loginHandler} disabled={!this.state.isFormValid}>
                            Sign In
                        </Button>
                        <Button type={"success"} onClick={this.registerHandler} disabled={!this.state.isFormValid}>
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth


/*
Мини послание для моей малышки, которую люблю больше всего на свете
Офигеть, нам уже 3 месяца, это довольно таки длинный срок, но это ничто по сравнению с временем, которую мы проведем вместе в будущем
Были моменты когда мы срывались и мы были очень близки к "концу", но мы смогли найти общий язык и постарались понять друг друга(в частности я:3)
Ты приносишь счастье в мою жизнь. Когда вижу что ты счастлива, мне так тепло на душе, поэтому я хочу быть рядом и заботиться о тебе, делая тебя счастливым
Ты самое прекрасное создание на этом свете, за которым я хочу любоваться вечно.
С любовью твой пупс
*/