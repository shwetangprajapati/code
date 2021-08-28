import React, { useState, useEffect } from 'react'
import classes from './ChangePassword.module.css';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlash } from 'react-icons/bs';
import { Button, Modal } from 'react-bootstrap'

const ChangePassword = (props) => {

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const [error, setError] = useState({});
    const [oldpassword, setOldpassword] = useState(false);
    const [newpassword, setNewpassword] = useState(false);
    const [cnfmpassword, setCnfmpassword] = useState(false);
    const [education, setEducation] = useState(
        {
            OldPassword: "",
            NewPassword: "",
            ConfirmPassword: ""
        }
    )

    const formValidation = () => {
        let errors = {};
        let isValid = true;

        if (education.NewPassword !== education.ConfirmPassword) {
            errors.ConfirmPassword = "Both field should be same"
            isValid = false;
        }
        setError(errors)
        return isValid;
    }

    const fetchChangePassword = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "CandidateId": "1960415",
            "Oldpassword": education.OldPassword,
            "Newpassword": education.NewPassword,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89/v1/api/apiTimes/ChangePassword", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 200)
                    if (formValidation()) {
                        console.log("successfull")
                    }
            })
            .catch(error => console.log('error', error));
    }

    // showChangeNewPassword=()=>{

    // }
    return (
        <>

            <Modal show={props.show3} onHide={props.handleClose3} size="lg" scrollable={true}>
                <Modal.Body>
                    <form className={classes.width} onSubmit={(e) => { e.preventDefault(); formValidation() ? fetchChangePassword() : alert("Something's wrong"); }}>
                        <h3 className={classes.form_heading}>Change Password</h3>

                        <div>
                            <label for="Old_Password" className={classes.form_label}>Old Password*</label><br />
                            <input
                                type={oldpassword ? "text" : "password"}
                                onChange={(e) => { setEducation((education) => ({ ...education, OldPassword: e.target.value })) }} value={education.OldPassword}
                                name="Old_Password" className={classes.form_input} required />
                            {
                                oldpassword ?
                                    <BsEyeSlash onClick={() => setOldpassword(!oldpassword)} className={classes.icons} /> : <>
                                        <AiOutlineEye onClick={() => setOldpassword(!oldpassword)} className={classes.icons} />
                                    </>
                            }
                        </div>
                        <p className={classes.form_error_msg}>{error.OldPassword}</p>


                        <div>
                            <label for="New_Password" className={classes.form_label}>New Password*</label><br />
                            <input
                                type={newpassword ? "text" : "password"}
                                onChange={(e) => { setEducation((education) => ({ ...education, NewPassword: e.target.value })) }} value={education.NewPassword}
                                name="New_Password" className={classes.form_input} required />
                            {
                                newpassword ?
                                    <BsEyeSlash onClick={() => setNewpassword(!newpassword)} className={classes.icons} /> : <>
                                        <AiOutlineEye onClick={() => setNewpassword(!newpassword)} className={classes.icons} />
                                    </>
                            }
                        </div>
                        <p className={classes.form_error_msg}>{error.NewPassword}</p>


                        <div>
                            <label for="Confirm_Password" className={classes.form_label}>Confirm Password*</label><br />
                            <input
                                type={cnfmpassword ? "text" : "password"}
                                onChange={(e) => { setEducation((education) => ({ ...education, ConfirmPassword: e.target.value })) }} value={education.ConfirmPassword}
                                name="Confirm_Password" className={classes.form_input} required />
                            {
                                cnfmpassword ?
                                    <BsEyeSlash onClick={() => setCnfmpassword(!cnfmpassword)} className={classes.icons} /> : <>
                                        <AiOutlineEye onClick={() => setCnfmpassword(!cnfmpassword)} className={classes.icons} />
                                    </>
                            }
                        </div>
                        <p className={classes.form_error_msg}>{error.ConfirmPassword}</p>


                        <div>
                            <button type={"submit"} className={classes.form_submit} >Save &amp; Proceed</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ChangePassword;