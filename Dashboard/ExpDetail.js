import React, { useState, useEffect } from 'react'
import classes from './ExpDetail.module.css';
import { Button, Modal } from 'react-bootstrap'
const ExpDetail = (props) => {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [experType, setExperType] = useState([]);
    const [experYear, setExperYear] = useState([]);
    const [experMonth, setExperMonth] = useState([]);
    const [ctcYear, setCtcYear] = useState([]);
    const [ctcMonth, setCtcMonth] = useState([]);
    const [industryType, setIndustryType] = useState([]);
    const [jobFuncType, setJobFuncType] = useState([]);
    const [expSkills, setExpSkills] = useState([]);


    const [industry, setIndustry] = useState([]);
    const [error, setError] = useState({});
    const [jobfunction, setJobfunction] = useState([]);
    const [skills, setSkills] = useState([]);
    const [exp, setExp] = useState(false);
    const [experience, setExperience] = useState({
        ExperienceType: "",
        TotalExperienceInYear: "",
        TotalExperienceInMonths: "",
        CurrentCtcInYear: "",
        CurrentCtcInMonths: "",
        IndustryType: "",
        JobFunction: "",
        Skills: "",

    })

    
    const fetchIndustry = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "domain": "Industry"
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

    let industryDropdown = industry.map((item, index) => (
        <option key={index} value={item.KeyIndex}>{item.name}</option>
    ));

    useEffect(() => {
        fetchIndustry()
    }, [])


    const fetchjobfunc = () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "data": "Jobfunction"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89/v1/api/apiTimes/JobFunction", requestOptions)
            .then(response => response.json())
            .then(result => {
                setJobfunction(result.data)
                console.log('countrylist', result.data)
            })
            .catch(error => console.log('error', error));
    }
    let jobfunction1 = jobfunction.map((item, index) => (
        <option key={index} value={item.keyIndex}>{item.Jobfunction}</option>
    ));

    useEffect(() => {
        fetchjobfunc()
    }, [])

    const fetchExpDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "CandidateId": "1960415",
            "candidateStage": experience.ExperienceType,
            "totalExperienceInYears": experience.TotalExperienceInYear,
            "totalExperienceInMonths": experience.TotalExperienceInMonths,
            "currentCtcInLakhs": experience.CurrentCtcInYear,
            "currentCtcInThousands": experience.CurrentCtcInMonths,
            "industry": experience.IndustryType,
            "jobFunction": experience.JobFunction,
            "skills": experience.Skills,

        });
        console.log(experience)

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
    

    const fetchskills = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "skills": ""
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89/v1/api/apiTimes/Getskills", requestOptions)
            .then(response => response.json())
            .then(result => {
                setSkills(result.data)
                console.log('skills', result.data)
            })
            .catch(error => console.log('error', error));   
    }

    let getskills = skills.map((item, index) => (
        <option key={index}>{item.name}</option>
    ));

    useEffect(() => {
        fetchskills()
    }, [])


    const showExpDetails = () => {
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
                if (result.status_code === 200)
                 {
                        setExperType(result.CandidateDetai.ExperienceType)
                        setExperYear(result.CandidateDetai.TotalExperienceInYear)
                        setExperMonth(result.CandidateDetai.TotalExperienceInMonths)
                        setCtcYear(result.CandidateDetai.CurrentCtcInYear)
                        setCtcMonth(result.CandidateDetai.CurrentCtcInMonths)
                        setIndustryType(result.CandidateDetai.IndustryType)
                        setJobFuncType(result.CandidateDetai.JobFunction)
                        setExpSkills(result.CandidateDetai.Skills)
                        console.log("successfull")
                    }
            })
            .catch(error => console.log('error', error));
    }
   

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose} size="lg" scrollable={true}>
                <Modal.Body >
                    <div>
                        <form className={classes.width} method="post" onSubmit={(e) => { e.preventDefault(); fetchExpDetails();}}>
                            <h3 className={classes.form_heading}>Experience Details</h3>

                            <div>
                                <label for="Exp_type" className={classes.form_label}>Experience Type*</label><br />
                                <select

                                    onChange={(e) => { e.target.value === "Experience" ? setExp(true) : setExp(false); setExperience((experience) => ({ ...experience, ExperienceType: e.target.value })) }} value={experience.ExperienceType} name="Exp_type" id="Exp_type" className={classes.form_input} required>
                                    <option value="" selected >Select</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="Experience">Experience</option>
                                </select>

                                {
                                    exp === false ?
                                        <></> :
                                        <>
                                            <div>
                                                <label for="TT_exp" className={classes.form_label}>Total Experience(In Year)*</label>
                                                <input
                                                    onChange={(e) => { setExperience((experience) => ({ ...experience, TotalExperienceInYear: e.target.value })) }} value={experience.TotalExperienceInYear}
                                                    type="TT_exp" name="TT_exp" className={classes.form_input} required />
                                            </div>

                                            <div>
                                                <label for="TT_exp" className={classes.form_label}>Total Experience(In Months)*</label>
                                                <input
                                                    onChange={(e) => { setExperience((experience) => ({ ...experience, TotalExperienceInMonths: e.target.value })) }} value={experience.TotalExperienceInMonths}
                                                    type="TT_exp" name="TT_exp" className={classes.form_input} required />
                                            </div>

                                            <div>
                                                <label for="Current_ctc" className={classes.form_label}>Current CTC(In Lacs)*</label><br />
                                                <input
                                                    onChange={(e) => { setExperience((experience) => ({ ...experience, CurrentCtcInYear: e.target.value })) }} value={experience.CurrentCtcInYear}
                                                    type="Current_ctc" name="Current_ctc" className={classes.form_input} required />
                                            </div>

                                            <div>
                                                <label for="Current_ctc" className={classes.form_label}>Current CTC(In Thousand)*</label><br />
                                                <input
                                                    onChange={(e) => { setExperience((experience) => ({ ...experience, CurrentCtcInMonths: e.target.value })) }} value={experience.CurrentCtcInMonths}
                                                    type="Current_ctc" name="Current_ctc" className={classes.form_input} required />

                                            </div>

                                        </>
                                }
                            </div>

                            <div>
                                <label for="Industry" className={classes.form_label}>Select Industry*</label><br />
                                <select
                                    onChange={(e) => { setExperience((experience) => ({ ...experience, IndustryType: e.target.value })) }} value={experience.IndustryType}
                                    name="Industry" id="Industry" className={classes.form_input} required>
                                    <option value="" selected >Select</option>
                                    {industryDropdown}
                                </select>
                            </div>

                            <div>
                                <label for="Function" className={classes.form_label}>Job Function*</label><br />
                                <select
                                    onChange={(e) => { setExperience((experience) => ({ ...experience, JobFunction: e.target.value })) }} value={experience.JobFunction}
                                    name="Function" id="Function" className={classes.form_input} required>
                                    <option value="" selected >Select</option>
                                    {jobfunction1}
                                </select>
                            </div>

                            <div>
                                <label for="Skills" className={classes.form_label}>Skills*</label><br />
                                <select
                                    onChange={(e) => { setExperience((experience) => ({ ...experience, Skills: e.target.value })) }} value={experience.Skills}
                                    type="Skills" name="Skills" className={classes.form_input} required >
                                    <option value="" selected>select</option>
                                    {getskills}
                                </select>
                            </div>

                            <div>
                                <button  type="submit"  className={classes.form_submit} >Save and Proceed</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ExpDetail;