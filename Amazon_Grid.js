import React from "react";
import classes from './Amazon_Grid.module.css';
import { Container, Row, Col } from 'react-bootstrap';


const Amazon_Grid = () => {
    return (
        <>
            <Container >
                <div className={classes.align_all}>
                    <h2 className={classes.advantages_heading}> <b>Advantages of joining Amazon Customer Support Team</b></h2>
                </div>
                <Row>
                    <Col className={classes.col_align} xs={"6"} md={"3"}>
                        <div className={classes.grid_div}>
                            <img src="/images/colImage1.png" alt="image not available" className={classes.responsive} />
                            <p className={classes.content}>One - Two month role</p>
                        </div>
                    </Col>
                    <Col className={classes.col_align} xs={"6"} md={"3"}>
                        <div className={classes.grid_div}>
                            <img src="/images/colImage2.png" alt="image not available" className={classes.responsive} />
                            <p className={classes.content}>Full Time</p>
                        </div>
                    </Col>
                    <Col className={classes.col_align} xs={"6"} md={"3"}>
                        <div className={classes.grid_div}>
                            <img src="/images/colImage3.png" alt="image not available" className={classes.responsive} />
                            <p className={classes.content}>Work from Home</p>
                        </div>
                    </Col>
                    <Col className={classes.col_align} xs={"6"} md={"3"}>
                        <div className={classes.grid_div}>
                            <img src="/images/colImage4.png" alt="image not available" className={classes.responsive} />
                            <p className={classes.content}>Competitive salary</p>
                        </div>
                    </Col>

                </Row>

                <Row>

                    <Col className={classes.col_align}>
                        <div className={classes.grid_div}>
                            <img src="/images/colImage5.png" alt="image not available" className={classes.responsive} />
                            <p className={classes.content}>Zeta meal card INR 1100/month</p>
                        </div>
                    </Col>
                    <Col className={classes.col_align}>
                        <div className={classes.grid_div}>
                            <img src="/images/colImage6.png" alt="image not available" className={classes.responsive} />
                            <p className={classes.content}>Internet allowance upto INR 1250</p>
                        </div>
                    </Col>
                    <Col className={classes.col_align}>
                        <div className={classes.grid_div}>
                            <img src="/images/colImage7.png" alt="image not available" className={classes.responsive} />
                            <p className={classes.content}>End of Contract Bonus INR 1250</p>
                        </div>
                    </Col>
                </Row>
                <div>
                    <h5 className={classes.align_all}>
                        Salary Range: INR 14000 per month to INR 18000 per month
                    </h5>
                </div>
            </Container>
        </>
    );

}

export default Amazon_Grid;