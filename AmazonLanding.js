
import React from "react";
// import classes from '../MainBanner.module.css';
// import classes from '../AmazonAbout.module.css';
// import classes from '../InfoGraphic.module.css';
import MainBanner from './MainBanner';
import Amazon_Grid from './Amazon_Grid';
import AmazonAbout from './AmazonAbout';

const AmazonLanding = () => {
    return (
        <React.Fragment>
            <MainBanner />
            <Amazon_Grid />
            <AmazonAbout />
        </React.Fragment>
    )
}

export default AmazonLanding;