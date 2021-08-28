import React from 'react'
import classes from './RecommendedJobs.module.css';
import { BsBriefcase } from 'react-icons/bs';
const RecommendedJobs = () => {
    const div = [
        {
            textName: "Recommended Jobs"
        },
        {
            textName: "Trending Jobs"
        },
    ]
    return (

        <div className={classes.recommended_headdiv}>
            {div.map((item, index) =>
                <div className={classes.Recommended_maindiv}>
                
                    <div className={classes.Recommended_headborder}>
                        <h6 key={index} className={classes.Recommended_mainhead}><BsBriefcase  className={classes.Recommended_icon}/>{item.textName}</h6>
                    </div>
                 
                  
                        <div lassName={classes.Recommended_texthead}>
                        <h6 className={classes.Recommended_text}>Education Jobs</h6>
                        <h6 className={classes.Recommended_text}>Engineering Jobs</h6>
                        <h6 className={classes.Recommended_text}>Recruitment Agency Jobs</h6>
                        <h6 className={classes.Recommended_text}>Consultancy Jobs</h6>
                        <h6 className={classes.Recommended_text}>Production &amp; Manufacturing Jobs</h6>
                        <h6 className={classes.Recommended_text}>Healthcare &amp; Medical Jobs</h6>
                        <h6 className={classes.Recommended_text}>Construction Jobs</h6>
                        <h6 className={classes.Recommended_text}>IT Software Jobs</h6>
                        <h6 className={classes.Recommended_text}>Hospitality Jobs</h6>
                    </div>
                    <div className={classes.Recommended_btn}><a href="/" className={classes.Recommended_link}>Show More</a></div>
                </div>
            )}
        </div>


    )
}

export default RecommendedJobs;
