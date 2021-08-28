import React, { useState, useContext } from 'react'
import classes from './AmazonAbout.module.css';
import { Container } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import { useHistory } from 'react-router-dom'
import AuthModals from '../../components/auth/AuthModals';
import { UserContext } from '../../context/UserContext';
const AmazonAbout = () => {
    const history = useHistory();
    const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
    const [modalVisiblity, setModalVisiblity] = useState(false);
    const [isFreeLancer, setIsFreeLancer] = useState(false);

    return (
        <React.Fragment>
            <div className={classes.relative + " d-none d-md-block"}>
                <img src="/images/AmazonAbout.png" className={classes.responsive} alt="image not available" />
                <div className={classes.absolute}>
                    <h3 className={classes.image_heading}>About Amazon Customer Service Team</h3>
                    <p>
                        Amazon's Customer Service team operates in over
                        140 locations around the world, delivering award-winning customer support in 18 languages. This includes Amazon's rapidly growing Virtual Customer Service team where employees work from home, providing flexibility and the freedom to work from a location that suits them.
                    </p>
                </div>
            </div>
            <Container className="d-md-none">
                <div className={classes.about_padding}>
                    <img src="/images/AmazonAbout.png" className={classes.responsive} alt="image not available" />

                    <Container className={classes.background_color}>
                        <div>
                            <p className={classes.img_heading}>About Amazon Customer Service Team</p>
                            <p className={classes.img_para}>
                                Amazon's Customer Service team operates in over
                                140 locations around the world, delivering award-winning customer support in 18 languages. This includes Amazon's rapidly growing Virtual Customer Service team where employees work from home, providing flexibility and the freedom to work from a location that suits them.
                            </p>
                        </div>
                    </Container>
                </div>
            </Container>
            <Container>
                <div className={classes.main}>
                    <ul className={classes.heading_bold}>
                        <h4 className={classes.text_align}>
                            To start your career as an associate in the
                            Amazon Customer Service team, you need to meet
                            the below requirements:
                        </h4>
                    </ul>
                    <ul className={classes.list_bullet}>
                        <li><h4 className={classes.text_align1}>Minimum education qualifications is 10+2 Pass</h4></li>
                        <li><h4 className={classes.text_align1}>Excellent English communication skills( written and verbal )</h4></li>
                        <li><h4 className={classes.text_align1}>Flexible with Day shifts and rotational week offs</h4></li>
                        <li><h4 className={classes.text_align1}>Minimum 10Mbps wired internet connection at home</h4></li>
                        <li><h4 className={classes.text_align1}>Active individual bank account, PAN card and E-Aadhaar card</h4></li>
                        <li><h4 className={classes.text_align1}>Flexible to support multiple skill sets (Voice &amp; Non-voice)</h4></li>
                    </ul>
                </div>
                <div className={classes.Get_hired}>
                    <h1 className={classes.Get_hired_h1}> Get hired now
                        {
                            userLoggedIn === true ?
                                <button type="button" className={classes.button_style} onClick={() => { history.push("/RegistrationForm") }}>Apply</button>
                                :
                                <>
                                    <button type="button" className={classes.button_style} onClick={() => { setModalVisiblity(true); setIsFreeLancer(false); }}>Apply</button>
                                </>
                        }
                    </h1>
                </div>
            </Container>

            <AuthModals setShow={setModalVisiblity} show={modalVisiblity} setUserLoggedIn={setUserLoggedIn} isFreeLancer={isFreeLancer} goToPage={"/RegistrationForm"} action={"hero"} />

        </React.Fragment>
    )
}

export default AmazonAbout;