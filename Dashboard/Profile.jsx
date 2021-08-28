import React,{useState} from 'react'
import classes from './Profile.module.css';
import { HiOutlineUser } from 'react-icons/hi';
import { TiMinus } from 'react-icons/ti';
import Uploadcvmov from './Uploadcvmov'
import Uploadcv from './Uploadcv';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import EditProfileModal from './EditProfileModal'
import Resume from './Resume'
import ChangePassword from './ChangePassword'
import EmplomentDetails from './EmplomentDetails'
import Education from './Education'
import ExpDetail from './ExpDetail'
const Profile = (props) => {
    //editprofile
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    //expdetails
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //education
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    //change password
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    //resume
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);
    //Employment details
    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);
  

    return (
        <div className={classes.profile_headdiv}>
            <Uploadcvmov />
            <EditProfileModal show1={show1} handleClose1={handleClose1} />
            <ExpDetail show={show} handleClose={handleClose} />
            <EmplomentDetails show5={show5} handleClose5={handleClose5} />
            <Education show2={show2} handleClose2={handleClose2} />
            <ChangePassword show3={show3} handleClose3={handleClose3} />
            <Resume show4={show4} handleClose4={handleClose4} />
            <div className={classes.profile_head}>
               
                    <div className={classes.profile_border}>
                    <h6 className={classes.profile_text}><HiOutlineUser className={classes.profile_text1} />
                        Profile</h6>
                    <a href="/" className={classes.profile_link} onClick={handleShow1}>Edit</a>
                </div>
                <div className={classes.profile_imghead}>
                    <div className={classes.profile_imgdiv}>
                        <img className={classes.profile_img } src={props.details !== undefined ? props.details.imagePath
                            : "Sanjana"} alt={"profile"} />
                        <div>
                            {
                                props.details !== undefined && props.details.email !== "" ? <p className={classes.profile_name }>{props.details.email}

                                </p> :
                                    <Link to="#" className={classes.text_color}>Add Your Email</Link>
                            }
                        </div>

                        {/* <h5 className={classes.profile_name}>SINGHANIA</h5> */}
                        <div className={classes.profile_graphic}>
                            {
                                props.details !== undefined && props.details.skills !== "" ? <p className={classes.profile_graphic }>{props.details.skills}</p> :
                                    <Link to="#" className={classes.text_color}>Add Your Skill</Link>
                            }
                        </div>

                    </div>
                
                    <div className={classes.profile_border2}>
                        <h5 className={classes.profile_about}>About</h5>
                        {
                            props.details !== undefined && props.details.professionalSummary !== "" ? <div className={classes.profile_text2}>{props.details !== undefined ? props.details.professionalSummary : ""}</div> :
                                <Link to="#" className={classes.text_color}>Update your about Us</Link>
                        }
                    </div>
                    <div className={classes.profile_border2}>
                        <div className={classes.profile_heading }>
                            <p >Experience details</p>
                            <FaPlus className={classes.text_color} onClick={handleShow}/>
                        </div>
                        {/* <h6 className={classes.profile_heading2}>
                            <span className="d-flex justify-content-between">Graphic Designer
                                <TiMinus className={classes.profile_icon} /></span>
                        </h6> */}
                        {/* <h6 className={classes.profile_heading2}>
                            <span className="d-flex justify-content-between">
                                Graphic Head
                                <TiMinus className={classes.profile_icon} /></span>
                        </h6> */}
                        {/* <a href="/" className={classes.profile_link2}>Add more</a> */}
                        <div className={classes.profile_heading }>
                            <p >Employment details</p>
                            <FaPlus className={classes.text_color} onClick={handleShow5}/>
                        </div>
                        {/* <h6 className={classes.profile_heading2}>
                            <span className="d-flex justify-content-between">
                                Teamwork
                                <TiMinus className={classes.profile_icon} /></span>
                        </h6> */}
                        {/* <h6 className={classes.profile_heading2}>
                            <span className="d-flex justify-content-between">
                                Confidence
                                <TiMinus className={classes.profile_icon} /></span>
                        </h6> */}
                        {/* <a href="/" className={classes.profile_link2}>Add more</a> */}
                        <div className={classes.profile_heading}>
                            <p >Education details</p>
                            <FaPlus className={classes.text_color} onClick={handleShow2}/>
                        </div>
                        {/* <h6 className={classes.profile_heading2}>
                            <span className="d-flex justify-content-between">
                                Teamwork
                                <TiMinus className={classes.profile_icon} /></span>
                        </h6> */}
                        {/* <h6 className={classes.profile_heading2}>
                            <span className="d-flex justify-content-between">
                                Confidence
                                <TiMinus className={classes.profile_icon} /></span>
                        </h6> */}
                        {/* <a href="/" className={classes.profile_link2}>Add more</a> */}
                        <div className={classes.profile_heading}>
                            <p >Change password</p>
                            <FaPlus className={classes.text_color}  onClick={handleShow3}/>
                        </div>
                        {/* <h6 className={classes.profile_heading2}>
                            <span className="d-flex justify-content-between">
                                English<TiMinus className={classes.profile_icon} /></span>
                        </h6> */}
                         <div className={classes.profile_heading}>
                            <p >Upload resume</p>
                            <FaPlus className={classes.text_color} onClick={handleShow4} />
                        </div>
                        
                    </div>
                </div>
                    <div className={classes.profile_last_link}>
                    <a href="/" className={classes.profile_link3}>Show More</a>
                </div>
            </div>
        </div>
    )
}

export default Profile;
