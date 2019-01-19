import React, { Component } from 'react';
import styled from 'styled-components';

export default class Student extends Component {
    state = {
        isOpen: false,
        value: "",
        tag: [],
    }

    handleOnClick() {
        const isOpen = !this.state.isOpen;
        console.log(isOpen)
        this.setState({
            isOpen
        })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const tags = [ ...this.state.tag, this.state.value.toLowerCase()];
        const taggedStudent = this.props.data;
        taggedStudent["tags"] = tags;
        console.log(taggedStudent)
        this.setState({
            tag: tags,
            value: ""
        })
        this.props.addTagged(taggedStudent);
    }

    renderMore() {
        const { grades } = this.props.data;
        const renderTest = grades.map((grade, index) => (
            <div key={index}>{`Test ${index + 1}:`} <Score>{grade}%</Score></div>
        ))
        return(
            <InfoWrapper>
                <TestContainer>
                    {renderTest}
                </TestContainer>
                <TagContainer>
                    {this.state.tag.map((t, index) => (
                        <Tag key={index}>{t}</Tag>
                    ))}
                </TagContainer>
                <form onSubmit={this.handleOnSubmit.bind(this)}>
                    <TagInput type="text" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} placeholder="Add a tag"/>
                    {/* <input type="submit"/> */}
                </form>
            </InfoWrapper>
        )
    }

    render() {
        const  { pic, firstName, lastName, email, company, skill, grades } = this.props.data;
        return(
            <Container>
                <ImgContainer>
                    <Img src={pic} />
                </ImgContainer>
                <InfoContainer>
                    <Name><b>{`${firstName} ${lastName}`}</b></Name>
                    <More onClick={this.handleOnClick.bind(this)}>{this.state.isOpen ? "-" : "+"}</More>
                    <Info>Email: {email}</Info>
                    <Info>Company: {company}</Info>
                    <Info>Skill: {skill}</Info>
                    <Info>Average: {this.getAverage()}%</Info>
                    {this.state.isOpen ? this.renderMore() : ""}
                </InfoContainer>
            </Container>
        )
    }

    getAverage() {
        const { grades } = this.props.data
        var sum = 0;
        for (var i = 0; i < grades.length; i++) {
            sum += parseInt(grades[i]);
        }
        return sum/grades.length;
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid lightgray;
    margin: 1em;
    padding-bottom: 1em;
    overflow-x: hidden;
    position: relative;
`

const ImgContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
    border: 1px solid lightgray;
    border-radius: 50%;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2em;
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const More = styled.button`
    font-size: 3em;
    position: absolute;
    right: 25px;
    border: none;
    top: -15px;
    outline: none;
    cursor: pointer;
    color: lightgray;
`

const TestContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
`

const TagContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`

const Tag = styled.div`
    background: lightgray;
    color: gray;
    padding: 4px 8px;
    border-radius: 4px;
    margin: 2px;
`

const TagInput = styled.input`
    border: none;
    border-bottom: 1px solid lightgray;
    height: 1em;
    outline: none;
    font-size: 1.25em;
    font-weight: 300;
    margin-top 1em;

    &:focus {
        border-bottom: 1px solid darkgray; 
    }
`

const Name = styled.div`
    font-size: 1.5em;
    margin-bottom: 1em;
`

const Info = styled.div`
    margin: 1px;
`
const Score = styled.span`
    padding-left: 1em;
`