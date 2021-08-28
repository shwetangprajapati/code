import React, { useState } from 'react'
import classes from '../../pages/Seller/HeroInsuranceFormFinal.module.css';
import { Form, Container ,Modal,Toast} from 'react-bootstrap'
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom';
const cookies = new Cookies();
const HeroInsuranceFormFinal = () => {
    const history = useHistory();
    const [ApiError, setApiError] = useState(false);
    const [show, setShow] = useState(false);
    const uploadFile = async (files, fileType) => {
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
                if (fileType === "Passport_Size_Photo") {
                    setDocuments((documents) => ({ ...documents, profile_picture: imageUrl }));
                }
                else if (fileType === "Pan_Card") {
                    setDocuments((documents) => ({ ...documents, PanCard: imageUrl }));
                }
                else if (fileType === "Aadhaar_Front") {
                    setDocuments((documents) => ({ ...documents, AadhaarFront: imageUrl }));
                }
                else if (fileType === "Aadhaar_Back") {
                    setDocuments((documents) => ({ ...documents, AadhaarBack: imageUrl }));
                }
                else if (fileType === "Qualification") {
                    setDocuments((documents) => ({ ...documents, Qualification: imageUrl }));
                }
                else if (fileType === "Bank_Details") {
                    setDocuments((documents) => ({ ...documents, BankDetails: imageUrl }));
                }
            })
            .catch(error => console.log('error', error));
    }

    const [documents, setDocuments] = useState(
        {
            profile_picture:"",
            PanCard: "",
            AadhaarFront: "",
            AadhaarBack: "",
            Qualification: "",
            BankDetails: "",
        }
    );
    const [error, setError] = useState({});
    const formValidation = () => {
        let errors = {};
        console.log('validation')
        let isValid = true;
        if (!documents.profile_picture || documents.profile_picture === '') {
            errors.profile_picture = "Passport size photo is mandatory"
            isValid = false;
        }
        if (!documents.PanCard || documents.PanCard === '') {
            errors.PanCard = "Pan Card is mandatory"
            isValid = false;
        }
        if (!documents.AadhaarFront || documents.AadhaarFront === '') {
            errors.AadhaarFront = "Aadhaar Front is mandatory"
            isValid = false;
        }
        if (!documents.AadhaarBack || documents.AadhaarBack === '') {
            errors.AadhaarBack = "Aadhaar Back is mandatory"
            isValid = false;
        }
        if (!documents.Qualification || documents.Qualification === '') {
            errors.Qualification = "Highest Qualification Certificate is mandatory"
            isValid = false;
        }

        if (!documents.BankDetails || documents.BankDetails === '') {
            errors.BankDetails = "Cancelled Cheque Or Passbook is mandatory"
            isValid = false;
        }

        console.log(errors)
        setError(errors)
        return isValid;
    }
    const HeroRegistration = (e) => {
        if (formValidation()) {
            fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_HERO_ADVISOR_POST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': process.env.REACT_APP_BUYER_AUTH_TOKEN,
                },
                body: JSON.stringify({
                    "userid": cookies.get('USERID'),
                    "profile_picture":documents.profile_picture,
                    "pan_card_img" : documents.PanCard,
                    "aadhar_front" : documents.AadhaarFront,
                    "aadhar_back" : documents.AadhaarBack,
                    "education_certificate" : documents.Qualification,
                    "cancel_cheque" : documents.BankDetails
                })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'success') {
                        // history.push("/hero-insurance-posp-upload-docs")
                        // alert('success')
                        setShow(true)
                    } else {
                        setApiError(true)
                    }

                })
        }
    }
         console.log(documents);
        return (
        <>
        {(ApiError === false) ? '' : (
                <Toast onClose={() => setApiError(false)} show={ApiError} delay={8000} autohide className="success_tost_position bg-warning">
                    <Toast.Header>
                        <strong className="mr-auto">something went wrong</strong>
                    </Toast.Header>
                    <Toast.Body>please try again</Toast.Body>
                </Toast>
            )}
            <Container>
                <h1 className="text-center text-danger my-5 d-none d-lg-block">Upload the documents and complete the registration </h1>
                <div className="heroBorder mb-5">
                    {/ <Form className="heroBorder mb-5" noValidate validated={validated} > /}
                    <Form.Text className="text-danger text-right mb-3">
                        all fields are mandatory *
                    </Form.Text>

                    <Form.Group className="mb-5 position-relative" >
                        <Form.Label for="Passport_Size_Photo" className={classes.headings + " px-2 "}>Upload Passport Size Photo*</Form.Label>
                        <Form.Control
                            name="Passport_Size_Photo"
                            type="file"
                            className="py-3 pl-3 border border-muted"
                            required={true}
                            onChange={(e) => {  uploadFile(e.target.files[0], "Passport_Size_Photo") }}
                        />
                        <p className={classes.hero_form_error}>{error.profile_picture}</p>

                    </Form.Group>

                    <Form.Group className="mb-5 position-relative" >
                        <Form.Label for="Pan_Card" className={classes.headings + " px-2 "}>Upload Pan Card*</Form.Label>
                        <Form.Control
                            name="Pan_Card"
                            type="file"
                            className="py-3 pl-3 border border-muted"
                            required={true}
                            onChange={(e) => {  uploadFile(e.target.files[0], "Pan_Card") }}
                        />
                        <p className={classes.hero_form_error}>{error.PanCard}</p>

                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label for="Aadhaar_Front" className={classes.headings + " px-2 "}>Upload Aadhaar Front*</Form.Label>
                        <Form.Control
                            name="Aadhaar_Front"
                            type="file"
                            className="py-3 pl-3 border border-muted"
                            required={true}
                            onChange={(e) => {  uploadFile(e.target.files[0], "Aadhaar_Front") }}
                        />
                        <p className={classes.hero_form_error}>{error.AadhaarFront}</p>

                    </Form.Group>
                    <Form.Group className="mb-5 position-relative">
                        <Form.Label for="Aadhaar_Back" className={classes.headings + " px-2 "}>Upload Aadhaar Back*</Form.Label>
                        <Form.Control
                            name="Aadhaar_Back"
                            type="file"
                            className="py-3 pl-3 border border-muted"

                            required={true}
                            onChange={(e) => {  uploadFile(e.target.files[0], "Aadhaar_Back") }}
                        />
                        <p className={classes.hero_form_error}>{error.AadhaarBack}</p>

                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label for="Qualification" className={classes.headings + " px-2 "}>Upload Qualification Certificate(min 12th)*</Form.Label>
                        <Form.Control
                            name="Qualification"
                            type="file"
                            className="py-3 pl-3 border border-muted"
                            required={true}
                            onChange={(e) => { uploadFile(e.target.files[0], "Qualification") }}
                        />
                        <p className={classes.hero_form_error}>{error.Qualification}</p>

                    </Form.Group>

                    <Form.Group className="mb-5 position-relative">
                        <Form.Label for="Bank_Details" className={classes.headings + " px-2 "}>Upload Cancelled Cheque Or Passbook*</Form.Label>
                        <Form.Control
                            name="Bank_Details"
                            type="file"
                            className="py-3 pl-3 border border-muted"
                            required={true}
                            onChange={(e) => {  uploadFile(e.target.files[0], "Bank_Details") }}
                        />
                        <p className={classes.hero_form_error}>{error.BankDetails}</p>

                    </Form.Group>

                    <Form.Group className="d-flex justify-content-center mb-0">

                        <Form.Check className="heroCheck"
                            // checked
                            required={true}
                        />
                        <Form.Label className="text-dark mt-2 heroCheckFs" >
                            I agree to the <Link to="/" className="text-danger"> Terms and Conditions</Link>
                        </Form.Label>
                    </Form.Group>

                    <button className={classes.reg_button + " my-4"} type="submit" onClick={(e) => { e.preventDefault(); HeroRegistration() }}>Register</button>

                </div>
            </Container>
            <Modal show={show} className="p-0" centered>
                <Modal.Body className=" text-center">
                        <>
                            <img src="/images/heroCheck.png" alt="check" height={80} className="my-3" />
                            <h1 className="my-4">Thank You!!</h1>
                            <p className="m-4">
                                We are reviewing your information, you will be connected via call or email.
                            </p>
                            <button className="border-0 bg-danger text-white w-25 py-2 fs-6 fw-bold mt-4 mb-2" onClick={() => history.push('/')}  >Ok</button>
                        </> 
                    
                </Modal.Body>
            </Modal>
        
        </>
    )
}

export default HeroInsuranceFormFinal;