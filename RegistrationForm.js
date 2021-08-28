import React, { useState, useEffect, useRef } from 'react'
import { Container } from "react-bootstrap";
import classes from './RegistrationForm.module.css';
import { FaCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const RegistrationForm = () => {
    const ref = useRef(null);
    const history = useHistory();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [panCard, setPanCard] = useState(false);
    const [aaDhaar, setAaDhaar] = useState(false);
    const [disAbility, setDisAbility] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [twelth, setTwelth] = useState(false);
    const [diploma, setDiploma] = useState(false);
    const [undergraduate, setUndergraduate] = useState(false);
    const [graduate, setGraduate] = useState(false);
    const [postgraduate, setPostgraduate] = useState(false);
    const [years, setYears] = useState([]);
    // const [errors, setErrors] = useState('');
    useEffect(() => {
        for (var i = 1970; i <= 2022; i++) {
            const yearArr = years;
            yearArr.push(i);
            setYears(yearArr);
        }
    }, [])
    // Fetch State  list
    const fetchStateAndCity = async () => {
        await fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_GET_STATE_CITY, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN
            },
            body: JSON.stringify({
                "type": "state"
            }),
            redirect: 'follow',
        })
            .then(response => response.json())
            .then(result => {
                setStateList(result.data)
            })
            .catch(error => console.log('error', error));
    }
    // Fetch City list
    const handleCityList = (citydata) => {

        fetch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_GET_STATE_CITY, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Auth-Token': process.env.REACT_APP_SELLER_AUTH_TOKEN
            },
            body: JSON.stringify({
                "type": "city",
                "state": citydata
            }),
            redirect: 'follow',
        })
            .then(response => response.json())
            .then(result => {
                setCityList(result.data)
            })
            .catch(error => console.log('error', error));
    }
    let stateDropdown = stateList.map((item, index) => (
        <option key={index}>{item.state}</option>
    ));

    let cityDropdown = cityList.map((item, index) => (
        <option key={index}>{item.label}</option>
    ));
    useEffect(() => {
        fetchStateAndCity()
    }, [])
    const [error, setError] = useState({});
    const [candidateDetail, setCandidateDetail] = useState(
        {
            FirstName: "",
            LastName: "",
            Email: "",
            MobileNumber: "",
            DOB: "",
            Gender: "",
            MotherTongue: "",
            ReadingProficiency: "",
            SpeakingProficiency: "",
            ProficiencyLanguageL1: "",
            ProficiencyLanguageL2: "",
            Disability: "",
            TypeOfDisability: "",
            FullAddress: "",
            CurrentState: "",
            CurrentCity: "",
            Pincode: "",
            ResidingLocation: "",
            EducationType: "",
            SchoolBoard: "",
            Degree: "",
            YearOfPassing: "",
            ExperienceType: "",
            ExperienceMonths: "",
            ExperienceInSupport: "",
            WorkingStatus: "",
            CurrentCompensation: "",
            CurrentEmployer: "",
            NoticePeriod: "",
            ComfortCSASalaryRange: "",
            WillForOvertime: "",
            WillForRotationalShift: "",
            WillToInteract: "",
            WiredInternetConnection: "",
            SavingAccount: "",
            EmployedAtAmazon: "",
            PANCardNo: "",
            PanCardUrl: "",
            EAdhaarCardNo: "",
            AdhaarFrontUrl: "",
            AdhaarBackUrl: "",
            PassportSizeUrl: "",
        }
    )
    console.log(candidateDetail)

    const FirstNameRef = useRef(null);
    const LastNameRef = useRef(null);
    const EmailRef = useRef(null);
    const MobileNumberRef = useRef(null);
    const DOBRef = useRef(null);
    const GenderRef = useRef(null);
    const MotherTongueRef = useRef(null);
    const ReadingProficiencyRef = useRef(null);
    const SpeakingProficiencyRef = useRef(null);
    const DisabilityRef = useRef(null);
    const TypeOfDisabilityRef = useRef(null);
    const FullAddressRef = useRef(null);
    const CurrentStateRef = useRef(null);
    const CurrentCityRef = useRef(null);
    const PincodeRef = useRef(null);
    const ResidingLocationRef = useRef(null);
    const EducationTypeRef = useRef(null);
    const SchoolBoardRef = useRef(null);
    const DegreeRef = useRef(null);
    const YearOfPassingRef = useRef(null);
    const ExperienceTypeRef = useRef(null);
    const ExperienceMonthsRef = useRef(null);
    const ExperienceInSupportRef = useRef(null);
    const WorkingStatusRef = useRef(null);
    const CurrentCompensationRef = useRef(null);
    const CurrentEmployerRef = useRef(null);
    const NoticePeriodRef = useRef(null);
    const ComfortCSASalaryRangeRef = useRef(null);
    const WillForOvertimeRef = useRef(null);
    const WillForRotationalShiftRef = useRef(null);
    const WillToInteractRef = useRef(null);
    const WiredInternetConnectionRef = useRef(null);
    const SavingAccountRef = useRef(null);
    const EmployedAtAmazonRef = useRef(null);
    const PANCardNoRef = useRef(null);
    const PanCardUrlRef = useRef(null);
    const EAdhaarCardNoRef = useRef(null);
    const AdhaarFrontUrlRef = useRef(null);
    const AdhaarBackUrlRef = useRef(null);
    const PassportSizeUrlRef = useRef(null);

    useEffect(() => {
        if (error.FirstName) {
            FirstNameRef.current.focus();
        }
        else if (error.LastName) {
            LastNameRef.current.focus();
        }
        else if (error.Email) {
            EmailRef.current.focus();
        }
        else if (error.MobileNumber) {
            MobileNumberRef.current.focus();
        }
        else if (error.DOB) {
            DOBRef.current.focus();
        }
        else if (error.Gender) {
            GenderRef.current.focus();
        }
        else if (error.MotherTongue) {
            MotherTongueRef.current.focus();
        }
        else if (error.ReadingProficiency) {
            ReadingProficiencyRef.current.focus();
        }
        else if (error.SpeakingProficiency) {
            SpeakingProficiencyRef.current.focus();
        }

        else if (error.Disability) {
            DisabilityRef.current.focus();
        }
        else if (error.TypeOfDisability) {
            TypeOfDisabilityRef.current.focus();
        }
        else if (error.FullAddress) {
            FullAddressRef.current.focus();
        }
        else if (error.CurrentState) {
            CurrentStateRef.current.focus();
        }
        else if (error.CurrentCity) {
            CurrentCityRef.current.focus();
        }
        else if (error.Pincode) {
            PincodeRef.current.focus();
        }
        else if (error.ResidingLocation) {
            ResidingLocationRef.current.focus();
        }
        else if (error.EducationType) {
            EducationTypeRef.current.focus();
            if (candidateDetail.EducationType === "12th")
                if (error.SchoolBoard) {
                    SchoolBoardRef.current.focus();
                }
                else if (error.YearOfPassing) {
                    YearOfPassingRef.current.focus();
                }
        }
        else if (error.EducationType) {
            EducationTypeRef.current.focus();
            if (candidateDetail.EducationType === "diploma")
                if (error.Degree) {
                    DegreeRef.current.focus();
                }
                else if (error.YearOfPassing) {
                    YearOfPassingRef.current.focus();
                }
        }
        else if (error.EducationType) {
            EducationTypeRef.current.focus();
            if (candidateDetail.EducationType === "undergraduate")
                if (error.Degree) {
                    DegreeRef.current.focus();
                }
                else if (error.YearOfPassing) {
                    YearOfPassingRef.current.focus();
                }
        }
        else if (error.EducationType) {
            EducationTypeRef.current.focus();
            if (candidateDetail.EducationType === "graduate")
                if (error.Degree) {
                    DegreeRef.current.focus();
                }
                else if (error.YearOfPassing) {
                    YearOfPassingRef.current.focus();
                }
        }
        else if (error.EducationType) {
            EducationTypeRef.current.focus();
            if (candidateDetail.EducationType === "postgraduate")
                if (error.Degree) {
                    DegreeRef.current.focus();
                }
                else if (error.YearOfPassing) {
                    YearOfPassingRef.current.focus();
                }
        }
        else if (error.ExperienceType) {
            ExperienceTypeRef.current.focus();
            if (candidateDetail.ExperienceType === "Experienced")
                if (error.ExperienceMonths) {
                    ExperienceMonthsRef.current.focus();
                }
                else if (error.ExperienceInSupport) {
                    ExperienceInSupportRef.current.focus();
                }
                else if (error.WorkingStatus) {
                    WorkingStatusRef.current.focus();
                }
                else if (error.CurrentCompensationRef) {
                    CurrentCompensationRef.current.focus();
                }
                else if (error.CurrentEmployer) {
                    CurrentEmployerRef.current.focus();
                }
                else if (error.NoticePeriod) {
                    NoticePeriodRef.current.focus();
                }
        }

        else if (error.ComfortCSASalaryRange) {
            ComfortCSASalaryRangeRef.current.focus();
        }
        else if (error.WillForOvertime) {
            WillForOvertimeRef.current.focus();
        }
        else if (error.WillForRotationalShift) {
            WillForRotationalShiftRef.current.focus();
        }
        else if (error.WillToInteract) {
            WillToInteractRef.current.focus();
        }
        else if (error.WiredInternetConnection) {
            WiredInternetConnectionRef.current.focus();
        }
        else if (error.SavingAccount) {
            SavingAccountRef.current.focus();
        }
        else if (error.EmployedAtAmazon) {
            EmployedAtAmazonRef.current.focus();
        }
        else if (error.PANCardNo) {
            PANCardNoRef.current.focus();
        }
        else if (error.PanCardUrl) {
            PanCardUrlRef.current.focus();
        }

        else if (error.EAdhaarCardNo) {
            EAdhaarCardNoRef.current.focus();
        }
        else if (error.AdhaarFrontUrl) {
            AdhaarFrontUrlRef.current.focus();
        }
        else if (error.AdhaarBackUrl) {
            AdhaarBackUrlRef.current.focus();
        }
        else if (error.PassportSizeUrl) {
            PassportSizeUrlRef.current.focus();
        }
    }, [error]);


    const formValidation = () => {
        let errors = {};
        // console.log('validation')
        let isValid = true;
        // FirstName
        if (!candidateDetail.FirstName || candidateDetail.FirstName === '') {
            errors.FirstName = "This field is mandatory"
            isValid = false;
        }
        // LastName
        if (!candidateDetail.LastName || candidateDetail.LastName === '') {
            errors.LastName = "This field is mandatory"
            isValid = false;
        }
        // Mobile
        if (!candidateDetail.MobileNumber || candidateDetail.MobileNumber === '') {
            errors.MobileNumber = "This field is mandatory"
            isValid = false;
        } else if (candidateDetail.MobileNumber.length !== 10) {
            errors.MobileNumber = "Please Enter 10 digit number"
            isValid = false;
        }
        // Email
        if (!candidateDetail.Email || candidateDetail.Email === '') {
            errors.Email = "This field is mandatory"
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(candidateDetail.Email.trim())) {
            errors.Email = 'Invalid Email Address ';
            isValid = false;
        }
        // Gender
        if (!candidateDetail.Gender || candidateDetail.Gender === '') {
            errors.Gender = "This field is mandatory"
            isValid = false;
        }
        // Mother Tongue
        if (!candidateDetail.MotherTongue || candidateDetail.MotherTongue === '') {
            errors.MotherTongue = "This field is mandatory"
            isValid = false;
        }
        // adhar

        // Pan Card
        // const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        // if (!candidateDetail.PANCardNo || candidateDetail.PANCardNo === '') {
        //     errors.PANCardNo = "This field is mandatory"
        //     isValid = false
        // }
        // else if (!regex.test(candidateDetail.PANCardNo)) {
        //     errors.PANCardNo = "Invalid Pan Card Number"
        //     isValid = false;
        // }
        // dob
        // var pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
        if (!candidateDetail.DOB || candidateDetail.DOB === '') {
            isValid = false;
            errors.DOB = "This field is mandatory"
        }
        // else if (!pattern.test(candidateDetail.DOB)) {
        //     isValid = false;
        //     errors.DOB = "Please follow this pattern (dd/mm/yyyy) ";
        // }
        // address
        if (!candidateDetail.FullAddress || candidateDetail.FullAddress === '') {
            isValid = false;
            errors.FullAddress = "This field is mandatory"
        }
        // Reading Profecciency
        if (!candidateDetail.ReadingProficiency || candidateDetail.ReadingProficiency === '') {
            isValid = false;
            errors.ReadingProficiency = "This field is mandatory"
        }
        // Speaking Profecciency
        if (!candidateDetail.SpeakingProficiency || candidateDetail.SpeakingProficiency === '') {
            isValid = false;
            errors.SpeakingProficiency = "This field is mandatory"
        }
        // states
        if (!candidateDetail.CurrentState || candidateDetail.CurrentState === '') {
            isValid = false;
            errors.CurrentState = "This field is mandatory"
        }
        // city
        if (!candidateDetail.CurrentCity || candidateDetail.CurrentCity === '') {
            isValid = false;
            errors.CurrentCity = "This field is mandatory"
        }
        // Disablity
        if (!candidateDetail.Disability || candidateDetail.Disability === '') {
            isValid = false;
            errors.Disability = "This field is mandatory"
        }

        // Type of Disablity
        if (candidateDetail.Disability === "Yes" && (!candidateDetail.TypeOfDisability || candidateDetail.TypeOfDisability === '')) {
            isValid = false;
            errors.TypeOfDisability = "This field is mandatory"
        }
        // Residing Location
        if (!candidateDetail.ResidingLocation || candidateDetail.ResidingLocation === '') {
            isValid = false;
            errors.ResidingLocation = "This field is mandatory"
        }
        // Education type
        if (!candidateDetail.EducationType || candidateDetail.EducationType === '') {
            isValid = false;
            errors.EducationType = "This field is mandatory"
        }
        //12th
        if (candidateDetail.EducationType === "12th") {
            if (!candidateDetail.SchoolBoard || candidateDetail.SchoolBoard === '') {
                isValid = false;
                errors.SchoolBoard = "This field is mandatory"
            }
            if (!candidateDetail.YearOfPassing || candidateDetail.YearOfPassing === '') {
                isValid = false;
                errors.YearOfPassing = "This field is mandatory"
            }
        }
        //diploma
        if (candidateDetail.EducationType === "diploma") {
            if (!candidateDetail.Degree || candidateDetail.Degree === '') {
                isValid = false;
                errors.Degree = "This field is mandatory"
            }
            if (!candidateDetail.YearOfPassing || candidateDetail.YearOfPassing === '') {
                isValid = false;
                errors.YearOfPassing = "This field is mandatory"
            }
        }
        //undergraduate
        if (candidateDetail.EducationType === "undergraduate") {
            if (!candidateDetail.Degree || candidateDetail.Degree === '') {
                isValid = false;
                errors.Degree = "This field is mandatory"
            }
            if (!candidateDetail.YearOfPassing || candidateDetail.YearOfPassing === '') {
                isValid = false;
                errors.YearOfPassing = "This field is mandatory"
            }
        }
        //graduate
        if (candidateDetail.EducationType === "graduate") {
            if (!candidateDetail.Degree || candidateDetail.Degree === '') {
                isValid = false;
                errors.Degree = "This field is mandatory"
            }
            if (!candidateDetail.YearOfPassing || candidateDetail.YearOfPassing === '') {
                isValid = false;
                errors.YearOfPassing = "This field is mandatory"
            }
        }
        if (candidateDetail.EducationType === "postgraduate") {
            if (!candidateDetail.Degree || candidateDetail.Degree === '') {
                isValid = false;
                errors.Degree = "This field is mandatory"
            }
            if (!candidateDetail.YearOfPassing || candidateDetail.YearOfPassing === '') {
                isValid = false;
                errors.YearOfPassing = "This field is mandatory"
            }
        }
        // EXPERIENCE TYPE
        if (!candidateDetail.ExperienceType || candidateDetail.ExperienceType === '') {
            isValid = false;
            errors.ExperienceType = "This field is mandatory"
        }
        // EXPERIENCE TYPE months
        if (candidateDetail.ExperienceType === "Experienced") {
            if (!candidateDetail.ExperienceMonths || candidateDetail.ExperienceMonths === '') {
                isValid = false;
                errors.ExperienceMonths = "This field is mandatory"
            }
            if (!candidateDetail.ExperienceInSupport || candidateDetail.ExperienceInSupport === '') {
                isValid = false;
                errors.ExperienceInSupport = "This field is mandatory"
            }
            if (!candidateDetail.WorkingStatus || candidateDetail.WorkingStatus === '') {
                isValid = false;
                errors.WorkingStatus = "This field is mandatory"
            }
            if (!candidateDetail.CurrentCompensation || candidateDetail.CurrentCompensation === '') {
                isValid = false;
                errors.CurrentCompensation = "This field is mandatory"
            }
            if (!candidateDetail.CurrentEmployer || candidateDetail.CurrentEmployer === '') {
                isValid = false;
                errors.CurrentEmployer = "This field is mandatory"
            }
            if (!candidateDetail.NoticePeriod || candidateDetail.NoticePeriod === '') {
                isValid = false;
                errors.NoticePeriod = "This field is mandatory"
            }
        }
        //ComfortCSASalaryRange
        if (!candidateDetail.ComfortCSASalaryRange || candidateDetail.ComfortCSASalaryRange === '') {
            isValid = false;
            errors.ComfortCSASalaryRange = "This field is mandatory"
        }
        //WillForOvertime
        if (!candidateDetail.WillForOvertime || candidateDetail.WillForOvertime === '') {
            isValid = false;
            errors.WillForOvertime = "This field is mandatory"
        }

        //WillForRotationalShift
        if (!candidateDetail.WillForRotationalShift || candidateDetail.WillForRotationalShift === '') {
            isValid = false;
            errors.WillForRotationalShift = "This field is mandatory"
        }

        //WillToInteract
        if (!candidateDetail.WillToInteract || candidateDetail.WillToInteract === '') {
            isValid = false;
            errors.WillToInteract = "This field is mandatory"
        }

        //WiredInternetConnection
        if (!candidateDetail.WiredInternetConnection || candidateDetail.WiredInternetConnection === '') {
            isValid = false;
            errors.WiredInternetConnection = "This field is mandatory"
        }

        //SavingAccount
        if (!candidateDetail.SavingAccount || candidateDetail.SavingAccount === '') {
            isValid = false;
            errors.SavingAccount = "This field is mandatory"
        }

        //EmployedAtAmazon

        if (!candidateDetail.EmployedAtAmazon || candidateDetail.EmployedAtAmazon === '') {
            isValid = false;
            errors.EmployedAtAmazon = "This field is mandatory"
        }
        //PANCardNo
        if (!candidateDetail.PANCardNo || candidateDetail.PANCardNo === '') {
            isValid = false;
            errors.PANCardNo = "This field is mandatory"
        }
        //PanCardUrl
        if (!candidateDetail.PanCardUrl || candidateDetail.PanCardUrl === '') {
            isValid = false;
            errors.PanCardUrl = "This field is mandatory"
        }
        //EAdhaarCardNo
        if (!candidateDetail.EAdhaarCardNo || candidateDetail.EAdhaarCardNo === '') {
            isValid = false;
            errors.EAdhaarCardNo = "This field is mandatory"
        }
        // else if (!adharRegex.test(candidateDetail.EAdhaarCardNo)) {
        //     errors.EAdhaarCardNo = "Invalid Aadhaar Number"
        //     isValid = false;
        // }
        //AdhaarFrontUrl
        if (!candidateDetail.AdhaarFrontUrl || candidateDetail.AdhaarFrontUrl === '') {
            isValid = false;
            errors.AdhaarFrontUrl = "This field is mandatory"
        }
        if (!candidateDetail.AdhaarBackUrl || candidateDetail.AdhaarBackUrl === '') {
            isValid = false;
            errors.AdhaarBackUrl = "This field is mandatory"
        }

        // PassportSizeUrl

        if (!candidateDetail.PassportSizeUrl || candidateDetail.PassportSizeUrl === '') {
            isValid = false;
            errors.PassportSizeUrl = "This field is mandatory"
        }

        // pinCode
        if (!candidateDetail.Pincode || candidateDetail.Pincode === '') {
            isValid = false;
            errors.Pincode = "Pincode is required"
        } else if (candidateDetail.Pincode.length !== 6) {
            errors.Pincode = "Please enter 6 digit number"
            isValid = false;
        }
        setError(errors)
        return isValid;

    }
    useEffect(() => {
        setCandidateDetail((candidateDetail) => ({ ...candidateDetail, MobileNumber: cookies.get("USERMOBILENO") }));
    }, [])
    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token d6993b908a599f4234bb98621bc63a447d09f390");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Auth-Token", "Ezxe01MBXU2werWrW2Wi342ASDADAShyIIoKvmYI");

        var raw = JSON.stringify({
            "userId": cookies.get("USERID"),
            "firstName": candidateDetail.FirstName,
            "lastName": candidateDetail.LastName,
            "email": candidateDetail.Email,
            "mobile": candidateDetail.MobileNumber,
            "dob": candidateDetail.DOB,
            "gender": candidateDetail.Gender,
            "motherTongue": candidateDetail.MotherTongue,
            "readMotherTongue": candidateDetail.ReadingProficiency,
            "speakMotherTongue": candidateDetail.SpeakingProficiency,
            "languageOne": candidateDetail.ProficiencyLanguageL1,
            "languageSecond": candidateDetail.ProficiencyLanguageL2,
            "isDisability": candidateDetail.Disability,
            "typeOfDisability": candidateDetail.TypeOfDisability,
            "fullAddress": candidateDetail.FullAddress,
            "city": candidateDetail.CurrentCity,
            "pincode": candidateDetail.Pincode,
            "jobLocation": candidateDetail.ResidingLocation,
            "educationType": candidateDetail.EducationType,
            "experinceLevel": candidateDetail.ExperienceType,
            "totalExperince": candidateDetail.ExperienceMonths,
            "expCustomerServices": candidateDetail.ExperienceInSupport,
            "annualCompensation": candidateDetail.CurrentCompensation,
            "lastEmployer": candidateDetail.CurrentEmployer,
            "noticePeriod": candidateDetail.NoticePeriod,
            "comfortCSASalaryRange": candidateDetail.ComfortCSASalaryRange,
            "willForOvertime": candidateDetail.WillForOvertime,
            "rotationalShifts": candidateDetail.WillForRotationalShift,
            "willtoChatAndEmail": candidateDetail.WillToInteract,
            "internetConnection": candidateDetail.WiredInternetConnection,
            "bankAccount": candidateDetail.SavingAccount,
            "panCardNumber": candidateDetail.PANCardNo,
            "panCardPhoto": candidateDetail.PanCardUrl,
            "aadhaarNumber": candidateDetail.EAdhaarCardNo,
            "aadharFront": candidateDetail.AdhaarFrontUrl,
            "aadharBack": candidateDetail.AdhaarBackUrl,
            "profilePic": candidateDetail.PassportSizeUrl,
            "schoolBoard": candidateDetail.SchoolBoard,
"yearOfPassing": candidateDetail.YearOfPassing,
"degree": candidateDetail.Degree,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.rozgaarindia.com/bridge/AmazonRegitrationForm", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 200)
                    if (formValidation()) {
                        history.push("/AmazonFormSucces")
                    }
            })
            .catch(error => console.log('error', error));
    }
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
                if (fileType === "PANCard") {
                    setCandidateDetail((candidateDetail) => ({ ...candidateDetail, PanCardUrl: imageUrl }));
                }
                else if (fileType === "AdhaarFrontUrl") {
                    setCandidateDetail((candidateDetail) => ({ ...candidateDetail, AdhaarFrontUrl: imageUrl }));
                }
                else if (fileType === "AdhaarBackUrl") {
                    setCandidateDetail((candidateDetail) => ({ ...candidateDetail, AdhaarBackUrl: imageUrl }));
                    }
                else if (fileType === "passportSizePhoto") {
                    setCandidateDetail((candidateDetail) => ({ ...candidateDetail, PassportSizeUrl: imageUrl }));
                }
            })
            .catch(error => console.log('error', error));
    }
    // console.log(candidateDetail)
    const [uploadedPan, setUploadedPan] = useState("");
    const [uploadedPhoto, setUploadedPhoto] = useState("");
    const [uploadedAdhaarFrontUrl, setUploadedAdhaarFrontUrl] = useState("");
    const [uploadedAdhaarBackUrl, setUploadedAdhaarBackUrl] = useState("");

    return (
        <React.Fragment>

            <div className={classes.form_heading}>
                <h4><b>registration form</b></h4>
            </div>

            <div className={classes.background}>
                <div className={classes.circle}>1</div>
                <div className={classes.background_heading}>Professional Details</div>
            </div>
            <form method="post" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                <div className={classes.container_align}>

                    <label for="fname" className={classes.label}>Legal first name*</label><br />
                    <input ref={FirstNameRef} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, FirstName: e.target.value })) }} value={candidateDetail.FirstName} type="text" id="fname" name="fname" placeholder="Legal first name" className={classes.input} /><br />
                    <p className="errorMsg">{error.FirstName}</p>
                    <label for="lname" className={classes.label}>Legal last name*</label><br />
                    <input ref={LastNameRef} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, LastName: e.target.value })) }} value={candidateDetail.LastName} type="text" id="lname" name="lname" placeholder="Legal last name" className={classes.input} /><br />
                    <p className="errorMsg">{error.LastName}</p>

                    <label for="ename" className={classes.label}>email id*</label><br />
                    <input ref={EmailRef} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Email: e.target.value })) }} value={candidateDetail.Email} type="email" id="ename" name="ename" placeholder="enter email id" className={classes.input_email} /><br />
                    <p className="errorMsg">{error.Email}</p>

                    <label for="mobile_number" className={classes.label}>mobile number*</label><br />
                    <input ref={MobileNumberRef} onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === '' || re.test(e.target.value)) {
                            setCandidateDetail((candidateDetail) => ({ ...candidateDetail, MobileNumber: e.target.value }))
                        }
                    }}
                        value={candidateDetail.MobileNumber} type="tel" id="mobile_number" name="mobile_number" maxLength="10" minLength="0" readOnly placeholder="enter mobile number" className={classes.input} /><br />

                    <label for="date_of_birth" className={classes.label}>date of birth*</label><br />
                    <input ref={DOBRef} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, DOB: e.target.value })) }} value={candidateDetail.DOB} type="date" id="date_of_birth" name="date_of_birth" className={classes.date} max="2005-01-01" /><br />
                    <p className="errorMsg">{error.DOB}</p>

                    <label for="gender" ref={GenderRef} className={classes.label}>gender*</label><br />

                    <input type="radio" id="male" name="gender" onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Gender: "male" })) }} value={candidateDetail.Gender} className={classes.radio_align1} />
                    <label for="male">Male</label>

                    <input type="radio" id="female" name="gender" onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Gender: "female" })) }} value={candidateDetail.Gender} className={classes.radio_align} />
                    <label for="female">Female</label>
                    <br />
                    <input type="radio" id="I_choose_not_to_specify" name="gender" onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Gender: "not specified" })) }} value={candidateDetail.Gender} className={"mr-2"} />
                    <label for="I_choose_not_to_specify">I choose not to specify</label>
                    <p className="errorMsg">{error.Gender}</p>

                    <div className={classes.para}>
                        <p>
                            As an Equal Opportunity Employer, Amazon does not use this information in its hiring decisions, so whether or not you choose to identify gender will not affect your application in any way.
                        </p>
                    </div>
                    <div className={classes.heading_border}></div>
                </div>
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 */}


                <div className={classes.background}>
                    <div className={classes.circle}>2</div>
                    <div className={classes.background_heading}>Language Details</div>
                </div>
                <div className={classes.container_align}>
                    <p>
                        English as a language is mandatory for customer service job profile and your assessments will be in English.
                    </p>

                    <label for="Language" className={classes.label}>What is your Mother Tongue*</label><br />
                    <select className={classes.input1} ref={MotherTongueRef} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, MotherTongue: e.target.value })) }} value={candidateDetail.MotherTongue}>
                        <option value="" selected >-Select-</option>
                        <option value="Assamese"  >Assamese</option>
                        <option value="Bengali"  >Bengali</option>
                        <option value="Bodo"  >Bodo</option>
                        <option value="Dogri"  >Dogri</option>
                        <option value="Gujrati"  >Gujrati</option>
                        <option value="Hindi"  >Hindi</option>
                        <option value="Kannada"  >Kannada</option>
                        <option value="Kashmiri"  >Kashmiri</option>
                        <option value="Konkani"  >Konkani</option>
                        <option value="Maithili"  >Maithili</option>
                        <option value="Malayam"  >Malayam</option>
                        <option value="Manipuri"  >Manipuri</option>
                        <option value="Marathi"  >Marathi</option>
                        <option value="Nepali"  >Nepali</option>
                        <option value="Odia"  >Odia</option>
                        <option value="Other"  >Other</option>
                        <option value="Punjabi"  >Punjabi</option>
                        <option value="Sanskrit"  >Sanskrit</option>
                        <option value="Santali"  >Santali</option>
                        <option value="Sindhi"  >Sindhi</option>
                        <option value="Tamil"  >Tamil</option>
                        <option value="Telugu"  >Telugu</option>
                        <option value="Urdu"  >Urdu</option>
                    </select>
                    <p className="errorMsg">{error.MotherTongue}</p>

                    <label for="Language" className={classes.label}>Please mention your Reading Proficiency in Mother Tongue*</label><br />
                    <select ref={ReadingProficiencyRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, ReadingProficiency: e.target.value })) }} value={candidateDetail.ReadingProficiency}>
                        <option value="" selected >-Select-</option>
                        <option value="Beginner"  >Beginner</option>
                        <option value="No"  >No</option>
                        <option value="Proficient"  >Proficient</option>
                    </select>
                    <p className="errorMsg">{error.ReadingProficiency}</p>

                    <label for="Language" className={classes.label}>Please mention your Speaking Proficiency in Mother Tongue*</label><br />
                    <select ref={SpeakingProficiencyRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, SpeakingProficiency: e.target.value })) }} value={candidateDetail.SpeakingProficiency}>
                        <option value="" selected >-Select-</option>
                        <option value="Beginner"  >Beginner</option>
                        <option value="No"  >No</option>
                        <option value="Proficient"  >Proficient</option>
                    </select>
                    <p className="errorMsg">{error.SpeakingProficiency}</p>


                    <label for="Language" className={classes.label}>Based on your proficiency, please select Language 1:</label><br />
                    <select className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, ProficiencyLanguageL1: e.target.value })) }} value={candidateDetail.ProficiencyLanguageL1}>
                        <option value="" selected >-Select-</option>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Urdu">Urdu</option>
                        <option value="German">German</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Malayam">Malayam</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                    </select>

                    <label for="Language" className={classes.label}>Based on your proficiency, please select Language 2:</label><br />
                    <select className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, ProficiencyLanguageL2: e.target.value })) }} value={candidateDetail.ProficiencyLanguageL2}>
                        <option value="" selected >-Select-</option>
                        <option value="English"  >English</option>
                        <option value="French"  >French</option>
                        <option value="Spanish"  >Spanish</option>
                        <option value="Urdu"  >Urdu</option>
                        <option value="German"  >German</option>
                        <option value="Punjabi"  >Punjabi</option>
                        <option value="Bengali"  >Bengali</option>
                        <option value="Hindi"  >Hindi</option>
                        <option value="Kannada"  >Kannada</option>
                        <option value="Malayam"  >Malayam</option>
                        <option value="Marathi"  >Marathi</option>
                        <option value="Tamil"  >Tamil</option>
                        <option value="Telugu"  >Telugu</option>
                    </select>
                </div>
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 */}


                <div className={classes.background}>
                    <div className={classes.circle}>3</div>
                    <div className={classes.background_heading}>Disability</div>
                </div>

                <div className={classes.container_align}>

                    <label for="disability" className={classes.label}>Voluntary self-Identification of disability*</label><br />
                    <select ref={DisabilityRef} className={classes.input1} onChange={(e) => { e.target.value === "Yes" ? setDisAbility(true) : setDisAbility(false); setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Disability: e.target.value })) }} value={candidateDetail.Disability}>
                        <option value="" selected >-Select-</option>
                        <option value="No" >NO, I don't have any Disability</option>
                        <option value="Yes"  >YES,I have a Disability</option>

                    </select>
                    <p className="errorMsg">{error.Disability}</p>

                    <p className={classes.para}>
                        Amazon recognizes that it is in the organisation's interest to recruit and maintain a diverse and skilled workforce, which includes persons with disabilites. In order to do that and create an enabling environment we would like to maintain records of people with disability. We therefore request you to provide details for the purpose intended above. It is also informed that providing details is voluntary and refusal to fill the form will not have any adverse impact however we urge you to provide the requested information to enable the organisation. We also take this opportunity to inform you that information you wish to provide under this scope will be kept confidential similar to any other personal information provided by you as part of your employment records.
                    </p>
                    {
                        disAbility === false ?
                            <></> : <>
                                {/* specify disability */}
                                <label for="disability" className={classes.label}>If Yes, Kindly select the type of disability from the below list?*</label><br />
                                <select ref={TypeOfDisabilityRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, TypeOfDisability: e.target.value })) }} value={candidateDetail.TypeOfDisability}>
                                    <option value="" selected >-Select-</option>
                                    <option value="Acid Attack Victims"  >Acid Attack Victims</option>
                                    <option value="Autism Spectrum Disorders "  >Autism Spectrum Disorders </option>
                                    <option value="Blindness "  >Blindness </option>
                                    <option value="Cerebral palsy "  >Cerebral palsy </option>
                                    <option value="Chronic Neurological Diseases  "  >Chronic Neurological Diseases  </option>
                                    <option value="Dwarfism "  >Dwarfism </option>
                                    <option value="Hearing Impairment "  >Hearing Impairment </option>
                                    <option value="Hemophilia "  >Hemophilia </option>
                                    <option value="Intellectual Disability"  >Intellectual Disability</option>
                                    <option value="Leprosy Cured Persons"  >Leprosy Cured Persons</option>
                                    <option value="Locomotor Disability"  >Locomotor Disability</option>
                                    <option value="Low-vision"  >Low-vision</option>
                                    <option value="Mental Illness"  >Mental Illness</option>
                                    <option value="Multiple disabilities including deaf-blindness"  >Multiple disabilities including deaf-blindness</option>
                                    <option value="Multiple Sclerosis"  >Multiple Sclerosis</option>
                                    <option value="Muscular dystrophy"  >Muscular dystrophy</option>
                                    <option value="Others"  >Others</option>
                                    <option value="Sickle cell disease"  >Sickle cell disease</option>
                                    <option value="specific Learning Disabilities"  >specific Learning Disabilities</option>
                                    <option value="Speech and Language disability"  >Speech and Language disability</option>
                                    <option value="Thalassemia"  >Thalassemia</option>
                                </select>
                                <p className="errorMsg">{error.TypeOfDisability}</p>

                            </>
                    }
                </div>
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 */}

                <div className={classes.background}>
                    <div className={classes.circle}>4</div>
                    <div className={classes.background_heading}>Address Details</div>
                </div>

                <div className={classes.container_align}>

                    <p className={classes.para}>
                        ("Please be informed that it is mandatory for you to be available in the applied location as mentioned in the Job Description for the CSA role in order to initiate onboarding and joining formalities. Amazon will have the right to revoke your offer in case of failure to be present at the applied  location for CSA roles.")
                    </p>

                    <label for="address" className={classes.label}>Full address(House No, Floor, Building, Street)*</label><br />
                    <input ref={FullAddressRef} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, FullAddress: e.target.value })) }} value={candidateDetail.FullAddress} type="text" id="fname" name="fname" placeholder="Full address(House No, Floor, Building, Street*" className={classes.input} /><br />
                    <p className="errorMsg">{error.FullAddress}</p>

                    <label for="Address" className={classes.label}>Current state*</label><br />
                    <select ref={CurrentStateRef} className={classes.input1} onChange={(e) => { handleCityList(e.target.value); setCandidateDetail((candidateDetail) => ({ ...candidateDetail, CurrentState: e.target.value })) }} value={candidateDetail.CurrentState}>
                        <option value="" selected >-Select-</option>
                        {stateDropdown}
                    </select>
                    <p className="errorMsg">{error.CurrentState}</p>

                    <label for="Address" className={classes.label}>Current city*</label><br />
                    <select ref={CurrentCityRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, CurrentCity: e.target.value })) }} value={candidateDetail.CurrentCity}>
                        <option value="" selected >-Select-</option>
                        {cityDropdown}
                    </select>
                    <p className="errorMsg">{error.CurrentCity}</p>


                    <label for="Pin_Code" className={classes.label}>Pin Code*</label><br />
                    <input ref={PincodeRef} onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === '' || re.test(e.target.value)) {
                            setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Pincode: e.target.value }))
                        }
                    }} value={candidateDetail.Pincode} type="text" id="fname" name="fname" maxLength="6" minLength="0" placeholder="Pin Code*" className={classes.input} /><br />
                    <p className="errorMsg">{error.Pincode}</p>

                    <label for="Address" className={classes.label}>Please confirm that you are currently residing in the location mentioned in the respective Job description*</label><br />
                    <select ref={ResidingLocationRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, ResidingLocation: e.target.value })) }} value={candidateDetail.ResidingLocation}>
                        <option value="" selected >-Select-</option>
                        <option value="NO" >NO</option>
                        <option value="YES" >YES</option>

                    </select>
                    <p className="errorMsg">{error.ResidingLocation}</p>

                    <p className={classes.para}>
                        ("By answering yes to the above question, you confirm to be available in applied location as mentioned in the Job Description for the CSA role. It is mandatory to be present in the applied location in order to initiate onboarding and joining formalities. Amazon will have the right to revoke your offer in case of failure to be present at the applied location for CSA roles. In case of relocation, Amazon will not bare any relocation benefits/bonuses.")
                    </p>
                </div>
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 */}

                <div className={classes.background}>
                    <div className={classes.circle}>5</div>
                    <div className={classes.background_heading}>Highest Education Profile</div>
                </div>

                <div className={classes.container_align}>
                    <label for="education" className={classes.label}>Education type*</label><br />
                    <select
                        onChange={(e) => { e.target.value === "12th" ? setTwelth(true) : setTwelth(false); e.target.value === "diploma" ? setDiploma(true) : setDiploma(false); e.target.value === "undergraduate" ? setUndergraduate(true) : setUndergraduate(false); e.target.value === "graduate" ? setGraduate(true) : setGraduate(false); e.target.value === "postgraduate" ? setPostgraduate(true) : setPostgraduate(false); setCandidateDetail((candidateDetail) => ({ ...candidateDetail, EducationType: e.target.value })) }} value={candidateDetail.EducationType}
                        ref={EducationTypeRef} className={classes.input1} >
                        <option value="" selected >-Select-</option>
                        <option value="postgraduate" >Post Graduate</option>
                        <option value="graduate" >Graduate</option>
                        <option value="undergraduate" >Under Graduate</option>
                        <option value="diploma" >3 Year Diploma</option>
                        <option value="12th" >12th/ Diploma</option>

                    </select>
                    <p className="errorMsg">{error.EducationType}</p>

                    {
                        twelth === false ?
                            <></> : <>

                                {/* 12th */}
                                <label for="School_Board" className={classes.label}>School Board*</label><br />
                                <select ref={SchoolBoardRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, SchoolBoard: e.target.value })) }} value={candidateDetail.SchoolBoard}>
                                    <option value="" selected >-Select-</option>
                                    <option value=""  >Andhra Pradesh Board of Intermediate Educatio ...</option>
                                    <option value="Andhra Pradesh Board of Secondary Education"  >Andhra Pradesh Board of Secondary Education</option>
                                    <option value="Andhra Pradesh Open School Society"  >Andhra Pradesh Open School Society</option>
                                    <option value="Assam Higher Secondary Education Council"  >Assam Higher Secondary Education Council</option>
                                    <option value="Assam State Open School"  >Assam State Open School</option>
                                    <option value="Assam sanskrit board"  >Assam sanskrit board</option>
                                    <option value="Bihar Board of Open Schooling and Examination"  >Bihar Board of Open Schooling and Examination</option>
                                    <option value="Bihar Sanskrit Shiksha Board"  >Bihar Sanskrit Shiksha Board</option>
                                    <option value="Bihar School Examination Board"  >Bihar School Examination Board</option>
                                    <option value="Bihar School Examination Board"  >Bihar School Examination Board</option>
                                    <option value="Board of High School and Intermediate Educati ..."  >Board of High School and Intermediate Educati ...</option>
                                    <option value="Board of Higher Secondary Education Delhi"  >Board of Higher Secondary Education Delhi</option>
                                    <option value="Board of Secondary Education Madhya Pradesh"  >Board of Secondary Education Madhya Pradesh</option>
                                    <option value="Board of Secondary Education Rajastan"  >Board of Secondary Education Rajastan</option>
                                    <option value="CBSE - Central Board of Secondary Education"  >CBSE - Central Board of Secondary Education</option>
                                    <option value="CISCE - Council for the Indian School Certifi ..."  >CISCE - Council for the Indian School Certifi ...</option>
                                    <option value="Chhattisgarh Board of Secondary Education"  >Chhattisgarh Board of Secondary Education</option>
                                    <option value="Council Of Secondary Education Mohali"  >Council Of Secondary Education Mohali</option>
                                    <option value="Council Of Secondary Education Mohali"  >Council Of Secondary Education Mohali</option>
                                    <option value="Goa Board of Secondary and Higher Secondary Education"> Goa Board of Secondary and Higher Secondary Education </option>
                                    <option value="Grameeen Mukt Vidhyalayi Shiksha Sansthan(GMVSS)"> Grameeen Mukt Vidhyalayi Shiksha Sansthan(GMVSS)</option>
                                    <option value="Gujarat Secondary Education Board"> Gujarat Secondary Education Board </option>
                                    <option value="Haryana Board of School Education"> Haryana Board of School Education </option>
                                    <option value="Himachal Pradesh School of Education"> Himachal Pradesh School of Education </option>
                                    <option value="Himachal Pradesh State Open School"> Himachal Pradesh State Open School </option>
                                    <option value="IB- International Baccalaureate"> IB- International Baccalaureate </option>
                                    <option value="IGCSE-  International General Certificate of Secondary Education"> IGCSE-  International General Certificate of Secondary Education </option>

                                    <option value="Jammu and Kashmir State Board of School Education"> Jammu and Kashmir State Board of School Education </option>

                                    <option value="Jammu and Kashmir State Open School"> Jammu and Kashmir State Open School </option>

                                    <option value="Jharkhand Academic Council"> Jharkhand Academic Council </option>

                                    <option value="Karnataka Secondary Education Examination Board"> Karnataka Secondary Education Examination Board </option>

                                    <option value="Kerela Higher Secondary Examination Board"> Kerela Higher Secondary Examination Board </option>

                                    <option value="Kerela State Open School"> Kerela State Open School </option>

                                    <option value="Madhya Pradesh State Open School"> Madhya Pradesh State Open School </option>

                                    <option value="Maharashtra State Board of Secondary &amp; Higher Secondary Education"> Maharashtra State Board of Secondary & Higher Secondary Education </option>

                                    <option value="Meghalaya Board of School Education"> Meghalaya Board of School Education </option>

                                    <option value="Mizoram Board of School Education"> Mizoram Board of School Education </option>

                                    <option value="Nagaland Board of School Education"> Nagaland Board of School Education </option>

                                    <option value="National Institute of Open Schooling"> National Institute of Open Schooling </option>

                                    <option value="Odisha Board of Secondary Education"> Odisha Board of Secondary Education </option>

                                    <option value="Odisha Council of Secondary Education"> Odisha Council of Secondary Education </option>

                                    <option value="Punjab School Education Board"> Punjab School Education Board </option>

                                    <option value="Rajasthan State Open School"> Rajasthan State Open School </option>

                                    <option value="Tamil Nadu Board of Secondary Education"> Tamil Nadu Board of Secondary Education </option>

                                    <option value="Telangana Board of Intermediate Education"> Telangana Board of Intermediate Education </option>

                                    <option value="Telangana Board of Secondary Education"> Telangana Board of Secondary Education </option>

                                    <option value="Tripura Board of Secondary Education"> Tripura Board of Secondary Education </option>


                                    <option value="Uchchatar Madhyamik Shiksha Parishad"> Uchchatar Madhyamik Shiksha Parishad </option>

                                    <option value="Uttrakhand Board of School Education"> Uttrakhand Board of School Education </option>

                                    <option value="West Bengal  Board of Madrasah Education"> West Bengal  Board of Madrasah Education </option>

                                    <option value="West Bengal  Board of Primary Education"> West Bengal  Board of Primary Education </option>

                                    <option value="West Bengal  Board of Secondary Education"> West Bengal  Board of Secondary Education </option>


                                    <option value="West Bengal  Council of Secondary Higher Education"> West Bengal  Council of Secondary Higher Education </option>

                                    <option value="West Bengal Council of Rabindra Open Schooling"> West Bengal Council of Rabindra Open Schooling </option>

                                    <option value="Others"> Others</option>
                                </select>
                                <p className="errorMsg">{error.SchoolBoard}</p>

                                <label for="Year_of_Passing" className={classes.label}>Year of Passing*</label><br />
                                <select ref={YearOfPassingRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, YearOfPassing: e.target.value })) }} value={candidateDetail.YearOfPassing}>
                                    <option value="" selected >-Select-</option>
                                    {
                                        years.reverse().map((value, index) => {
                                            return <option key={index}>{value}</option>
                                        })
                                    }
                                </select>
                                <p className="errorMsg">{error.YearOfPassing}</p>
                            </>
                    }

                    {
                        diploma === false ?
                            <></> : <>
                                {/*3 year diploma degree */}
                                <label for="Degree" className={classes.label}>Degree*</label><br />
                                <select ref={DegreeRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Degree: e.target.value })) }} value={candidateDetail.Degree}>
                                    <option value="" selected >-Select-</option>
                                    <option value="diploma"  >Diploma</option>

                                </select>
                                <p className="errorMsg">{error.Degree}</p>

                                <label for="Year_of_Passing" className={classes.label}>Year of Passing*</label><br />
                                <select ref={YearOfPassingRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, YearOfPassing: e.target.value })) }} value={candidateDetail.YearOfPassing}>
                                    <option value="" selected >-Select-</option>
                                    {
                                        years.reverse().map((value, index) => {
                                            return <option key={index}>{value}</option>
                                        })
                                    }
                                </select>
                                <p className="errorMsg">{error.YearOfPassing}</p>
                            </>
                    }

                    {
                        undergraduate === false ?
                            <></> : <>
                                {/* Under Graduate */}
                                <label for="Degree" className={classes.label}>Degree*</label><br />
                                <select ref={DegreeRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Degree: e.target.value })) }} value={candidateDetail.Degree}>
                                    <option value="" selected >-Select-</option>
                                    <option value="B.Sc."  >B.Sc.</option>
                                    <option value="B.B.A."  >B.B.A.</option>
                                    <option value="B.Com."  >B.Com.</option>
                                    <option value="B.E."  >B.E.</option>
                                    <option value="B.Tech."  >B.Tech.</option>
                                    <option value="BA"  >BA</option>
                                    <option value="BCA"  >BCA</option>
                                    <option value="Other Non-Tech"  >Other Non-Tech</option>
                                    <option value="Other Tech"  >Other Tech</option>

                                </select>
                                <p className="errorMsg">{error.Degree}</p>

                                <label for="Year_of_Passing" className={classes.label}>Year of Passing*</label><br />
                                <select ref={YearOfPassingRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, YearOfPassingRef: e.target.value })) }} value={candidateDetail.YearOfPassingRef}>
                                    <option value="" selected >-Select-</option>
                                    {
                                        years.reverse().map((value, index) => {
                                            return <option key={index}>{value}</option>
                                        })
                                    }
                                </select>
                                <p className="errorMsg">{error.YearOfPassing}</p>
                            </>
                    }
                    {
                        graduate === false ?
                            <></> : <>
                                {/*  Graduate */}
                                <label for="Degree" className={classes.label}>Degree*</label><br />
                                <select ref={DegreeRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Degree: e.target.value })) }} value={candidateDetail.Degree}>
                                    <option value="" selected >-Select-</option>
                                    <option value="B.Sc."  >B.Sc.</option>
                                    <option value="B.B.A."  >B.B.A.</option>
                                    <option value="B.Com."  >B.Com.</option>
                                    <option value="B.E."  >B.E.</option>
                                    <option value="B.Tech."  >B.Tech.</option>
                                    <option value="BA"  >BA</option>
                                    <option value="BCA"  >BCA</option>
                                    <option value="Other Non-Tech"  >Other Non-Tech</option>
                                    <option value="Other Tech"  >Other Tech</option>

                                </select>
                                <p className="errorMsg">{error.Degree}</p>

                                <label for="Year_of_Passing" className={classes.label}>Year of Passing*</label><br />
                                <select ref={YearOfPassingRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, YearOfPassing: e.target.value })) }} value={candidateDetail.YearOfPassing}>
                                    <option value="" selected >-Select-</option>
                                    {
                                        years.reverse().map((value, index) => {
                                            return <option key={index}>{value}</option>
                                        })
                                    }
                                </select>
                                <p className="errorMsg">{error.YearOfPassing}</p>
                            </>
                    }
                    {
                        postgraduate === false ?
                            <></> : <>
                                {/* post Graduate */}
                                <label for="Degree" className={classes.label}>Degree*</label><br />
                                <select ref={DegreeRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, Degree: e.target.value })) }} value={candidateDetail.Degree}>
                                    <option value="" selected >-Select-</option>
                                    <option value="M.Sc."  >M.Sc.</option>
                                    <option value="M.B.A."  >M.B.A.</option>
                                    <option value="M.Com."  >M.Com.</option>
                                    <option value="M.E."  >M.E.</option>
                                    <option value="M.Tech."  >M.Tech.</option>
                                    <option value="MA"  >MA</option>
                                    <option value="MCA"  >MCA</option>
                                    <option value="Other Non-Tech"  >Other Non-Tech</option>
                                    <option value="Other Tech"  >Other Tech</option>
                                </select>
                                <p className="errorMsg">{error.Degree}</p>

                                <label for="Year_of_Passing" className={classes.label}>Year of Passing*</label><br />
                                <select ref={YearOfPassingRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, YearOfPassing: e.target.value })) }} value={candidateDetail.YearOfPassing}>
                                    <option value="" selected >-Select-</option>
                                    {
                                        years.reverse().map((value, index) => {
                                            return <option key={index}>{value}</option>
                                        })
                                    }
                                </select>
                                <p className="errorMsg">{error.YearOfPassing}</p>
                            </>
                    }
                </div>
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 */}

                <div className={classes.background}>
                    <div className={classes.circle}>6</div>
                    <div className={classes.background_heading}>Experience Details</div>
                </div>

                <div className={classes.container_align}>

                    <label for="Experience" className={classes.label}>Experience Level*</label><br />
                    <select ref={ExperienceTypeRef} className={classes.input1} onChange={(e) => { e.target.value === "Experienced" ? setIsMenuOpen(true) : setIsMenuOpen(false); setCandidateDetail((candidateDetail) => ({ ...candidateDetail, ExperienceType: e.target.value })) }} value={candidateDetail.ExperienceType}>
                        <option value=""  >-Select-</option>
                        <option value="Fresher" >Fresher</option>
                        <option value="Experienced" >Experienced</option>

                    </select>
                    <p className="errorMsg">{error.ExperienceType}</p>

                    {
                        isMenuOpen === false ?
                            <></> : <>
                                {/* Experienced */}
                                <label for="Experience" className={classes.label}>Total Experience( In Months )*</label><br />
                                <input ref={ExperienceMonthsRef} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, ExperienceInSupport: e.target.value })) }} value={candidateDetail.ExperienceInSupport} type="text" id="Experience" name="Experience" placeholder="Total Experience( In Months )" className={classes.input} /><br />
                                <p className="errorMsg">{error.ExperienceMonths}</p>

                                <label for="Experience" className={classes.label}>Please select the months of experience you have in Customer Service( Tech support, Phone banking, Tele sales, Inbound, out bound etc)*</label><br />
                                <select ref={ExperienceMonthsRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, ExperienceMonths: e.target.value })) }} value={candidateDetail.ExperienceMonths}>
                                    <option value="" selected >-Select-</option>
                                    <option value="01-06 Months">01-06 Months</option>
                                    <option value="07-12 Months">07-12 Months</option>
                                    <option value="13-18 Months">13-18 Months</option>
                                    <option value="19-24 Months">19-24 Months</option>
                                    <option value="25-36 Months">25-36 Months</option>
                                    <option value="37-48 Months">37-48 Months</option>
                                    <option value="49+ Months">49+ Months</option>
                                </select>
                                <p className="errorMsg">{error.ExperienceInSupport}</p>


                                <label for="Experience" className={classes.label}>Are you currently working*</label><br />
                                <select ref={WorkingStatusRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, WorkingStatus: e.target.value })) }} value={candidateDetail.WorkingStatus}>
                                    <option value="" selected >-Select-</option>
                                    <option value="YES"  >Yes</option>
                                    <option value="NO"  >No</option>
                                </select>
                                <p className="errorMsg">{error.WorkingStatus}</p>


                                <label for="Experience" className={classes.label}>Current Annual Compensation/ Last Withdrawn Annual Compensation in INR*</label><br />
                                <select ref={CurrentCompensationRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, CurrentCompensation: e.target.value })) }} value={candidateDetail.CurrentCompensation}>
                                    <option value="" selected >-Select-</option>
                                    <option value="1-2 LACS"  >1-2 LACS</option>
                                    <option value="2-3 LACS"  >2-3 LACS</option>
                                    <option value="3-4 LACS"  >3-4 LACS</option>
                                    <option value="4-5 LACS"  >4-5 LACS</option>
                                    <option value="5 LACS and above"  >5 LACS and above</option>
                                    <option value="NA"  >NA</option>
                                </select>
                                <p className="errorMsg">{error.CurrentCompensation}</p>


                                <label for="Experience" className={classes.label}>Current Employer/ Last Employer Name*</label><br />
                                <input ref={CurrentEmployerRef} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, CurrentEmployer: e.target.value })) }} value={candidateDetail.CurrentEmployer} type="text" id="Experience" name="Experience" placeholder="Current Employer/ Last Employer Name" className={classes.input} /><br />
                                <p className="errorMsg">{error.CurrentEmployer}</p>

                                <label for="Experience" className={classes.label}>Notice Period*</label><br />
                                <select ref={NoticePeriodRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, NoticePeriod: e.target.value })) }} value={candidateDetail.NoticePeriod}>
                                    <option value="" selected >-Select-</option>
                                    <option value="15 Days"  >15 Days</option>
                                    <option value="30 Days"  >30 Days</option>
                                    <option value="45 Days"  >45 Days</option>
                                    <option value="60 Days"  >60 Days</option>
                                    <option value="60+ Days"  >60+ Days</option>
                                    <option value="Immediate Joiner"  >Immediate Joiner</option>
                                </select>
                                <p className="errorMsg">{error.NoticePeriod}</p>

                            </>
                    }
                </div>
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 */}

                <div className={classes.background}>
                    <div className={classes.circle}>7</div>
                    <div className={classes.background_heading}>Other Details</div>
                </div>

                <div className={classes.container_align}>
                    <label for="Other_Details" className={classes.label}>Are you comfortable with the customer service associate salary range*</label><br />
                    <select ref={ComfortCSASalaryRangeRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, ComfortCSASalaryRange: e.target.value })) }} value={candidateDetail.ComfortCSASalaryRange}>
                        <option value="" selected >-Select-</option>
                        <option value="YES"  >Yes</option>
                        <option value="NO"  >No</option>
                    </select>
                    <p className="errorMsg">{error.ComfortCSASalaryRange}</p>

                    <p className={classes.dropdown_para}>Please refer to the Job Description for salary range</p>

                    <label for="Other_Details" className={classes.label}>In order to meet our customer needs during peak season, would you be willing to work overtime as per business requirements*</label><br />
                    <select ref={WillForOvertimeRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, WillForOvertime: e.target.value })) }} value={candidateDetail.WillForOvertime}>
                        <option value="" selected >-Select-</option>
                        <option value="YES"  >Yes</option>
                        <option value="NO"  >No</option>
                    </select>
                    <p className="errorMsg">{error.WillForOvertime}</p>


                    <label for="Other_Details" className={classes.label}>Are you willing to work in rotational shifts &amp; week offs, including night shifts if there is a business requirement*</label><br />
                    <select ref={WillForRotationalShiftRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, WillForRotationalShift: e.target.value })) }} value={candidateDetail.WillForRotationalShift}>
                        <option value="" selected >-Select-</option>
                        <option value="YES"  >Yes</option>
                        <option value="NO"  >No</option>
                    </select>
                    <p className="errorMsg">{error.WillForRotationalShift}</p>

                    <label for="Other_Details" className={classes.label}>Are you willing to be in a job that may require interacting with customer via Telephone, Chat and E-mail?*</label><br />
                    <select ref={WillToInteractRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, WillToInteract: e.target.value })) }} value={candidateDetail.WillToInteract}>
                        <option value="" selected >-Select-</option>
                        <option value="YES"  >Yes</option>
                        <option value="NO"  >No</option>
                    </select>
                    <p className="errorMsg">{error.WillToInteract}</p>

                    <label for="Other_Details" className={classes.label}>Do you have a Wired Internet connection to work from home*</label><br />
                    <select ref={WiredInternetConnectionRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, WiredInternetConnection: e.target.value })) }} value={candidateDetail.WiredInternetConnection}>
                        <option value="" selected >-Select-</option>
                        <option value="YES"  >Yes</option>
                        <option value="NO"  >No</option>
                    </select>
                    <p className="errorMsg">{error.WiredInternetConnection}</p>

                    <p className={classes.dropdown_para}>To ensure safety of our employees we are currently onboarding new hires only under work from home model.<br />This is subject to change post pandemic.</p>

                    <label for="Other_Details" className={classes.label}>Do you have a Savings Bank Account*</label><br />
                    <select ref={SavingAccountRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, SavingAccount: e.target.value })) }} value={candidateDetail.SavingAccount}>
                        <option value="" selected >-Select-</option>
                        <option value="YES"  >Yes</option>
                        <option value="NO"  >No</option>
                    </select>
                    <p className="errorMsg">{error.SavingAccount}</p>

                    <p className={classes.dropdown_para}>If you DO NOT have a Bank Account, please apply for it immediately and furnish when asked. Bank Account is mandatory to proceed with your employment with Amazon.</p>

                    <label for="Other_Details" className={classes.label}>Have you ever been employed at Amazon*</label><br />
                    <select ref={EmployedAtAmazonRef} className={classes.input1} onChange={(e) => { setCandidateDetail((candidateDetail) => ({ ...candidateDetail, EmployedAtAmazon: e.target.value })) }} value={candidateDetail.EmployedAtAmazon}>
                        <option value="" selected >-Select-</option>
                        <option value="YES"  >Yes</option>
                        <option value="NO"  >No</option>
                    </select>
                    <p className="errorMsg">{error.EmployedAtAmazon}</p>

                </div>
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 */}

                <div className={classes.background}>
                    <div className={classes.circle}>8</div>
                    <div className={classes.background_heading}>Documents</div>
                </div>

                <div className={classes.container_align}>

                    <label for="panCard" className={classes.label}>PAN*</label><br />
                    <input ref={PANCardNoRef}
                        onChange={(e) => {
                            setCandidateDetail((candidateDetail) => ({ ...candidateDetail, PANCardNo: e.target.value }))
                        }} value={candidateDetail.PANCardNo} type="text" id="Documents" name="Documents" placeholder="Enter your PAN CARD number  " maxLength="10" minLength="0" className={classes.input} /><br />
                    <p className="errorMsg">{error.PANCardNo}</p>

                    <p className={classes.dropdown_para}><b>PAN CARD*</b>( please upload the image of your PAN CARD )</p>
                    <input ref={PanCardUrlRef} type="file" max-size="3000" onChange={(e) => { setUploadedPan(e.target.files[0].name); uploadFile(e.target.files[0], "PANCard") }} id="actual-btn" hidden />
                    <label for="actual-btn" className={classes.label1}>Choose File {uploadedPan !== "" ? (uploadedPan) : ""}</label><br />
                    <p className="errorMsg">{error.PanCardUrl}</p>

                    <p className={classes.dropdown_para}>If you DO NOT have a PAN Card, please apply for it immediately and furnish when asked. Bank Account is mandatory to proceed with your employment with Amazon.</p>


                    <label for="Documents" className={classes.label}>Aadhaar Card*</label><br />
                    <input ref={EAdhaarCardNoRef} onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === '' || re.test(e.target.value)) {
                            setCandidateDetail((candidateDetail) => ({ ...candidateDetail, EAdhaarCardNo: e.target.value }))
                        }
                    }} value={candidateDetail.EAdhaarCardNo} type="text" id="Documents" name="Documents" placeholder="Enter your Aadhaar Card number" maxLength="12" minLength="0" className={classes.input} /><br />
                    <p className="errorMsg">{error.EAdhaarCardNo}</p>


                    <p className={classes.dropdown_para}><b>Aadhaar Card Front Image*</b>( please upload the front image of your Aadhaar Card )</p>
                    <input ref={AdhaarFrontUrlRef} type="file" max-size="3000" onChange={(e) => { setUploadedAdhaarFrontUrl(e.target.files[0].name); uploadFile(e.target.files[0], "AdhaarFrontUrl") }} id="actual-btn1" hidden />
                    <label for="actual-btn1" className={classes.label1}>Choose File {uploadedAdhaarFrontUrl !== "" ? (uploadedAdhaarFrontUrl) : ""}</label> <br />
                    <p className="errorMsg">{error.AdhaarFrontUrl}</p>

                    <p className={classes.dropdown_para}><b>Aadhaar Card Back Image*</b>( please upload the back image of your Aadhaar Card )</p>
                    <input ref={AdhaarBackUrlRef} type="file" max-size="3000" onChange={(e) => { setUploadedAdhaarBackUrl(e.target.files[0].name); uploadFile(e.target.files[0], "AdhaarBackUrl") }} id="actual-btn8" hidden />
                    <label for="actual-btn8" className={classes.label1}>Choose File {uploadedAdhaarBackUrl !== "" ? (uploadedAdhaarBackUrl) : ""}</label> <br />
                    <p className="errorMsg">{error.AdhaarBackUrl}</p>

                    <p className={classes.dropdown_para}>If you DO NOT have a E-Aadhaar, please apply for it immediately and furnish when asked. Bank Account is mandatory to proceed with your employment with Amazon.</p>
                    <label for="Documents" className={classes.label}>Passport size photograph*</label><br />

                    <p className={classes.dropdown_para}>(Supported Format:jpg, jpeg, png; Max size: 3 MB) Uploaded passport size photograph should be latest(Not older than 2 months)</p>

                    <input type="file" max-size="3000" id="actual-btn3" hidden ref={PassportSizeUrlRef} onChange={(e) => { setUploadedPhoto(e.target.files[0].name); uploadFile(e.target.files[0], "passportSizePhoto") }} />
                    <label for="actual-btn3" className={classes.label1}>Choose File {uploadedPhoto !== "" ? (uploadedPhoto) : ""}</label><br />
                    <p className="errorMsg">{error.PassportSizeUrl}</p>


                    <input type="checkbox" id="agree" name="agree" value="agree" />
                    <label for="agree" className={classes.i_agree}> I Agree</label><br />

                    <p className={classes.dropdown_para}>By checking this box, I confirm my understanding of the following:</p>
                    <ul className={classes.list_bullets}>
                        <li>
                            <p className={classes.dropdown_para}>I agree to the terms and conditions of Rozgaar India and Amazon.</p>
                        </li>
                    </ul>
                    <ul className={classes.list_bullets}>
                        <li>
                            <p className={classes.dropdown_para}>Amazon CSA roles comprises of fulltime &amp; contract openings. I understand fulltime/contract role is offered based on the business requirements and my performance in the online assessments.</p>
                        </li>
                    </ul>
                    <ul className={classes.list_bullets}>
                        <li>
                            <p className={classes.dropdown_para}>I understand that, post selection my onboarding and joining formalities will be finalized only if I meet all the mandatory pre-requisite criteria and being available in the applied location. Amazon will have the right to revoke my offer, if I do not meet the above set expectations.</p>
                        </li>
                    </ul>


                    <button className={classes.submit} type={"submit"}>Submit</button>
                </div>
            </form>

        </React.Fragment>
    )
}

export default RegistrationForm;
