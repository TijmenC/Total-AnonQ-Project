import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../styling/Question.css'
import { Row, Col, Button, } from 'react-bootstrap';
import PollService from "../Services/PollService"
function Poll({ polls, percentages, toggle, index}) {

    const handleClick = (e) => {
        e.preventDefault()
        PollService.PutPollsVotes(polls.id, polls).then((res) => {
            console.log(res);
            console.log(res.data);
            percentages(polls.questionId)
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    };
    const PercentageText = () => (
       <b>%</b>
      )

    return (
        <div className="flex rounded container">
            <Row className="justify-content-md-left">
                <Col>
                    <Button disabled={toggle} variant="primary" size="lg" onClick={handleClick} data-testid={"poll-button-vote" +  index} block >
                        <div data-testid={index}>   
                        {polls.poll}  
                            <div data-testid={"poll-label-percentage" + index}>  
                        {polls.percentage}
                        { toggle ? <PercentageText />  : null }
                        </div>
                        </div>
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
export default Poll;