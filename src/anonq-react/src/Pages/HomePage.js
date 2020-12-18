import React, { useState, useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Question from '../components/Question'
import HomeButtons from '../components/HomeButtons'
import QuestionService from "../Services/QuestionService"
import CommentService from "../Services/CommentService"
import Comment from "../components/Comment"
import { Row, Col } from 'react-bootstrap';
import CreateComment from "../components/CreateComment";

function HomePage(props) {
    const [enable, setEnable] = useState();
    const [fullQuestion, setFullQuestion] = useState(
        {
            question: { title: '', description: '', tag: '', commentsenabled: '' },
            poll: [{ poll: '' }]
        }
    );
    const [comments, setComments] = useState([]);

    useEffect(() => {
        handleChange()
    }, []);
    useEffect(() => {
        setID(props.match.params.id);
    }, [props.match.params.id]);

    const [id, setID] = useState(2);

    const handleChange = () => {
        QuestionService.GetRandomQuestionId().then((res) => {
            var randomnum = res.data;
            setID(randomnum)
        });
    };

    useEffect(() => {
        QuestionService.GetQuestionAndPolls(id).then((res) => {
            setFullQuestion((prevState) => ({ ...prevState, question: res.data.question }));
            setFullQuestion((prevState) => ({ ...prevState, poll: res.data.poll }));
        })
        CommentService.GetComment(id).then((res) => {
            setComments(res.data)
        })
    }, [id]);

    const GetQuestionData = () => {
        QuestionService.GetQuestionAndPolls(id).then((res) => {
            setFullQuestion((prevState) => ({ ...prevState, question: res.data.question }));
            setFullQuestion((prevState) => ({ ...prevState, poll: res.data.poll }));
        })
        CommentService.GetComment(id).then((res) => {
            setComments(res.data)
        })
    }
    useEffect(() => {
        setEnable(fullQuestion.question.commentsEnabled)
    },
        [fullQuestion.question]);

    const ShowComments = () => (   
        <div>
            <div className="FormStyling2">
            <Row className="justify-content-md-left ">
                <Col md="1">
                <b><h2>Comments</h2></b>
                </Col>
                <Col md="12">
                <hr />
                </Col>
            </Row>
            {comments.map((comments) => (
                <Comment key={comments.id} sentcomments={comments} />
            ))}
            <CreateComment sentquestionid={fullQuestion.question.id} sentgetquestions={GetQuestionData} />
            </div>
        </div>
    )


    return (
        <div className="flex rounded container">
            <div className="">
            <Question question={fullQuestion.question} polls={fullQuestion.poll} />
            </div>
            <HomeButtons randomid={handleChange} />
             { enable ? <ShowComments/> : null} 
        </div>     
    );
}
export default HomePage