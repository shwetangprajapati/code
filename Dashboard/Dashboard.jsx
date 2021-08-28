import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Profile from './Profile'
import RecommendedJobs from './RecommendedJobs';
import Uploadcv from './Uploadcv'
import Savedjobs from './Savedjobs'
function Dashboard() {
  const [details, setDetails] = useState();
  const [companyId, setCompanyId] = useState(window.location.pathname.split("/").pop());
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token 77927b69bb144b065ca11bf2a9d452819cd852db");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "CandidateId": companyId
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(global.ApiLink+"apiTimes/CandidateDetail", requestOptions)
      .then(response => response.json())
      .then(result => {
        setDetails(result.CandidateDetai)
      })
      .catch(error => console.log('error', error));
  }, [])
  return (
    <React.Fragment>
<div className="bg_colordashbord">
      <Container >
        <Row >
          <Col md={3} >
            <Profile className="rounded_div rounded" details={details} />
          </Col>
          <Col md={6}  >
            <Uploadcv />
            <Savedjobs />
          </Col>
          <Col md={3}>
            <RecommendedJobs />
          </Col>
        </Row>
      </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard;
