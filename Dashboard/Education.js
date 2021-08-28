import React, {useState, useEffect } from 'react'
import classes from './Education.module.css';
import { Button, Modal } from 'react-bootstrap'

const Education = (props) => {
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const[course,setCourse]=useState([]);
    const[specialisation,setSpecialisation]=useState([]);
    const[institute,setInstitute]=useState([]);
    const[yearofpassing,setYearofpassing]=useState([]);

    const [years, setYears] = useState([]);
    const [error, setError] = useState({});
    const [courses, setCourses] = useState([]);
    const [education, setEducation] = useState(
        {
            Courses: "",
            Specialisation: "",
            Institute: "",
            Year_Of_Passing: "",
        }
    )

    const fetchCourses = () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "data": "Courses"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89:8000/v1/api/apiTimes/GetCourses", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCourses(result.data)
                    .catch(error => console.log('error', error));
                console.log('courses', result.data)
            })
            .catch(error => console.log('error', error));
    }
    let coursesDropdown = courses.map((item, index) => (
        <option key={index} value={item.keyIndex}>{item.Courses}</option>
    ));
    useEffect(() => {
        fetchCourses()
    }, [])

    useEffect(() => {
        for (var i = 1972; i <= 2021; i++) {
            const yearArr = years;
            yearArr.push(i);
            setYears(yearArr);
        }
    }, [])

    const fetchEducationDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "candidate": "1960415",
            "course": education.Courses,
            "specialization": education.Specialisation,
            "institute": education.Institute,
            "yearOfPassing": education.Year_Of_Passing,
        }
        )

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89:8000/v1/api/apiTimes/AddEducationDetail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 200)
                    {
                        // history.push("/AmazonFormSucces")
                        console.log("successfull")
                    }
            })
            .catch(error => console.log('error', error));
    }

    const showEducationDetails=()=>{
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
        
        fetch("http://13.232.159.89:8000/v1/api/apiTimes/CandidateDetail", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status_code === 200) {
                setCourse(result.educationdetail.Courses)
                setSpecialisation(result.educationdetail.Specialisation)
                setInstitute(result.educationdetail.Institute)
                setYearofpassing(result.educationdetail.Year_Of_Passing)
                console.log("successfull")
            }
        })
        .catch(error => console.log('error', error));
}

    return (
        <>

            <Modal show={props.show2} onHide={props.handleClose2} size="lg" scrollable={true}>
                <Modal.Body>
                    <form className={classes.width} method="post" onSubmit={(e) => { e.preventDefault(); fetchEducationDetails(); }}>
                        <h3 className={classes.form_heading}>Education Details</h3>
                        <div>
                            <label for="courses" className={classes.form_label}>Courses*</label><br />
                            <select
                                onChange={(e) => { setEducation((education) => ({ ...education, Courses: e.target.value })) }} value={education.Courses}
                                name="courses" id="courses" className={classes.form_input} required>
                                <option value="" selected >Select</option>
                                {coursesDropdown}
                            </select>
                        </div>

                        <div>
                            <label for="Specialisation" className={classes.form_label}>Specialisation*</label><br />
                            <input
                                onChange={(e) => { setEducation((education) => ({ ...education, Specialisation: e.target.value })) }} value={education.Specialisation}
                                type="text" name="Specialisation" className={classes.form_input} required />
                        </div>

                        <div>
                            <label for="Institute" className={classes.form_label}>Institute*</label><br />
                            <input
                                onChange={(e) => { setEducation((education) => ({ ...education, Institute: e.target.value })) }} value={education.Institute}
                                type="text" name="Institute" className={classes.form_input} required />
                        </div>

                        <div>
                            <label for="Year_Of_Passing" className={classes.form_label}>Year Of Passing*</label><br />
                            <select
                                onChange={(e) => { setEducation((education) => ({ ...education, Year_Of_Passing: e.target.value })) }} value={education.Year_Of_Passing}
                                name="Year_Of_Passing" id="Year_Of_Passing" className={classes.form_input} required>
                                <option value="" selected >Select</option>
                                {
                                    years.reverse().map((value, index) => {
                                        return <option key={index}>{value}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <button type={"submit"}  className={classes.form_submit} >Add More</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Education;