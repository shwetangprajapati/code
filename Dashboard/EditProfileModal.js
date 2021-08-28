import React, { useState, useEffect } from 'react'
import classes from './EditProfileModal.module.css';
import { Button, Modal } from 'react-bootstrap'

const EditProfileModal = (props) => {

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [title, setTitle] = useState([]);
    const [fname, setFname] = useState([]);
    const [lname, setLname] = useState([]);
    const [email, setEmail] = useState([]);
    const [mobile, setMobile] = useState([]);
    const [country, setCountry] = useState([]);

    const [error, setError] = useState({});
    const [countryList, setCountryList] = useState([]);
    const [edit_profile, setEdit_profile] = useState(
        {
            Title: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Mobile: "",
            Country: "",
        }
    )
    const fetchCountry = () => {
        // console.log(formValidation())

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "domain": "Country"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89/v1/api/apiTimes/getResultviaDomain", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCountryList(result.data)
                console.log('countrylist', result.data)
            })
            .catch(error => console.log('error', error));
    }
    let countryDropdown = countryList.map((item, index) => (
        <option key={index} value={item.KeyIndex}>{item.name}</option>
    ));
    useEffect(() => {
        fetchCountry()
    }, [])

    const fetchCandidateDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "CandidateId": "1960415",
            "email": edit_profile.Email,
            "mobile": edit_profile.Mobile,
            "title": edit_profile.Title,
            "firstName": edit_profile.FirstName,
            "lastName": edit_profile.LastName,
            "country": edit_profile.Country
        });
        console.log(edit_profile)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89/v1/api/apiTimes/UpdateCandidateProfile", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 200)
                     {

                        console.log("successfull")
                    }
            })
            .catch(error => console.log('error', error));
    }
    
    const showCandidateDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "CandidateId": "2587204"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89/v1/api/apiTimes/CandidateDetail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 200) {
                    setTitle(result.CandidateDetai.Title)
                    setFname(result.CandidateDetai.FirstName)
                    setLname(result.CandidateDetai.LastName)
                    setEmail(result.CandidateDetai.Email)
                    setMobile(result.CandidateDetai.Mobile)
                    setCountry(result.CandidateDetai.Country)
                    console.log("successfull")
                }
            })
            .catch(error => console.log('error', error));
    }
    
    return (
        <>
            <Modal show={props.show1} onHide={props.handleClose1} size="lg" scrollable={true} >
                <Modal.Body>
                    <div>
                        <form className={classes.width} method="post" onSubmit={(e) => { e.preventDefault(); fetchCandidateDetails(); }}>
                            <h3 className={classes.form_heading}>Professional Details</h3>
                            <div>
                                <label for="title" className={classes.form_label}>Title*</label><br />
                                <select
                                    onChange={(e) => { setEdit_profile((edit_profile) => ({ ...edit_profile, Title: e.target.value })) }} value={edit_profile.Title}
                                    name="title" id="title" className={classes.form_input} required>
                                    <option value="" selected >Select</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Mrs">Mrs.</option>
                                </select>
                            </div>

                            <div>
                                <label for="first_name" className={classes.form_label}>First Name*</label><br />
                                <input
                                    onChange={(e) => { setEdit_profile((edit_profile) => ({ ...edit_profile, FirstName: e.target.value })) }} value={edit_profile.FirstName}
                                    type="text" name="first_name" className={classes.form_input} required />
                            </div>

                            <div>
                                <label for="last_name" className={classes.form_label}>Last Name*</label><br />
                                <input
                                    onChange={(e) => { setEdit_profile((edit_profile) => ({ ...edit_profile, LastName: e.target.value })) }} value={edit_profile.LastName}
                                    type="text" name="last_name" className={classes.form_input} required />
                            </div>

                            <div>
                                <label for="email" className={classes.form_label}>Email*</label><br />
                                <input
                                    onChange={(e) => { setEdit_profile((edit_profile) => ({ ...edit_profile, Email: e.target.value })) }} value={edit_profile.Email}
                                    type="email" name="email" className={classes.form_input} required />
                            </div>

                            <div>
                                <label for="mobile" className={classes.form_label}>Mobile*</label><br />
                                <input
                                    onChange={(e) => { setEdit_profile((edit_profile) => ({ ...edit_profile, Mobile: e.target.value })) }} value={edit_profile.Mobile}
                                    type="tel" name="mobile" maxlength="10" minlength="0" className={classes.form_input} required />
                            </div>

                            <div>
                                <label for="Country" className={classes.form_label}>Country*</label><br />
                                <select
                                    onChange={(e) => { setEdit_profile((edit_profile) => ({ ...edit_profile, Country: e.target.value })) }} value={edit_profile.Country}
                                    name="Country" id="Country" className={classes.form_input} required>
                                    <option value="" selected >Select</option>
                                    {countryDropdown}
                                </select>
                            </div>

                            <div>
                                <label for="ps" className={classes.form_label}>Professional Summary</label><br />
                                <input type="text" name="ps" className={classes.form_input} />
                            </div>

                            <div>
                                <button type={"submit"}  className={classes.form_submit} >Save and Proceed</button>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditProfileModal;