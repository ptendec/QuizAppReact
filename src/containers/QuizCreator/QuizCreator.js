import React, {Component} from "react";
import classes from './QuizCreator.css'
import Button from "../../components/UI/Button/Button";
import {createControl} from '../../form/formFramework'
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";

function createOptionControl(number){
    return createControl({
        label: `Variant ${number}`,
        errorMessage: 'Вопрос не может быть пустым',
        id: number
    }, {required: true})
}
function createFormControls(){
    return {
        question: createControl({
            label: 'Type question',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option_1: createOptionControl(1),
        option_2: createOptionControl(2),
        option_3: createOptionControl(3),
        option_4: createOptionControl(4),
    }
}

class QuizCreator extends Component{
    state = {
        quiz: [],
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }
    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }
    changeHandler = (value, controlName) => {

    }
    renderControls(){
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}

                    />
                    { index === 0 ? <hr/> : null }
                </Auxiliary>
            )
        })
    }
    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }
    render() {
        const select = <Select
            label="Choose correct answer"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />
        return(
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Quiz create</h1>

                    <form action="" onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}

                        <br/>
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}>
                            Add question
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.createQuizHandler}>
                            Create quiz
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default QuizCreator