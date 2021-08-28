import React, { useState, useContext } from 'react'
import classes from './MainBanner.module.css';
import RegistrationForm from './RegistrationForm';
import { useHistory } from 'react-router-dom'
import AuthModals from '../../components/auth/AuthModals';
import { UserContext } from '../../context/UserContext';
const MainBanner = () => {
    const history = useHistory();
    const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
    const [modalVisiblity, setModalVisiblity] = useState(false);
    const [isFreeLancer, setIsFreeLancer] = useState(false);
    return (
        <>
            <div className={classes.relative}>
                <img src="/images/amazon.png" className={classes.responsive} alt="image not showing" />
                <div className={classes.absolute}>
                    <h3 className={classes.heading1}>Amazon is hiring Customer Service Associate for Short term assignment roles ranging from 1 month to 2 months </h3>
                    {
                        userLoggedIn === true ?
                            <button type="button" onClick={() => { history.push("/RegistrationForm") }} className={classes.button_style} >Apply now</button>
                            :
                            <>
                                <button type="button" onClick={() => { setModalVisiblity(true); setIsFreeLancer(false); }} className={classes.button_style} >Apply now</button>
                            </>
                    }
                </div>
            </div>
            <AuthModals setShow={setModalVisiblity} show={modalVisiblity} setUserLoggedIn={setUserLoggedIn} isFreeLancer={isFreeLancer} goToPage={"/RegistrationForm"} action={"hero"} />

        </>
    )
}

export default MainBanner;