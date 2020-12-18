
import React from 'react';
import {  useState } from 'react';
import {  Modal, Button,Row, Col } from 'react-bootstrap';
import axios from "axios"
import "../styling/Question.css"
import "../styling/Comment.css"


function Question({ comments, refreshComments }) {

    const [show, setShow] = useState(false);
  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteComment = (id) => {
        axios.delete('https://localhost:44348/api/comment/' + id)
        .then(function (response) {
            console.log(response)
            refreshComments()
        })
        .catch(function (error) {
          console.log(error);
        })

    }


    return (
        <>

                <Row>
                    <Col md="3">
                        <Button onClick={handleShow}>Comments</Button>
                        </Col>
                </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Comments</Modal.Title>
                </Modal.Header>
                {comments.map((comment, idx) => (
                    <Modal.Body>{comment.text}
                    <Button onClick={() => handleDeleteComment(comment.id)} className="btn btn-danger btn-sm ButtonFloat">Delete Comment</Button>
                    </Modal.Body>
                ))}
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Question
