import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Figure } from 'react-bootstrap';
import { Link, } from "react-router-dom";

function HomeButtons({randomid}) {
    const handleChange = () => {
        randomid()
    }
    return (
        <div className="rounded container">
            <Row>
                <Col>
                    <div className="float-left">
                        <figure>
                            <Link to="/" >
                                <Figure.Image
                                    width={50}
                                    height={50}
                                    src='/images/report.png'
                                />
                            </Link>
                            <figcaption class="figure-caption text-middle">Report</figcaption>
                        </figure>
                    </div >
                </Col>
                <Col>
                    <div className="float-right">
                        <figure>
                            <Link to="/" onClick={handleChange}>
                                <Figure.Image
                                    width={50}
                                    height={50}
                                     src='/images/skip.png'
                                />
                            </Link>
                            <figcaption class="figure-caption text-middle">Skip</figcaption>
                        </figure>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
export default HomeButtons