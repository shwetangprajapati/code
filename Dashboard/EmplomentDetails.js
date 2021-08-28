import React, { useState, useEffect } from 'react'
import classes from './EmploymentDetails.module.css';
import { Button, Modal } from 'react-bootstrap'

const EmplomentDetails = (props) => {
    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);

    const [organisation, setOrganisation] = useState([]);
    const [position, setPosition] = useState([]);
    const [dateFrom, setDateFrom] = useState([]);
    const [dateTo, setDateTo] = useState([]);
    const [location, setLocation] = useState([]);

    const [error, setError] = useState({});
    const [industry, setIndustry] = useState([]);
    const [employee, setEmployee] = useState(
        {
            Organisation: "",
            Position: "",
            DateFrom: "",
            DateTo: "",
            Location: "",
        }
    )

    
    const fetchLocation = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "domain": "districtV2"
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
                setIndustry(result.data)
                console.log('countrylist', result.data)
            })
            .catch(error => console.log('error', error));
    }

    let locationDropdown = industry.map((item, index) => (
        <option key={index} value={item.KeyIndex}>{item.name}</option>
    ));
    useEffect(() => {
        fetchLocation()
    }, [])

    const fetchEmployeDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "candidate": "1960415",
            "employerName": employee.Organisation,
            "designation": employee.Position,
            "durationFromYear": employee.DateFrom,
            "durationToYear": employee.DateTo,
            "city": employee.Location,
        }
        )

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89/v1/api/apiTimes/EmplomentDetail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 200)
                   {
                        
                        console.log("successfull")
                    }
            })
            .catch(error => console.log('error', error));
    }
  

    const showEmployeeDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "CandidateId": "1960415"
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
                    setOrganisation(result.getemploymentdetail.Organisation);
                    setPosition(result.getemploymentdetail.Position);
                    setDateFrom(result.getemploymentdetail.DateFrom);
                    setDateTo(result.getemploymentdetail.DateTo);
                    setLocation(result.getemploymentdetail.Location);
                    console.log("successfull")
                }
            })
            .catch(error => console.log('error', error));
    }
 
    return (
        <>
            <Modal show={props.show5} onHide={props.handleClose5} size="lg" scrollable={true}>
                <Modal.Body>
                    <div>
                        <form className={classes.width} method="post" onSubmit={(e) => { e.preventDefault(); fetchEmployeDetails(); }}>
                            <h3 className={classes.form_heading}>Employment Details</h3>
                            <div>
                                <label for="Organisation" className={classes.form_label}>Organisation*</label><br />
                                <input
                                    onChange={(e) => { setEmployee((employee) => ({ ...employee, Organisation: e.target.value })) }} value={employee.Organisation}
                                    type="text" name="Organisation" className={classes.form_input} required />
                            </div>

                            <div>
                                <label for="Position" className={classes.form_label}>Position*</label><br />
                                <input
                                    onChange={(e) => { setEmployee((employee) => ({ ...employee, Position: e.target.value })) }} value={employee.Position}
                                    type="text" name="Position" className={classes.form_input} required />
                            </div>

                            <div>
                                <label for="Date_From" className={classes.form_label}>Date From*</label><br />
                                <input
                                    onChange={(e) => { setEmployee((employee) => ({ ...employee, DateFrom: e.target.value })) }} value={employee.DateFrom}
                                    type="date" name="Date_From" className={classes.form_input} required />
                            </div>

                            <div>
                                <label for="Date_To" className={classes.form_label}>Date To*</label><br />
                                <input
                                    onChange={(e) => { setEmployee((employee) => ({ ...employee, DateTo: e.target.value })) }} value={employee.DateTo}
                                    type="date" name="Date_To" className={classes.form_input} required />
                            </div>

                            <div>
                                <label for="location" className={classes.form_label}>Location*</label><br />
                                <select
                                    onChange={(e) => { setEmployee((employee) => ({ ...employee, Location: e.target.value })) }} value={employee.Location}
                                    name="location" id="location" className={classes.form_input} required>
                                    <option value="" selected >Select</option>
                                    {locationDropdown}
                                </select>
                            </div>

                            <div>
                                <button  className={classes.form_submit} >Save and Proceed</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EmplomentDetails;