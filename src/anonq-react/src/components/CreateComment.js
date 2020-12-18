import React, {useState, useEffect} from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../styling/Comment.css'
import { Row, Col, Form, Button } from 'react-bootstrap';
import QuestionService from "../Services/CommentService"


function CreateComment({sentquestionid, sentgetquestions}) {
    const [comment, setComment] = useState(
        {
            Text: '',
            questionid: ''
        }
    );

    useEffect(() => {
        setComment({ Text: '', questionid: sentquestionid })
    }, [sentquestionid])

    const handleChange = (event) => {
        setComment({ ...comment, [event.target.name]: event.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await QuestionService.PostComment(comment).then((res) => {
            console.log(res);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
        sentgetquestions(sentquestionid)
    };
    return (
        <div className="rounded container">
            <Form onSubmit={handleSubmit}>
            <Row className="justify-content-md-left">
                    <Col md="12">
                        <Form.Group className="textarea" controlId="validationCustom01">
                            <Form.Label><h4>Enter Answer</h4></Form.Label>
                            <Form.Control required as="textarea" rows="2" placeholder="Enter Answer" name="Text" value={comment.Text} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid" >Please insert an answer</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md sm="1">
                        <div className="float-md-right"> <Button type="submit" variant="light">Leave Comment</Button></div>
                    </Col>
                </Row>
                </Form>
        </div>
    )




}
export default CreateComment