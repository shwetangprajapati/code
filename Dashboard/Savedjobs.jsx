import React, { useState, useEffect } from 'react'
import classes from './Savedjobs.module.css';
import JobCardRevamp from '../../components/JobCardRevamp'
import { BsBriefcase } from 'react-icons/bs';
const Savedjobs = (props) => {
    const [showdata,setShowdata]=useState([])
    const [width, setWidth] = useState();
    useEffect(() => {
        GetRecommendedJobforCandidate()
        window.addEventListener('resize', () => {
            return (
                setWidth()
            )
        })
    }, [])

    const GetRecommendedJobforCandidate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Candidate_Id": "2574322"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.232.159.89/v1/api/apiTimes/GetRecommendedJobforCandidate", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 200)
                    {
                        setShowdata(result.data)  
                        console.log('showdata', result.data)

                    }
            })
            .catch(error => console.log('error', error));
    }

    const div = [
        {
            textName: "Saved Jobs",
            icon: "/2688073.png"
        },
        {
            textName: "Applied Jobs",
            icon: "/portfolio.png"
        },
    ]
    return (
        <div className={classes.savedjobs_headdiv}>
            {div.map((item, index) =>
                <div className={classes.savedjobs_mainhead}>
                    {width < 768 ?
                        <p key={index} className={classes.savedjobs_maintext}>{item.textName}</p>
                        :
                        <h6 key={index} className={classes.savedjobs_maintext}><BsBriefcase className={classes.savedjobs_icon} />{item.textName}</h6>
                    }
                    {
                        <div>
                           
                          <div> Hi </div>
                            {showdata.map((item) => {
                                    return (
                                        <div>
                                            <JobCardRevamp item={item} />
                                        </div>
                                    )
                                })
                            }
                        </div>

                    }
                    <div className={classes.savedjobs_text2}>
                        <a href="/" className={classes.savedjobs_text}>Show More</a>
                    </div>

                </div>
            )}
        </div>
    )
}
export default Savedjobs;
