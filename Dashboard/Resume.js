import React, { useState, useEffect } from 'react'
import classes from './Resume.module.css';
import { Modal, Button } from 'react-bootstrap'
const Resume = (props) => {

    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

    const [uploadresume, setUploadresume] = useState("");
    const [error, setError] = useState({});
    const [resume, setResume] = useState
        (
            {
                Resume_Title: "",
                Upload_Resume: "",
            }
        )

    const uploadFile = async (files, type) => {
        var formdata = new FormData();
        formdata.append("file_uploads", files);

        await fetch("http://13.232.159.89/v1/api/apiTimes/UploadFile", {
            method: 'POST',
            headers: {
                'Auth-Token': "Token 77927b69bb144b065ca11bf2a9d452819cd852db"

            },
            
            body: formdata,
            redirect: 'follow'
        })
        
            .then(response => response.json())
            .then(result => {
                let imageData = result.data;
                let imageUrl = imageData.path;
                if (type  === "resume") {
                    setResume((resume) => ({ ...resume, Upload_Resume: imageUrl }));
                }
            })
            .catch(error => console.log('error', error));
    }
   


    return (
        <>

            <Modal show={props.show4} onHide={props.handleClose4} size="lg" scrollable={true}>
                <Modal.Body>
                    <form className={classes.width}>
                        <h3 className={classes.form_heading}>Resume</h3>
                        <div>
                            <label for="Title" className={classes.form_label}>Resume Title</label><br />
                            <input

                                type="text" name="Title" className={classes.form_input}  />
                        </div>

                        <div>
                            <input
                                type="file"
                                id="actual-btn3"
                                onChange={(e) => { setUploadresume(e.target.files[0].name); uploadFile(e.target.files[0], "resume") }}
                                hidden />
                            <label for="actual-btn3" className={classes.label1}>Upload Resume --&gt;{uploadresume !== "" ? (uploadresume) : ""}</label><br />

                        </div>

                        <div>
                            <label for="Title" className={classes.form_label}>Set as Default Resume</label><br />
                            <input type="radio" id="Yes" name="fav_language" value="Yes" />
                            <label for="Yes" className={classes.radio_label}>Yes</label>

                            <input type="radio" id="No" name="fav_language" value="No" />
                            <label for="No" className={classes.radio_label}>No</label>
                        </div>

                        <div>
                            <button className={classes.form_submit} >Save and Proceed</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Resume;