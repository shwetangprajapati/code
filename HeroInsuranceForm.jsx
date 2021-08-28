import React, { useEffect, useMemo, useState } from 'react'
import { Modal, Col, Container, Form, Row, Toast } from "react-bootstrap";
import Loader from 'react-loader-spinner';
import Dropzone, { useDropzone } from 'react-dropzone';
import { FaEdit } from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function HeroInsuranceForm() {
    let pdfFileFormats = ['pdf']

    const history = useHistory();
    const [show, setShow] = useState(false);
    function homePage() {
        history.push('/')
        setShow(false)
    }

    const [profileImg, setProfileImg] = useState('')
    const [profileImgErr, setProfileImgErr] = useState('')
    const [profileData, setProfileData] = useState('')
    const [infoData, setInfoData] = useState('')
    const [picLoading, setPicLoading] = useState(true);

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [pan, setPan] = useState('')
    const [adhar, setAdhar] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pinCode, setPinCode] = useState('')

    const [panErr, setPanErr] = useState('');
    const [adharErr, setAdharErr] = useState('');

    const [dob, setDob] = useState('')
    const [address, setAddress] = useState('')
    const [bName, setBName] = useState('')
    const [aCNumber, setACNumber] = useState('')
    const [bankName, setBankName] = useState('')
    const [branch, setBranch] = useState('')
    const [iFSC, setIFSC] = useState('')
    const [userName, setUserName] = useState('')

    // const [educationUpload, setEducationUpload] = useState(null)
    // const [chequeUpload, setChequeUpload] = useState(null)
    // const [PanUpload, setPanUpload] = useState(null)
    // const [adharFrontUpload, setAdharFrontUpload] = useState(null)
    // const [AdharBackUpload, setAdharBackUpload] = useState(null)
    // const [termsConditionUpload, setTermsConditionUpload] = useState(null)

    const [educationImgUrl, setEducationImgUrl] = useState('')
    const [chequeImgUrl, setChequeImgUrl] = useState('')
    const [PanUrl, setPanUrl] = useState('')
    const [adharFrontUrl, setAdharFrontUrl] = useState('')
    const [AdharBackUrl, setAdharBackUrl] = useState('')
    // const [termsConditionUrl, setTermsConditionUrl] = useState('')

    const [showToast, setShowToast] = useState(false);
    const [successHeading, setsuccessHeading] = useState('');
    const [successDescription, setsuccessDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);
    // const [loading5, setLoading5] = useState(false);
    const [fileErr, setFileError] = useState({
        education: '',
        cheque: '',
        panCard: '',
        adharFront: '',
        adharBack: '',
    })
    const [validated, setValidated] = useState(false);
    const [validated2, setValidated2] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!cookies.get('USERID')) {
            history.push('/hero-insurance')
        } else {
            getInfoData()
            fetchUserProfileData()
        }
    }, []);

    const onChangeFile = event => {
        const imageFile = event.target.files[0];

        if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
            setProfileImgErr('Please select only jpg/jpeg/png.');
            // return false;
        }
        else {
            handleProfilePicUpload(imageFile)
        }
    }

    const handleProfilePicUpload = async (file) => {
        setPicLoading(true)
        var formdata = new FormData();
        formdata.append("identifier", cookies.get('USERNAME'));
        formdata.append("upload_type", "profile_pic");
        formdata.append("file_uploads", file);

        await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_PUT_FILE, {
            method: 'POST',
            headers: {
                'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN

            },
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                setProfileImg(result.data.pic_upload_url);
                setPicLoading(false)
            })
            .catch(error => console.log('error', error));
    }


    const fetchUserProfileData = async () => {

        await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_GET_PROFILE_STATUS, {
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
                setProfileData(res.data.members)
                setDob(res.data.si.dob)
                setAddress(res.data.si.address, res.data.si.address2)
                setBName(res.data.members.ac_name)
                setACNumber(res.data.members.ac_number)
                setBankName(res.data.members.bank_name)
                setBranch(res.data.members.branch)
                setIFSC(res.data.members.ifsc)
                setUserName(res.data.members.username)
                setPicLoading(false);
            });
    }

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
                setName(result.data.hero_form.FullName)
                setMobile(result.data.hero_form.Mobile)
                setEmail(result.data.hero_form.Email)
                setPan(result.data.hero_form.pan_no)
                setAdhar(result.data.hero_form.aadhar_no)
                setCity(result.data.hero_form.City)
                setState(result.data.hero_form.State)
                setPinCode(result.data.hero_form.Pincode)

                setInfoData(result.data.hero_form)

                setDob(result.data.hero_form.dob)
                setAddress(result.data.hero_form.AddressLine)
                setBName(result.data.hero_form.ac_name)
                setACNumber(result.data.hero_form.account_number)
                setBankName(result.data.hero_form.bank_name)
                setBranch(result.data.hero_form.bank_branch)
                setIFSC(result.data.hero_form.ifsc_code)

                setEducationImgUrl(result.data.hero_form.education_certificate)
                setChequeImgUrl(result.data.hero_form.cancel_cheque)
                setPanUrl(result.data.hero_form.pan_card_img)
                setAdharFrontUrl(result.data.hero_form.aadhar_front)
                setAdharBackUrl(result.data.hero_form.aadhar_back)
                // setTermsConditionUrl(result.data.hero_form.terms_and_condition)
            })
    }


    const formValidation = () => {
        const panErr = {};
        const adharErr = {};
        let errors = {};
        let isValid = true;

        // Profile Pic
        if (profileData.profilepicture === '' || profileData.profilepicture === '0') {
            errors.profileData = "Profile pic is required"
            isValid = false;
        }
        // name
        if (name === '') {
            errors.name = "Name is required"
            isValid = false;
        }
        // Mobile
        if (mobile === '') {
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
        const adharRegex = /[0-9]{12}$/;
        if (adhar === '') {
            adharErr.adharerror = "Aadhar Number is required"
            isValid = false
        } else if (!adharRegex.test(adhar)) {
            adharErr.adharerror = "Invalid Aadhar Number"
            isValid = false;
        }
        // Pan Card
        const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (pan === '') {
            panErr.panerror = "Pan Card Number is required"
            isValid = false;
        } else if (!regex.test(pan)) {
            panErr.panerror = "Invalid Pan Card Number"
            isValid = false;
        }
        setAdharErr(adharErr)
        setPanErr(panErr);
        setErrors(errors)
        return isValid;
    }

    const updateInfo = (e) => {
        // e.preventDefault();
        if (formValidation()) {
            fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_HERO_STEP2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': process.env.REACT_APP_BUYER_AUTH_TOKEN,
                },
                body: JSON.stringify({
                    "userid": cookies.get('USERID'),
                    "ID": infoData.ID,
                    "advisor_id": infoData.advisor_id,
                    "name": name,
                    "mobile": mobile,
                    "email": email,
                    "city": city,
                    "state": state,
                    "pincode": pinCode,
                    "pan_no": pan,
                    "aadhar_no": adhar,
                    "profile_picture": profileData.profilepicture,
                    "username": userName

                })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === "success") {
                        setShowToast(true)
                        setsuccessHeading('SUCCESS!');
                        setsuccessDescription('Data has been updated successfully.');
                    }
                })
        }
    }

    const formValidation2 = () => {
        const panErr = {};
        const adharErr = {};
        let errors = {};
        let isValid = true;


        // Profile Pic
        if (profileData.profilepicture === '' || profileData.profilepicture === '0') {
            errors.profileData = "Profile pic is required"
            isValid = false;
        }
        // name
        if (name === '') {
            errors.name = "Name is required"
            isValid = false;
        }
        // Mobile
        if (mobile === '') {
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
        const adharRegex = /[0-9]{12}$/;
        if (adhar === '') {
            // isValid = true
        } else if (!adharRegex.test(adhar)) {
            adharErr.adharerror = "Invalid Aadhar Number"
            isValid = false;
        }
        // Pan Card
        const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (pan === '') {
            // isValid = false
        } else if (!regex.test(pan)) {
            panErr.panerror = "Invalid Pan Card Number"
            isValid = false;
        }
        // dob
        if (dob === '') {
            isValid = false;
            errors.dob = "Date of Birth is required"
        }
        // address
        if (address === '') {
            isValid = false;
            errors.address = "Address is required"
        }
        // pinCode
        if (pinCode === '') {
            isValid = false;
            errors.pinCode = "Pincode is required"
        } else if (pinCode.length !== 6) {
            errors.pinCode = "Please enter 6 digit number"
            isValid = false;
        }
        // Beneficiary Name
        if (bName === '') {
            isValid = false;
            errors.bName = "Beneficiary Name is required"
        }
        // Account Number
        if (aCNumber === '') {
            isValid = false;
            errors.aCNumber = "Bank Account Number is required"
        } else if (!aCNumber.match(/^\d{9,18}$/)) {
            errors.aCNumber = "Invalid Account Number"
            isValid = false;
        }
        // Bank Name
        if (bankName === '') {
            isValid = false;
            errors.bankName = "Bank Name is required"
        }
        // Bank Branch
        if (branch === '') {
            isValid = false;
            errors.branch = "Bank Branch is required"
        }
        // IFSC Code
        if (iFSC === '') {
            isValid = false;
            errors.iFSC = "IFSC code is required"
        } else if (!iFSC.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
            errors.iFSC = "Invalid IFSC Code"
            isValid = false;
        }

        if (!educationImgUrl) {
            errors.educationImgUrl = 'required';
            isValid = false;
        }
        if (!chequeImgUrl) {
            errors.chequeImgUrl = 'required';
            isValid = false;
        }
        if (!PanUrl) {
            errors.PanUrl = 'required';
            isValid = false;
        }
        if (!adharFrontUrl) {
            errors.adharFrontUrl = 'required';
            isValid = false;
        }
        if (!AdharBackUrl) {
            errors.AdharBackUrl = 'required';
            isValid = false;
        }
        // if (!termsConditionUrl) {
        //     errors.termsConditionUrl = 'required';
        //     isValid = false;
        // }
        setAdharErr(adharErr)
        setPanErr(panErr);
        setErrors(errors)
        return isValid;
    }
    const updatePersonalInfo = (e) => {
        if (formValidation2()) {
            fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_HERO_STEP2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': process.env.REACT_APP_BUYER_AUTH_TOKEN,
                },
                body: JSON.stringify({
                    "userid": cookies.get('USERID'),
                    "ID": infoData.ID,
                    "advisor_id": infoData.advisor_id,
                    "name": name,
                    "mobile": mobile,
                    "email": email,
                    "city": city,
                    "state": state,
                    "pincode": pinCode,
                    "pan_no": pan,
                    "aadhar_no": adhar,
                    "profile_picture": profileData.profilepicture,
                    "username": userName,
                    "dob": dob,
                    "AddressLine": address,
                    "beneficiary_name": bName,
                    "account_number": aCNumber,
                    "bank_name": bankName,
                    "bank_branch": branch,
                    "ifsc_code": iFSC,
                    "pan_card_img": PanUrl,
                    "aadhar_front": adharFrontUrl,
                    "aadhar_back": AdharBackUrl,
                    "education_certificate": educationImgUrl,
                    "cancel_cheque": chequeImgUrl,
                    // "terms_and_condition": termsConditionUrl
                })
            })
                .then(response => response.json())
                .then(result => {
                    // console.log(result)

                    if (result.status === "success") {
                        getInfoData()
                        setShow(true)
                    }
                })
        }
    }

    // onChange for Education Upload File
    const onChangeEducation = event => {
        const imageFile = event.target.files[0];
        if (!imageFile.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            setFileError({ education: 'Please select only jpg/jpeg/png/pdf.' });
        }
        else {
            educationCertificate(imageFile)
        }
    }
    // onChange for Cheque Upload File
    const onChangeCheque = event => {
        const imageFile = event.target.files[0];
        if (!imageFile.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            setFileError({ cheque: 'Please select only jpg/jpeg/png/pdf.' });
        }
        else {
            cancelledCheque(imageFile)
        }
    }
    // onChange for PanCard Upload File
    const onChangePanCARD = event => {
        const imageFile = event.target.files[0];
        if (!imageFile.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            setFileError({ panCard: 'Please select only jpg/jpeg/png/pdf.' });
        }
        else {
            panCARD(imageFile)
        }
    }
    // onChange for Adhar Front Upload File
    const onChangeAadharCardFront = event => {
        const imageFile = event.target.files[0];
        if (!imageFile.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            setFileError({ adharFront: 'Please select only jpg/jpeg/png/pdf.' });
        }
        else {
            aadharCardFront(imageFile)
        }
    }
    // onChange for Adhar Back Upload File
    const onChangeAadharCardBack = event => {
        const imageFile = event.target.files[0];
        if (!imageFile.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            setFileError({ adharBack: 'Please select only jpg/jpeg/png/pdf.' });
        }
        else {
            aadharCardBack(imageFile)
        }
    }

    // function for EducationCertificate
    const educationCertificate = async (files) => {
        setLoading(true)
        var formdata = new FormData();
        formdata.append("userid", cookies.get("USERID"));
        formdata.append("file_uploads", files);

        await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SELLER_KYC_FILE_API, {
            method: 'POST',
            headers: {
                'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN

            },
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                let imageData = result.data;
                let imageUrl = imageData.path;
                setEducationImgUrl(imageUrl);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }
    // function for Cancelled Cheque
    const cancelledCheque = async (files) => {
        setLoading1(true)
        var formdata = new FormData();
        formdata.append("userid", cookies.get("USERID"));
        formdata.append("file_uploads", files);

        await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SELLER_KYC_FILE_API, {
            method: 'POST',
            headers: {
                'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN

            },
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                let imageData = result.data;
                let imageUrl = imageData.path;
                setChequeImgUrl(imageUrl);
                setLoading1(false)
            })
            .catch(error => console.log('error', error));
    }
    // function for PAN Card
    const panCARD = (files) => {
        setLoading2(true)
        var formdata = new FormData();
        formdata.append("userid", cookies.get("USERID"));
        formdata.append("file_uploads", files);

        fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SELLER_KYC_FILE_API, {
            method: 'POST',
            headers: {
                'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN

            },
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                let imageData = result.data;
                let imageUrl = imageData.path;
                setPanUrl(imageUrl);
                setLoading2(false)
            })
            .catch(error => console.log('error', error));
    }
    // function for Aadhar Card Front
    const aadharCardFront = async (files) => {
        setLoading3(true)
        var formdata = new FormData();
        formdata.append("userid", cookies.get("USERID"));
        formdata.append("file_uploads", files);

        await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SELLER_KYC_FILE_API, {
            method: 'POST',
            headers: {
                'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN

            },
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                let imageData = result.data;
                let imageUrl = imageData.path;
                setAdharFrontUrl(imageUrl);
                setLoading3(false)
            })
            .catch(error => console.log('error', error));
    }
    // function for Aadhar Card Back
    const aadharCardBack = async (files) => {
        setLoading4(true)
        var formdata = new FormData();
        formdata.append("userid", cookies.get("USERID"));
        formdata.append("file_uploads", files);

        await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SELLER_KYC_FILE_API, {
            method: 'POST',
            headers: {
                'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN

            },
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                let imageData = result.data;
                let imageUrl = imageData.path;
                setAdharBackUrl(imageUrl);
                setLoading4(false)
            })
            .catch(error => console.log('error', error));
    }
    // function for Terms & Condition
    // const termsCondition = async (files) => {
    //     setLoading5(true)
    //     var formdata = new FormData();
    //     formdata.append("userid", cookies.get("USERID"));
    //     formdata.append("file_uploads", files);

    //     await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SELLER_KYC_FILE_API, {
    //         method: 'POST',
    //         headers: {
    //             'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN

    //         },
    //         body: formdata,
    //         redirect: 'follow'
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             let imageData = result.data
    //             let imageUrl = imageData.path
    //             setTermsConditionUrl(imageUrl)
    //             setLoading5(false)
    //         })
    //         .catch(error => console.log('error', error))
    // }

    const handleSubmit1 = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation()
        }
        else {
            updateInfo()
        }
        setValidated(true)
    }
    const handleSubmit2 = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation()
        }
        else {
            updatePersonalInfo()
        }
        setValidated(true)
        setValidated2(true)
    }

    return (
        <div>
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} className="success_tost_position" autohide>
                <Toast.Header>
                    <strong className="mr-auto">{successHeading}</strong>
                </Toast.Header>
                <Toast.Body>{successDescription}</Toast.Body>
            </Toast>
            <Container>
                <Form.Text className="text-danger mt-5 text-right position-absulote mb-n4">
                    all fields are mandatory *
                </Form.Text>
                <Row className="border bg-white mt-5  py-3">
                    <Col md={3}>
                        <div className="border heroCenter m-4 py-2">
                            {(picLoading === true) ? (
                                <Loader type="ThreeDots" color="#0099cc" height={100} width={100} className="profile_picture text-center" />
                            ) :
                                profileImg ? <img src={profileImg} alt={profileData.username} width={120} height={120} /> :
                                    profileData.profilepicture === '' || profileData.profilepicture === '0' ?
                                        <div className="menuDashboardHeading heroPosition">
                                            {profileData.username.charAt(0).toUpperCase()}
                                        </div>
                                        :
                                        <img src={profileData.profilepicture} alt="user profile"
                                            width={120}
                                            height={120}
                                            className=""
                                        />

                            }

                            <input
                                type="file"
                                id="upload-profile-pic"
                                className="d-none"
                                accept="image/jpeg,image/jpg,image/png,"
                                onChange={onChangeFile}
                            />
                            <div>
                                <label htmlFor="upload-profile-pic" className="btn mt-4 bg-secondary text-white px-3 p-0">Edit Profile</label>
                                <p className="errorMsg mt-2">{errors.profileData || profileImgErr}</p>
                            </div>
                        </div>

                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={4}>
                                <Form validated={validated}>
                                    <Form.Group>
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            // onChange={(e) => setName(e.target.value)}
                                            onChange={(e) => {
                                                const re = /^[a-z A-Z\b]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setName(e.target.value)
                                                }
                                            }
                                            }
                                            required={true}
                                        />
                                    </Form.Group>
                                    <p className="errorMsg">{errors.name}</p>
                                </Form>
                            </Col>
                            <Col md={4}>
                                <Form validated={validated}>
                                    <Form.Group>
                                        <Form.Label>Mobile No.</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={mobile}
                                            // onChange={(e) => setMobile(e.target.value)}
                                            disabled
                                            onChange={(e) => {
                                                const re = /^[0-9\b]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setMobile(e.target.value)
                                                }
                                            }
                                            }
                                            required={true}
                                        />
                                    </Form.Group>
                                    <p className="errorMsg">{errors.mobile}</p>
                                </Form>
                            </Col>
                            <Col md={4}>
                                <Form validated={validated}>
                                    <Form.Group>
                                        <Form.Label>Email Id</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required={true}
                                        />
                                    </Form.Group>
                                    <p className="errorMsg">{errors.email}</p>
                                </Form>
                            </Col>
                            <Col md={4}>
                                <Form validated={validated}>
                                    <Form.Group>
                                        <Form.Label>PAN Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={pan}
                                            onChange={(e) => setPan(e.target.value.toUpperCase())}
                                            required={true}
                                        />
                                    </Form.Group>
                                    {Object.keys(panErr).map((item, i) => {
                                        return <div key={i} className="errorMsg" >{panErr[item]}</div>
                                    })}
                                </Form>
                            </Col>
                            <Col md={4}>
                                <Form validated={validated}>
                                    <Form.Group>
                                        <Form.Label>Aadhar Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={adhar}
                                            maxLength={12}
                                            onChange={(e) => {
                                                const re = /^[0-9\b]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setAdhar(e.target.value)
                                                }
                                            }
                                            }
                                            required={true}
                                        />
                                    </Form.Group>
                                    {Object.keys(adharErr).map((item, i) => {
                                        return <div key={i} className="errorMsg" >{adharErr[item]}</div>
                                    })}
                                </Form>
                            </Col>
                            <Col md={4}>

                            </Col>
                            <Col md={4}>
                                <div className="mt-5">
                                    <button onClick={handleSubmit1} className="text-white py-2 w-50 bg-secondary border-0">Update Info</button>
                                </div>
                            </Col>

                        </Row>
                    </Col>
                </Row>


                <Row className="mt-4 border py-3">

                    <Col md={3} >
                        <h5>Personal Details</h5>
                        <Form className="pt-3" validated={validated2} >
                            <Form.Group>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="DD/MM/YYYY"
                                    value={dob === "null" ? "" : dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required={true}
                                />
                                <p className="errorMsg">{errors.dob}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Communication Address"
                                    value={address === "null" ? "" : address}
                                    // onChange={(e) => setAddress(e.target.value)}
                                    onChange={(e) => {
                                        const re = /^[-,./ a-z A-Z 0-9\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setAddress(e.target.value)
                                        }
                                    }
                                    }
                                    required={true}
                                />
                                <p className="errorMsg">{errors.address}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={pinCode}
                                    // onChange={(e) => setPinCode(e.target.value)}
                                    onChange={(e) => {
                                        const re = /^[0-9\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setPinCode(e.target.value)
                                        }
                                    }
                                    }
                                    required={true}
                                />
                                <p className="errorMsg">{errors.pinCode}</p>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={3} >
                        <h5>Payout Details</h5>
                        {/* <Form.Group>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={bName}
                                    onChange={(e) => setBName(e.target.value)}
                                    required={true}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Communication Address"
                                    value={address === "null" ? "" : address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required={true}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                    required={true}
                                />
                            </Form.Group> */}
                        <Form className="pt-3" validated={validated2}>
                            <Form.Group>
                                <Form.Label>Beneficiary Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={bName === "null" ? "" : bName}
                                    // onChange={(e) => setBName(e.target.value)}
                                    onChange={(e) => {
                                        const re = /^[a-z A-Z\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setBName(e.target.value)
                                        }
                                    }
                                    }
                                    required={true}
                                />
                                <p className="errorMsg">{errors.bName}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Saving Account Number</Form.Label>
                                <Form.Control type="text"
                                    value={aCNumber === "null" ? "" : aCNumber}
                                    maxLength={18}
                                    // onChange={(e) => setACNumber(e.target.value)}
                                    onChange={(e) => {
                                        const re = /^[0-9\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setACNumber(e.target.value)
                                        }
                                    }
                                    }
                                    required={true}
                                />
                                <p className="errorMsg">{errors.aCNumber}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Bank Name</Form.Label>
                                <Form.Control type="text"
                                    value={bankName === "null" ? "" : bankName}
                                    // onChange={(e) => setBankName(e.target.value)}
                                    onChange={(e) => {
                                        const re = /^[a-z A-Z\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setBankName(e.target.value)
                                        }
                                    }
                                    }
                                    required={true}
                                />
                                <p className="errorMsg">{errors.bankName}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Bank Branch</Form.Label>
                                <Form.Control type="text"
                                    value={branch === "null" ? "" : branch}
                                    // onChange={(e) => setBranch(e.target.value)}
                                    onChange={(e) => {
                                        const re = /^[a-z A-Z\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setBranch(e.target.value)
                                        }
                                    }
                                    }
                                    required={true}
                                />
                                <p className="errorMsg">{errors.branch}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>IFSC Code</Form.Label>
                                <Form.Control type="text"
                                    value={iFSC === "null" ? "" : iFSC}
                                    maxLength={11}
                                    // onChange={(e) => setIFSC(e.target.value)}
                                    onChange={(e) => {
                                        const re = /^[A-Z0-9\b]+$/;
                                        if (e.target.value.toUpperCase() === '' || re.test(e.target.value.toUpperCase())) {
                                            setIFSC(e.target.value.toUpperCase())
                                        }
                                    }
                                    }
                                    required={true}
                                />
                                <p className="errorMsg">{errors.iFSC}</p>
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col md={6} >
                        <h5>File Accept Only(.jpg, .jpeg, .pdf): Max File Size(2 MB)</h5>

                        <Row className="pt-3">
                            <Col xs={6}>Highest Education Certificate</Col>
                            <Col xs={3}>
                                <input
                                    type="file"
                                    id="upload-button"
                                    className="d-none"
                                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                                    onChange={onChangeEducation}
                                />
                                <label htmlFor="upload-button" className="btn p-0">Upload</label>

                            </Col>

                            <Col xs={3}>
                                {loading === true ?
                                    <Loader type="Oval" color="#0099cc" height={30} width={30} className="profile_picture text-center" /> :
                                    educationImgUrl ? <>
                                        <div className="d-flex">

                                            {((pdfFileFormats.find(element => element === educationImgUrl.split('.').pop()) ? (
                                                <a href={educationImgUrl} target="_blank" >
                                                    <img src="/images/default_png_image.png" alt="pdf" width={50} height={50} />
                                                </a>) :
                                                <a href={educationImgUrl} target="_blank">
                                                    <img src={educationImgUrl} width={50} height={50} />
                                                </a>
                                            ))}

                                            <div className="position-absolute btn p-0 ml-4" onClick={() => { setEducationImgUrl('') }}>
                                                &#10060;
                                            </div>

                                        </div>
                                    </>
                                        : <p className="errorMsg">{fileErr.education ? fileErr.education : errors.educationImgUrl}</p>
                                }
                            </Col>
                        </Row>

                        <Row className="pt-3">
                            <Col xs={6}>Cancelled Cheque</Col>
                            <Col xs={3}>
                                <input
                                    type="file"
                                    id="upload-button1"
                                    className="d-none"
                                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                                    onChange={onChangeCheque}
                                />
                                <label htmlFor="upload-button1" className="btn p-0">Upload</label>

                            </Col>

                            <Col xs={3}>
                                {loading1 === true ?
                                    <Loader type="Oval" color="#0099cc" height={30} width={30} className="profile_picture text-center" /> :
                                    chequeImgUrl ?
                                        <div className="d-flex">
                                            {((pdfFileFormats.find(element => element === chequeImgUrl.split('.').pop()) ? (
                                                <a href={chequeImgUrl} target="_blank" >
                                                    <img src="/images/default_png_image.png" alt="pdf" width={50} height={50} />
                                                </a>) :
                                                <a href={chequeImgUrl} target="_blank">
                                                    <img src={chequeImgUrl} width={50} height={50} />
                                                </a>
                                            ))}
                                            <div className="position-absolute btn p-0 ml-4" onClick={() => { setChequeImgUrl('') }}>
                                                &#10060;
                                            </div>
                                        </div> : <p className="errorMsg">{fileErr.cheque ? fileErr.cheque : errors.chequeImgUrl}</p>
                                }
                            </Col>
                        </Row>

                        <Row className="pt-3">
                            <Col xs={6}>PAN Card</Col>
                            <Col xs={3}>
                                <input type="file"
                                    id="upload-button3"
                                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                                    onChange={onChangePanCARD}
                                    className="d-none"
                                />
                                <label htmlFor="upload-button3" className="btn p-0">Upload</label>

                            </Col>

                            <Col xs={3}>
                                {loading2 === true ?
                                    <Loader type="Oval" color="#0099cc" height={30} width={30} className="profile_picture text-center" /> :
                                    PanUrl ?
                                        <div className="d-flex">
                                            {((pdfFileFormats.find(element => element === PanUrl.split('.').pop()) ? (
                                                <a href={PanUrl} target="_blank" >
                                                    <img src="/images/default_png_image.png" alt="pdf" width={50} height={50} />
                                                </a>) :
                                                <a href={PanUrl} target="_blank">
                                                    <img src={PanUrl} width={50} height={50} />
                                                </a>
                                            ))}
                                            <div className="position-absolute btn p-0 ml-4" onClick={() => { setPanUrl('') }}>
                                                &#10060;
                                            </div>
                                        </div>
                                        : <p className="errorMsg">{fileErr.panCard ? fileErr.panCard : errors.PanUrl}</p>
                                }
                            </Col>
                        </Row>

                        <Row className="pt-3">
                            <Col xs={6}>Aadhar Card Front</Col>
                            <Col xs={3}>
                                <input
                                    type="file"
                                    id="upload-button4"
                                    className="d-none"
                                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                                    onChange={onChangeAadharCardFront}
                                />
                                <label htmlFor="upload-button4" className="btn p-0">Upload</label>

                            </Col>

                            <Col xs={3}>
                                {loading3 === true ?
                                    <Loader type="Oval" color="#0099cc" height={30} width={30} className="profile_picture text-center" /> :
                                    adharFrontUrl ?
                                        <div className="d-flex">
                                            {((pdfFileFormats.find(element => element === adharFrontUrl.split('.').pop()) ? (
                                                <a href={adharFrontUrl} target="_blank" >
                                                    <img src="/images/default_png_image.png" alt="pdf" width={50} height={50} />
                                                </a>) :
                                                <a href={adharFrontUrl} target="_blank">
                                                    <img src={adharFrontUrl} width={50} height={50} />
                                                </a>
                                            ))}
                                            <div className="position-absolute btn p-0 ml-4" onClick={() => { setAdharFrontUrl('') }}>
                                                &#10060;
                                            </div>
                                        </div> : <p className="errorMsg">{fileErr.adharFront ? fileErr.adharFront : errors.adharFrontUrl}</p>
                                }

                            </Col>
                        </Row>

                        <Row className="pt-3">
                            <Col xs={6}>Aadhar Card Back</Col>
                            <Col xs={3}>
                                <input
                                    type="file"
                                    id="upload-button5"
                                    className="d-none"
                                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                                    onChange={onChangeAadharCardBack}
                                />
                                <label htmlFor="upload-button5" className="btn p-0">Upload</label>

                            </Col>

                            <Col xs={3}>
                                {loading4 === true ?
                                    <Loader type="Oval" color="#0099cc" height={30} width={30} className="profile_picture text-center" /> :
                                    AdharBackUrl ?
                                        <div className="d-flex">
                                            {((pdfFileFormats.find(element => element === AdharBackUrl.split('.').pop()) ? (
                                                <a href={AdharBackUrl} target="_blank" >
                                                    <img src="/images/default_png_image.png" alt="pdf" width={50} height={50} />
                                                </a>) :
                                                <a href={AdharBackUrl} target="_blank">
                                                    <img src={AdharBackUrl} width={50} height={50} />
                                                </a>
                                            ))}
                                            <div className="position-absolute btn p-0 ml-4" onClick={() => { setAdharBackUrl('') }}>
                                                &#10060;
                                            </div>
                                        </div>
                                        : <p className="errorMsg">{fileErr.adharBack ? fileErr.adharBack : errors.AdharBackUrl}</p>
                                }
                            </Col>
                        </Row>

                        {/* <Row className="pt-3">
                            <Col xs={6}>Terms &amp; Condition</Col>
                            <Col xs={3}>
                                <input
                                    type="file"
                                    id="upload-button6"
                                    className="d-none"
                                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                                    onChange={(e) => termsCondition(e.target.files[0])}
                                />
                                <label htmlFor="upload-button6" className="btn p-0">Upload</label>
                                <p className="errorMsg">{errors.termsConditionUrl}</p>
                            </Col>
                            <Col xs={3}>
                                {loading5 === true ?
                                    <Loader type="Oval" color="#0099cc" height={30} width={30} className="profile_picture text-center" /> :
                                    termsConditionUrl ?
                                        <div className="d-flex">
                                            <img src={termsConditionUrl} width={50} height={50} />
                                            <div className="position-absolute btn p-0 ml-4" onClick={() => { setTermsConditionUrl('') }}>
                                                &#10060;
                                            </div>
                                        </div> : ''
                                }
                            </Col>
                        </Row> */}
                    </Col>
                </Row>
                <Row className="justify-content-center my-5">
                    <button onClick={handleSubmit2} className="btn-success w-25 py-3 border-0">Submit</button>
                </Row>
            </Container>
            <Modal show={show} className="p-0">
                <Modal.Body className=" text-center">
                    <img src="/images/heroCheck.png" alt="check" height={80} className="my-3" />
                    <h1 className="my-4">Registration <br /> Successful!!</h1>
                    <p>You have successfully registered to become a POSP with Hero Insurance Broking and you have
                        access to numerous benefits the platform provides. Detailed instructions have been sent
                        to your registered mobile number, kindly check your mobile message box for confirmation.
                        <br /> Thank You!
                    </p>
                    <button className="heroOkBtn mt-4 mb-2" onClick={homePage}  >Ok</button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default HeroInsuranceForm
