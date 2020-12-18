import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from 'react-bootstrap';
import '../styling/QuestionForm.css';
import QuestionService from "../Services/QuestionService"
import { useHistory } from 'react-router-dom';

import Cookies from 'js-cookie'
   



function QuestionForm() {
    /* rendered */
    const [rendered, setRendered] = useState(false)
    /*Save history of Router */
    const history = useHistory()
    /* Checkbox setstate */
    const [commentEnable, setCommentEnable] = useState(false)

    useEffect(() => {
        setFullQuestion((prevState) => ({ ...prevState, question: { ...prevState.question, commentsenabled: commentEnable } }));
    }, [commentEnable]);
    /* Question setState */
    const [fullQuestion, setFullQuestion] = useState(
        {
            question: { title: '', description: '', tag: '', commentsenabled: '' },
            poll: [{ poll: '' }],
            expiretime: ''

        }
    );
    const handleChange = (event) => {
        const eventname = event.target.name
        const eventvalue = event.target.value
        setFullQuestion((prevState) => ({ ...prevState, question: { ...prevState.question, [eventname]: eventvalue } }));
    };
    const handleChangeDeletionTime = (event) => {
        const eventname = event.target.name
        const eventvalue = Number.parseInt(event.target.value, 10)
        setFullQuestion((prevState) => ({ ...prevState, [eventname]: eventvalue }));
    };

    /* Poll setstate */
    const [poll, setPoll] = useState([]);

    const addPoll = () => {
        setPoll([...poll, { poll: '' }]);
        // setFullQuestion((oldArray) => ({...oldArray, poll: [{poll:''}] }));
    };
    const handlePollChange = (e) => {
        const updatedPolls = [...poll];
        updatedPolls[e.target.dataset.idx]["poll"] = e.target.value;
        setPoll(updatedPolls);
    };


    /* Post Question + Poll */
    const handleSubmit = async (e) => {
        setRendered(true)
        setFullQuestion((prevState) => ({ ...prevState, poll: poll }));
        e.preventDefault()
    };
    useEffect(() => {
        if (rendered === true) {
                QuestionService.PostQuestion(fullQuestion).then((res) => {
                console.log(res.data)
                Cookies.set('QuestionID', res.data.id, { expires:  new Date(res.data.deletionTime) })
                let path = `/`;
                history.push(path);  
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
         //Because I use fullQuestion to set the state outside the useEffect()
            // eslint-disable-next-line 
    }, [fullQuestion.poll]);



    return (
        <div className="FormStyling">
            <div className="rounded container">
                <Form onSubmit={handleSubmit} >
                    <Row className="justify-content-md-center">
                        <Col md="8">
                            <h2>Post A Question</h2>
                            <br />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="8">
                            <Form.Group controlId="title">
                                <Form.Label><h4>Title</h4></Form.Label>
                                <Form.Control placeholder="Enter Title" name="title" value={fullQuestion.question.title} onChange={handleChange} data-testid="questionform-input-title" required />
                            </Form.Group>

                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="8">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label><h4>Description</h4></Form.Label>
                                <Form.Control required placeholder="Enter Description" name="description" value={fullQuestion.question.description} onChange={handleChange} as="textarea" rows="3" data-testid="questionform-input-description" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="8">
                            <Form.Label><h4>Tag</h4></Form.Label>
                            <Form.Control required as="select" name="tag" value={fullQuestion.question.tag} defaultValue="help" onChange={handleChange} data-testid="questionform-input-tag">
                                <option label="Select Tag" hidden ></option>
                                <option>Personal</option>
                                <option>Relationship</option>
                                <option>Abuse</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="8">
                            <br />
                            <Form.Label><h4>Deleted in</h4></Form.Label>
                            <Form.Control required as="select" name="expiretime" value={fullQuestion.expiretime} onChange={handleChangeDeletionTime} data-testid="questionform-input-deletetime">
                                <option label="Select hours" hidden ></option>
                                <option>3</option>
                                <option>6</option>
                                <option>12</option>
                                <option>24</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" key="checkbox">
                        <Col md="8">
                            <br />
                            <Form.Label><h4>Comments</h4></Form.Label>
                            <Form.Check type="checkbox" id="EnableComments">
                                <Form.Check.Input type="checkbox" value={commentEnable} onChange={() => setCommentEnable(!commentEnable)} isValid data-testid="questionform-input-comments" />
                                 Enable
                            </Form.Check>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="8">
                            <br />
                            <Button variant="primary" onClick={addPoll}>
                                Create new poll
                            </Button>
                            <br /> <br />
                            {
                                poll.map((val, idx) => {
                                    return (
                                        <Form.Group>
                                            <div key={`poll-${idx}`}>
                                                <Form.Label>{`Poll #${idx + 1}`}</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    data-idx={idx}
                                                    className="poll"
                                                    value={poll[idx].poll}
                                                    onChange={handlePollChange}
                                                    data-testid={idx}
                                                />
                                            </div>
                                        </Form.Group>
                                    );
                                })
                            }
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="8">
                            <Button variant="primary" type="submit" data-testid="questionform-input-submit">
                                Post
                     </Button>
                        </Col>
                    </Row>
                </Form >
            </div>
        </div>
    );
}
export default QuestionForm;