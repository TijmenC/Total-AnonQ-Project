import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../styling/Comment.css'
import { Row, Col } from 'react-bootstrap';


function Comment({ sentcomments }) {
    return (
        <div className="rounded container">
            <Row className="justify-content-md-left align-items-center">
                <Col md="1">
                    <img src='/images/logo.png' alt="error" width="100" height="50" />
                </Col>
                <Col md="1">

                    <b>  <div data-testid="question-label-title">Anonymous</div></b>

                </Col>
            </Row>
            <br />
            <Row className="justify-content-md-left">
                <Col md sm="12">
                        <h6 data-testid="question-label-comment">
                            {sentcomments.text}
                        </h6>
                </Col>
            </Row>
        </div>
    )




}
export default Comment