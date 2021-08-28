import React, { useState, useEffect, useRef } from 'react'
import { Toast, Container, Form, OverlayTrigger, Modal, Popover } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function HeroRegistrationForm() {
    const ref = useRef(null);
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [adhar, setAdhar] = useState('');
    const [pan, setPan] = useState();
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [states, setStates] = useState();
    const [city, setCity] = useState();
    const [pinCode, setPinCode] = useState('');
    const [checkBox, setCheckBox] = useState(true);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState('');
    const [show, setShow] = useState(false);
    const [applied, setApplied] = useState('');
    const [ApiError, setApiError] = useState(false);




    useEffect(() => {
        if (!cookies.get('USERID')) {
            history.push('/hero-insurance')
        } else {
            getInfoData()
            handlestateList();
        }
    }, [])
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const mobileRef = useRef(null);
    const adharRef = useRef(null);
    const panRef = useRef(null);
    const dobRef = useRef(null);
    const addressRef = useRef(null);
    const stateRef = useRef(null);
    const cityRef = useRef(null);
    const pinCodeRef = useRef(null);

    useEffect(() => {
        if (errors.name) {
            nameRef.current.focus();
        }
        else if (errors.email) {
            emailRef.current.focus();
        }
        else if (errors.mobile) {
            mobileRef.current.focus();
        }
        else if (errors.adhar) {
            adharRef.current.focus();
        }
        else if (errors.pan) {
            panRef.current.focus();
        }
        else if (errors.dob) {
            dobRef.current.focus();
        }
        else if (errors.address) {
            addressRef.current.focus();
        }
        else if (errors.states) {
            stateRef.current.focus();
        }
        else if (errors.city) {
            cityRef.current.focus();
        }
        else if (errors.pinCode) {
            pinCodeRef.current.focus();
        }
    }, [errors]);

    const getInfoData = () => {
        fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_HERO_ADVISORS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': process.env.REACT_APP_BUYER_AUTH_TOKEN,
            },
            body: JSON.stringify({
                "userid": cookies.get('USERID')
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setName(result.data.hero_form.FullName)
                    setMobile(result.data.hero_form.Mobile)
                    setCity(result.data.hero_form.City)
                    setStates(result.data.hero_form.State)
                    setPinCode(result.data.hero_form.Pincode)

                    setEmail(result.data.hero_form.Email)
                    setAdhar(result.data.hero_form.aadhar_no)
                    setPan(result.data.hero_form.pan_no)
                    setDob(result.data.hero_form.dob)
                    setAddress(result.data.hero_form.AddressLine)
                    if (result.data.hero_form.ID) {
                        setApplied(result.data.hero_form.ID)
                        setShow(true)
                    }

                } else {
                    fetchUserProfileData()
                }
            })
    }
    const fetchUserProfileData = () => {

        fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_GET_PROFILE_STATUS, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN,
            },
            body: JSON.stringify({
                "userid": cookies.get("USERID"),
            }),
            redirect: 'follow',
        })
            .then(response => response.json())
            .then(res => {
                setName(res.data.members.ac_name)
                setMobile(res.data.members.mobile)
                setStates(res.data.si.state)
                setCity(res.data.si.city)
                setPinCode(res.data.si.pincode)

                setEmail(res.data.members.email)
                setAddress(res.data.si.address)
            });
    }
    const formValidation = () => {
        let errors = {};
        let isValid = true;

        // name
        if (!name || name === '') {
            errors.name = "Name is required"
            isValid = false;
        }
        // Mobile
        if (!mobile || mobile === '') {
            errors.mobile = "Mobile number is required"
            isValid = false;
        } else if (mobile.length !== 10) {
            errors.mobile = "Please Enter 10 digit number"
            isValid = false;
        }
        // Email
        if (!email || email === '') {
            errors.email = "Email is required"
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
            errors.email = 'Invalid Email Address ';
            isValid = false;
        }
        // adhar
        const adharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
        if (!adhar || adhar === '') {
            errors.adhar = "Aadhaar Number is required"
            isValid = false
        } else if (!adharRegex.test(adhar)) {
            errors.adhar = "Invalid Aadhaar Number"
            isValid = false;
        }
        // Pan Card
        const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!pan || pan === '') {
            errors.pan = "Pan Number is required"
            isValid = false
        } else if (!regex.test(pan)) {
            errors.pan = "Invalid Pan Card Number"
            isValid = false;
        }
        // dob
        var pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
        if (!dob || dob === '') {
            isValid = false;
            errors.dob = "Date of Birth is required"
        } else if (!pattern.test(dob)) {
            isValid = false;
            errors.dob = "Please follow this pattern (dd/mm/yyyy) ";

        }
        // address
        if (!address || address === '') {
            isValid = false;
            errors.address = "Address is required"
        }
        // states
        if (!states || states === '') {
            isValid = false;
            errors.states = "States is required"
        }
        // city
        if (!city || city === '') {
            isValid = false;
            errors.city = "City is required"
        }
        // pinCode
        if (!pinCode || pinCode === '') {
            isValid = false;
            errors.pinCode = "Pincode is required"
        } else if (pinCode.length !== 6) {
            errors.pinCode = "Please enter 6 digit number"
            isValid = false;
        }
        setErrors(errors)
        return isValid;

    }
    const HeroRegistration = (e) => {
        if (formValidation()) {
            // fetch("http://rozgaarindia.com:8000/" + process.env.REACT_APP_HERO_ADVISOR_POST, {
            fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_HERO_ADVISOR_POST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': process.env.REACT_APP_BUYER_AUTH_TOKEN,
                },
                body: JSON.stringify({
                    "userid": cookies.get('USERID'),
                    "name": name,
                    "email": email,
                    "aadhar_no": adhar,
                    "pan_no": pan,
                    "dob": dob,
                    "AddressLine": address,
                    "mobile": mobile,
                    "city": city,
                    "state": states,
                    "pincode": pinCode,
                    "terms": checkBox
                })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'success') {
                        // history.push("/hero-insurance-posp-application-form")
                        // alert('success')
                        setShow(true)
                    } else {
                        setApiError(true)
                    }

                })
        }
    }


    const handlestateList = async () => {

        await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_GET_STATE_CITY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': process.env.REACT_APP_BUYER_AUTH_TOKEN,
            },
            body: JSON.stringify({
                "type": "state",
            })
        })
            .then(response => response.json())
            .then(res => (
                setStateList(res.data)
                // console.log('---res daata----',res.data)
            ));
    }

    const handleCityList = async (state) => {
        setCity(null);

        await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_GET_STATE_CITY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': process.env.REACT_APP_BUYER_AUTH_TOKEN,
            },
            body: JSON.stringify({
                "type": "city",
                "state": state,
            })
        })
            .then(response => response.json())
            .then(res => {
                setCityList(res.data)
            });
    }
    function keyPressFunc(e) {

        if (e.which === 8) {
            var val = dob;
            console.log(val);
            if (val.length == 3 || val.length == 6) {
                val = val.slice(0, val.length - 1);
                console.log(val)
                setDob(val)
            }
        }
    }

    function handleChange(e) {
        var val = e.target.value;
        console.log('called', val)
        if (val.length === 2) {

            val += '/';

        } else if (val.length === 5) {

            val += '/';

        }
        setDob(val)



    }

    const handleSubmit = (e) => {
        HeroRegistration()
        // const form = e.currentTarget;
        // // e.preventDefault();
        // if (form.checkValidity() === false) {
        //     e.stopPropagation()
        // }
        // else {
        //     HeroRegistration()
        // }
        // setValidated(true)
    }
    const width = window.innerWidth;

    return (
        <React.Fragment>
            {(ApiError === false) ? '' : (
                <Toast onClose={() => setApiError(false)} show={ApiError} delay={8000} autohide className="success_tost_position bg-warning">
                    <Toast.Header>
                        <strong className="mr-auto">something went wrong</strong>
                    </Toast.Header>
                    <Toast.Body>please try again</Toast.Body>
                </Toast>
            )}
            <h6 className="text-center mb-5 py-4 text-white bg-danger d-lg-none d-xs"> <span className="mr-3">&#8592;</span> Fill the form to become a POSP</h6>
            <Container>
                <h1 className="text-center text-danger my-5 d-none d-lg-block">Fill the form to become a POSP </h1>
                <div className="heroBorder mb-5">
                    {/* <Form className="heroBorder mb-5" noValidate validated={validated} > */}
                    <Form.Text className="text-danger text-right mb-3">
                        all fields are mandatory *
                    </Form.Text>
                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">Your Full Name</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="py-4 pl-4"
                            value={name}
                            onChange={(e) => {
                                const re = /^[a-z A-Z\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setName(e.target.value)
                                }
                            }
                            }
                            required={true}
                            ref={nameRef}
                        />
                        <p className="errorMsg">{errors.name}</p>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">Email Address</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="Your Email Address"
                            className="py-4 pl-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)
                            }
                            required={true}
                            ref={emailRef}
                        />
                        <p className="errorMsg">{errors.email}</p>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">Mobile Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your Mobile Number"
                            className="py-4 pl-4"
                            value={mobile}
                            maxLength="10"
                            minLength="10"
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setMobile(e.target.value)
                                }
                            }
                            }
                            required={true}
                            ref={mobileRef}
                        />
                        <p className="errorMsg">{errors.mobile}</p>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">Aadhaar Number</Form.Label>
                        <Form.Control
                            name="adhar"
                            type="text"
                            placeholder="Aadhaar Card Number"
                            className="py-4 pl-4"
                            value={adhar}
                            maxLength="12"
                            minLength="12"
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setAdhar(e.target.value)
                                }
                            }
                            }
                            required={true}
                            ref={adharRef}
                        />
                        <p className="errorMsg">{errors.adhar}</p>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">Pan Number</Form.Label>
                        <Form.Control
                            name="pancard"
                            type="text"
                            placeholder="Pan Card Number"
                            className="py-4 pl-4"
                            value={pan}
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => {
                                const re = /^[A-Za-z0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setPan(e.target.value.toUpperCase())
                                }
                            }
                            }
                            required={true}
                            ref={panRef}
                        />
                        <p className="errorMsg">{errors.pan}</p>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">Date of Birth</Form.Label>
                        <Form.Control
                            name="dob"
                            type="text"
                            placeholder="dd/mm/yyyy"

                            // placeholder="Date of Birth"
                            className="py-4 pl-4"
                            value={dob}
                            maxLength={10}
                            minLength={10}
                            onChange={handleChange}
                            onKeyDown={keyPressFunc}
                            required={true}
                            ref={dobRef}
                        />
                        <p className="errorMsg">{errors.dob}</p>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">Address</Form.Label>
                        <Form.Control
                            name="address"
                            type="text"
                            placeholder="Address"
                            className="py-4 pl-4"
                            value={address}
                            onChange={(e) => {
                                const re = /^[-,./ a-z A-Z 0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setAddress(e.target.value)
                                }
                            }
                            }
                            required={true}
                            ref={addressRef}
                        />
                        <p className="errorMsg">{errors.address}</p>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">State</Form.Label>
                        <Form.Control as="select" size="lg" className="heroSelect"
                            value={states}
                            onChange={(e) => (setStates(e.target.value, handleCityList(e.target.value)))}
                            required={true}
                            defaultValue="Select State"
                            ref={stateRef}
                        >
                            {states ? <option disabled>{states}</option> : <option value="">Select State</option>}
                            {/* <option value="">Select State</option> */}
                            {stateList.map((item, index) => (
                                <option key={index} value={item.state}> {item.state} </option>
                            )
                            )}
                        </Form.Control>
                        <p className="errorMsg">{errors.states}</p>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">City</Form.Label>
                        <Form.Control as="select" size="lg" className="heroSelect"
                            value={city}
                            onChange={(e) => (setCity(e.target.value))}
                            required={true}
                            defaultValue="Select City"
                            ref={cityRef}
                        >
                            {city ? <option disabled>{city}</option> : <option value="">Select City</option>}
                            {/* <option value="">Select City</option> */}
                            {cityList.map((item, index) => (
                                <option key={index} value={item.label}> {item.value} </option>
                            )
                            )}
                        </Form.Control>
                        <p className="errorMsg">{errors.city}</p>
                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label className="floating-label position-absolute ml-4 px-2 text-danger">Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Pincode"
                            className="py-4 pl-4"
                            value={pinCode}
                            minLength="6"
                            maxLength="6"
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setPinCode(e.target.value)
                                }
                            }
                            }
                            required={true}
                            ref={pinCodeRef}
                        />
                        <p className="errorMsg">{errors.pinCode}</p>
                    </Form.Group>
                    <OverlayTrigger
                        placement="bottom"
                        show={checkBox === false}
                        overlay={(
                            <Popover>
                                <Popover.Title as="h3" className="errorMsg">
                                    Required!
                                </Popover.Title>
                                <Popover.Content>
                                    Please check this box if you want to proceed
                                </Popover.Content>
                            </Popover>
                        )}>
                        <Form.Group className="d-flex justify-content-center mb-0">

                            <Form.Check className="heroCheck"
                                checked
                                value={checkBox}
                                onChange={(e) => { setCheckBox(e.target.value) }}
                                required={true}
                            />
                            <Form.Label className="text-dark mt-2 heroCheckFs" >
                                I agree to the <Link to="/terms" className="text-danger"> Terms and Conditions</Link>
                            </Form.Label>
                        </Form.Group>

                    </OverlayTrigger>
                    {/* <div className="ml-5 pl-5">
                        {checkBox === false ? <p className="errorMsg">CheckBox is required</p> : ''}
                    </div> */}

                    {/* <button className="heroBtn my-4" type="submit" >Next</button> */}
                    {/* <button className="heroBtn my-4" type="submit" >Apply Now</button> */}


                    {checkBox === false ?
                        <div className="heroBtn_mt">
                            <button className="heroBtn my-4" onClick={() => handleSubmit()} type="button" disabled={checkBox === false}>Register</button>
                        </div>
                        :
                        <button className="heroBtn my-4" onClick={() => handleSubmit()} >Register</button>
                    }

                </div>

            </Container>

            <Modal show={show} className="p-0" centered>
                <Modal.Body className=" text-center">
                    {!applied ?
                        <>
                            <img src="/images/heroCheck.png" alt="check" height={80} className="my-3" />
                            <h1 className="my-4">Thank You!!</h1>
                            <p className="m-4">
                                We are reviewing your information, you will be connected via call or email.
                            </p>
                            <button className="border-0 bg-danger text-white w-25 py-2 fs-6 fw-bold mt-4 mb-2" onClick={() => history.push('/')}  >Ok</button>
                        </> :
                        <>
                            <img src="/images/heroCheck.png" alt="check" height={80} className="my-3" />
                            <h5 className="my-4">You have already applied</h5>
                            <p className="my-4 mx-3">
                                {width > 768 ?
                                    <>
                                        if you have any issue please <Link to="/contact">conatct us.</Link>
                                    </>
                                    :
                                    <>
                                        if you have any issue please
                                        <br />
                                        <Link to="/contact">conatct us.</Link>
                                    </>
                                }
                            </p>
                            <button className="border-0 bg-danger text-white py-2 px-3  fw-bold mt-4 mb-2" onClick={() => history.push('/')}  >Go to Dashboard</button>
                        </>
                    }
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default HeroRegistrationForm