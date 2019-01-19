import React, { Component } from 'react';
import styled from 'styled-components';
import Student from './student';

export default class App extends Component {
    state = {
        isData: false,
        nameValue: "",
        tagValue: "",
        tagged: []
    }
    componentDidMount() {
        fetch('https://www.hatchways.io/api/assessment/students')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isData: true,
                    result
                }, () => {
                    console.log(this.state.result);
                })
            })
    }

    addTagged(student) {
        if (student.tags.length > 0) {
            const tagged = [ ...this.state.tagged, student];
            this.setState({
                tagged
            })
        }
    }

    render() {
        const filterByName = this.state.result ? this.state.result.students.filter((stu, index) => (
            stu.lastName.toLowerCase().includes(this.state.nameValue) || stu.firstName.toLowerCase().includes(this.state.nameValue)
        )).map((stu, index) => (
            <Student data={stu} key={index} addTagged={this.addTagged.bind(this)}/>
        )) : "Loading"

        const filterByTag = this.state.result ? this.state.tagged.filter((stu, index) => (
            stu.tags.filter((tag, index) => (
                tag.includes(this.state.tagValue)  
            ))
        )).map((stu,index) => (
            <Student data={stu} key={index} addTagged={this.addTagged.bind(this)}/>
        )) : "Loading"

        return(
            <Container>
                <Wrapper>
                    <InputContainer>
                        <Input type="text" value={this.state.nameValue} onChange={(e) => this.setState({ nameValue: e.target.value })} placeholder="Search by name"/>
                        <Input type="text" value={this.state.tagValue} onChange={(e) => this.setState({ tagValue: e.target.value })} placeholder="Search by tags"/>
                    </InputContainer>
                    <StudentContainer>
                        { this.state.tagValue === "" ? filterByName : "" }
                        { this.state.nameValue === "" ? filterByTag : ""}
                    </StudentContainer>
                </Wrapper>>
            </Container>
        )
    }
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #efefef;
`

const Wrapper = styled.div`
    width: 700px;
    height: 500px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px gray;

`

const InputContainer = styled.div`
    /* padding: 0 1em; */
`

const StudentContainer = styled.div`
    width: 100%;
    height: 100%;
`

const Input = styled.input`
    width: 90%;
    height: 25px;
    font-size: 1.15em;
    color: darkgray;
    font-weight: lighter;
    padding: 0.5em;
    outline: none;
    border: none;
    margin: 0 2.5%;
    align-self: center;
    border-bottom: 2px solid lightgray;

    &:focus {
        border-bottom: 2px solid black;
    }

    &::placeholder {
        color: lightgray;
    }
`