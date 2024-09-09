import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export const Signup = () => {
  const [inputErrors, setInputErrors] = useState({});
  const [verifyMessage, setVerifyMsg] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [valid1, setValid1] = useState(false);
  const [valid2, setValid2] = useState(false);
  const [valid3, setValid3] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [fnameEmpty, setFnameEmpty] = useState(false);
  const [lnameError, setlnameError] = useState(false);
  const [lnameEmpty, setlnameEmpty] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [removeClass, setRemoveClass] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            setTimerRunning(false);
            clearInterval(timer);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  const handleResend = () => {
    setOtpError(false);
    setVerifyMsg("");
    setTimerRunning(true);
    setCountdown(30);
    const formData = new FormData();
    formData.append("first_name", fname);
    formData.append("last_name", lname);
    formData.append("email", email);

    axios
      .post("http://127.0.0.1:8000/api/signup", formData)
      .then(function (response) {
        console.log(response.data.message);
        if (response.data.status === 200) {
          setResendMessage(response.data.message);
        }
      });
  };

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && index > 1 && event.target.value === "") {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp1(digits[0] || "");
      setOtp2(digits[1] || "");
      setOtp3(digits[2] || "");
      setOtp4(digits[3] || "");
      setOtp5(digits[4] || "");
      setOtp6(digits[5] || "");
    }
  };

  const keyUp1 = () => {
    if (fname !== "") {
      const numRegex = /^[0-9]/;
      const mixRegex = /^[A-Za-z\s]*$/;
      if (numRegex.test(fname)) {
        setFnameError(true);
      }
      if (!mixRegex.test(fname)) {
        setFnameError(true);
      } else {
        setFnameEmpty(false);
        setFnameError(false);
      }
    } else if (fname == "") {
      setFnameEmpty(true);
      setFnameError(false);
    }

    const value1 = document.getElementById("fname");
    setInterval(() => {
      value1.value = value1.value.trim();
    }, 100);

    if (value1 !== "") {
      setValid1(true);
    } else {
      setValid1(!valid1);
    }
  };

  const keyUp2 = () => {
    if (lname !== "") {
      const numRegex = /^[0-9]/;
      const mixRegex = /^[A-Za-z\s]*$/;
      if (numRegex.test(lname)) {
        setlnameError(true);
      }
      if (!mixRegex.test(lname)) {
        setlnameError(true);
      } else {
        setlnameEmpty(false);
        setlnameError(false);
      }
    } else if (lname == "") {
      setlnameEmpty(true);
      setlnameError(false);
    }

    const value2 = document.getElementById("lname");
    
    setInterval(() => {
      value2.value = value2.value.trim();
    }, 100);

    if (value2 !== "") {
      setValid2(true);
    } else {
      setValid2(!valid2);
    }
  };

  const keyUp3 = () => {
    if (email !== "") {
      setValid3(true);
      setRemoveClass(false);
      const emailRegex =
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
      if (!emailRegex.test(email)) {
        setemailError(true);
      } else {
        setemailError(false);
        setEmailEmpty(false);
      }
    } else {
      setEmailEmpty(true);
      setemailError(false);
    }
    const value3 = document.getElementById("email");
    setInterval(() => {
      value3.value = value3.value.trim();
    }, 100);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = () => setShowModal(true);

  var thisClicked = "";

  const sendEmail = (e) => {
    e.preventDefault();

    if (email === "") {
      setRemoveClass(true);
    } else {
      setRemoveClass(false);
    }

    thisClicked = e.currentTarget;
    const formData = new FormData();
    formData.append("first_name", fname);
    formData.append("last_name", lname);
    formData.append("email", email);

    if (fname && lname && email) {
      thisClicked.innerText = "Processing...";
    }

    axios
      .post("http://127.0.0.1:8000/api/signup", formData)
      .then(function (response) {
        console.log(response.data.message);
        handleShowModal();
        thisClicked.innerText = "Verify Email";
        setTimerRunning(true);
      })
      .catch(function (error) {
        thisClicked.innerText = "Verify Email";
        console.log(error.response.data.errors);
        setInputErrors(error.response.data.errors);
        setValid3(!valid3);
      });
  };
  const verifyOtp = (e) => {
    setResendMessage("");
    var thisVerify = e.currentTarget;
    const formData = new FormData();
    const concatOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    formData.append("otp", concatOtp);
    if (concatOtp !== "") {
      thisVerify.innerText = "Verifying OTP...";
    } else {
      setVerifyMsg("");
      setOtpError(true);
      return;
    }
    setOtpError(false);

    axios
      .post("http://127.0.0.1:8000/api/signup/otp_verify", formData)
      .then(function (response) {
        if (response.data.status === 200) {
          setResendMessage("");
          setVerifyMsg(response.data.message);
          setTimeout(() => {
            handleCloseModal();
            thisVerify.innerText = "Verify OTP";
          }, 3000);
          setEmailVerified(true);
        } else {
          thisVerify.innerText = "Verify OTP";
          setVerifyMsg(response.data.message);
          handleShowModal();
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const flag = true;

  const nextStep = () => {
    if (flag) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container px-5 mt-4 p-0 custom-container">
      <div className="text-center mb-4">
        <img
          src="https://www.7searchppc.com/assets/images/logo/7searchppc-logo.png"
          alt="Logo"
        />
      </div>
      <section className="h-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="card-registration">
                <div className="row g-0">
                  <div className="col-xl-7 card p-3 custom-style">
                    <div className="card-body text-black border border-0">
                      <h5 className="fw-normal">
                        Begin Your Advertising Journey With <br />
                        <span className="fw-bold h3">7Search PPC</span>
                      </h5>
                      <div class="stepwizard col-md-offset-3 my-4">
                        <div class="stepwizard-row setup-panel">
                          <div class="stepwizard-step">
                            <a
                              href="#step1"
                              type="button"
                              className={`btn ${
                                step == 1 ? "btn-danger" : "btn-default"
                              } btn-circle`}
                            ></a>
                            <p className="text-danger fw-normal">Verify</p>
                          </div>
                          <div class="stepwizard-step">
                            <a
                              href="#step2"
                              type="button"
                              className={`btn ${
                                step == 2 ? "btn-danger" : "btn-default"
                              } btn-circle`}
                            ></a>
                            <p className="text-danger fw-normal">
                              General Info
                            </p>
                          </div>
                          <div class="stepwizard-step">
                            <a
                              href="#step3"
                              type="button"
                              className={`btn ${
                                step == 3 ? "btn-danger" : "btn-default"
                              } btn-circle`}
                              disabled="disabled"
                            />
                            <p className="text-danger fw-normal">Password</p>
                          </div>
                        </div>
                      </div>
                      {step === 1 && (
                        <form onSubmit={nextStep}>
                          <div className="form-outline">
                            <input
                              autoComplete="off"
                              type="text"
                              id="fname"
                              maxLength={20}
                              placeholder="First Name*"
                              name="first_name"
                              className="form-control"
                              onKeyUp={keyUp1}
                              onChange={(e) => setFname(e.target.value)}
                              value={fname}
                            />
                            <span className="ms-1 text-danger fw-normal errorInput">
                              {valid1 ? "" : inputErrors.first_name}
                            </span>
                            <span className="ms-1 text-danger fw-normal errorInput">
                              {fnameError
                                ? "First name should be character only"
                                : fnameEmpty
                                ? "The first name field is required"
                                : ""}
                            </span>
                          </div>
                          <div className="form-outline">
                            <input
                              autoComplete="off"
                              type="text"
                              maxLength={20}
                              name="last_name"
                              placeholder="Last Name*"
                              id="lname"
                              onKeyUp={keyUp2}
                              className={`form-control`}
                              onChange={(e) => setLname(e.target.value)}
                              value={lname}
                            />
                            <span className="ms-1 text-danger fw-normal errorInput">
                              {valid2 ? "" : inputErrors.last_name}
                            </span>
                            <span className="ms-1 text-danger fw-normal errorInput">
                              {lnameError
                                ? "Last name should be character only"
                                : lnameEmpty
                                ? "The last name field is required"
                                : ""}
                            </span>
                          </div>
                          <div className="form-outline">
                            <div className="input-group">
                              <input
                                autoComplete="off"
                                type="text"
                                placeholder="Your Email*"
                                onKeyUp={keyUp3}
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className={`form-control m-0 ${
                                  emailVerified ? "border border-end-0" : ""
                                }`}
                                disabled={emailVerified ? "true" : ""}
                              />
                              {emailVerified && (
                                <Button className="input-group-text btn btn-success btn-sm border border-0 fw-bold">
                                  <div>
                                    <i className="me-2 fas fa-xl fad fa-check-circle" />
                                    Verified
                                  </div>
                                </Button>
                              )}
                            </div>
                            <span className="text-danger ms-2 fw-normal errorInput">
                              {emailError
                                ? "The email field must be a valid email address"
                                : emailEmpty
                                ? "The Email field is required"
                                : ""}
                            </span>
                            <span className="m-0 text-success fw-normal errorInput">
                              {valid3 ? "" : inputErrors.email}
                            </span>
                            {removeClass ? (
                              <span className="text-danger fw-normal errorInput">
                                The email field is required
                              </span>
                            ) : (
                              <span className="text-danger fw-normal errorInput"></span>
                            )}
                            <div className="d-flex justify-content-end pb-4 mt-3">
                              {!emailVerified && (
                                <Button
                                  variant="danger"
                                  onClick={sendEmail}
                                  className="ms-2 custom-btn form-control fw-normal p-2 custom-border"
                                >
                                  Verify Email
                                </Button>
                              )}
                              {emailVerified && (
                                <Button
                                  type="submit"
                                  variant="danger"
                                  className="ms-2 custom-btn form-control"
                                >
                                  Next Step
                                </Button>
                              )}
                            </div>
                          </div>
                        </form>
                      )}
                      {step === 2 && (
                        <form onSubmit={nextStep}>
                          <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            className="form-control"
                            maxLength={10}
                          />
                          <br />
                          <select class="form-select">
                            <option selected>Select Messenger</option>
                            <option value="Whatsapp">Whatsapp</option>
                            <option value="Telegram">Telegram</option>
                            <option value="Skype">Skype</option>
                            <option value="None">None</option>
                          </select>
                          <div className="mt-5 d-flex justify-content-between">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm prevStep-btn"
                              onClick={prevStep}
                            >
                              Previous
                            </button>
                            <button
                              type="submit"
                              className="btn btn-danger btn-sm prevStep-btn"
                            >
                              Next
                            </button>
                          </div>
                        </form>
                      )}
                      {step === 3 && (
                        <form onSubmit={nextStep}>
                          <input
                            type="text"
                            name="password"
                            placeholder="Password"
                            className="form-control mb-4"
                          />
                          <input
                            type="text"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="form-control mb-3"
                          />
                          <div
                            className="alert alert-danger m-0 p-2 text-center"
                            style={{
                              backgroundColor: "#FFDBDB",
                              color: "#C22828",
                            }}
                          >
                            *Your password must be at least 4 characters long.
                          </div>
                          <div className="form-check mt-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="defaultCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="defaultCheck1"
                            >
                              I agree to
                              <a href="" className="custom-checkbox ms-1 me-1">
                                Terms
                              </a>
                              and
                              <a href="" className="custom-checkbox ms-1">
                                Privacy Policy
                              </a>
                            </label>
                          </div>
                          <br />
                          <div className="mt-3 d-flex justify-content-between">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm prevStep-btn"
                              onClick={prevStep}
                            >
                              Previous
                            </button>
                            <button
                              type="submit"
                              className="btn btn-danger btn-sm prevStep-btn"
                            >
                              Create Account
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-5 p-4 custom-bg">
                    <h6 className="text-white fw-bold pb-4">
                      Register Now to Unlock A Range of Advertising Benefits!
                    </h6>
                    <p className="text-white custom-para">
                      7Search PPC might be your gateway to success and a
                      one-stop solution for all your business advertising needs.
                      Whether you are a small enterprise or a big business
                      giant, we have the potential to boost your revenue
                      tremendously.
                    </p>
                    <p className="text-white custom-para">
                      Begin your advertising journey with just
                      <span className="text-warning fw-bold">$50</span> at
                      7Search PPC by filling in the required details and
                      submitting today!
                    </p>
                    <p className="text-white custom-para">
                      Please ensure that your website complies with all our
                      advertising
                      <span className="text-warning fw-bold">
                        Terms and Policies
                      </span>
                      to promote your business effectively.
                    </p>
                  </div>
                </div>
              </div>
              <div className="custom-padding mt-4">
                <p className="text-end fw-bold">
                  Already have an account?
                  <a
                    href="https://advertiser.7searchppc.in/auth-login"
                    style={{ padding: "10px 7px" }}
                    target="_blank"
                  >
                    Advertiser
                  </a>
                  <span className="pnonel"> | </span>
                  <a
                    href="https://publisher.7searchppc.in/auth-login"
                    className
                    style={{ padding: "10px 7px" }}
                    target="_blank"
                  >
                    Publisher
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="custom-modal"
          backdrop="static"
          keyboard="false"
        >
          <form action="" method="POST" name="verify">
            <div className="modal-header">
              <span className="ms-5 close-btn" onClick={handleCloseModal}>
                <i className="fas fa-2xl fa-dark fa-circle-xmark" />
              </span>
            </div>
            <div className="d-flex justify-content-center align-items-center container">
              <div className="col-md-12">
                <div className="motext">
                  <div className="row mx-2 p-0 custom-head">
                    <div className="col-md-3">
                      <img
                        className="otpimgbox"
                        src="https://7searchppc.in/register/assets/lockicon.png"
                        height={100}
                        alt="lockicon"
                      />
                    </div>
                    <div className="col-md-9 px-4 pt-2">
                      <p className="text-danger">
                        OTP sent to <b id="getmail">{email}</b> <br />
                        Kindly, check spam folder if not received.
                      </p>
                    </div>
                  </div>
                  <div className="row mt-4 mx-1 p-0 text-center">
                    <div>
                      <p className="custom-mid">
                        <i class="fa-solid fa-circle-exclamation me-2"></i>This
                        OTP will expire in 15 minutes
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row mt-2 mb-2 ms-3">
                  <input
                    type="text"
                    ref={inputRefs[1]}
                    className="form-control"
                    autoFocus
                    maxLength={1}
                    name="otp1"
                    onChange={(e) => {
                      setOtp1(e.target.value);
                    }}
                    onKeyDown={(e) => handleBackspace(1, e)}
                    value={otp1}
                    onPaste={(e) => handlePaste(e)}
                  />
                  <input
                    type="text"
                    ref={inputRefs[2]}
                    className="form-control"
                    maxLength={1}
                    name="otp2"
                    onChange={(e) => {
                      setOtp2(e.target.value);
                    }}
                    onKeyDown={(e) => handleBackspace(2, e)}
                    value={otp2}
                    onPaste={(e) => handlePaste(e)}
                  />
                  <input
                    type="text"
                    ref={inputRefs[3]}
                    className="form-control"
                    maxLength={1}
                    name="otp3"
                    onChange={(e) => {
                      setOtp3(e.target.value);
                    }}
                    onKeyDown={(e) => handleBackspace(3, e)}
                    value={otp3}
                    onPaste={(e) => handlePaste(e)}
                  />
                  <input
                    type="text"
                    ref={inputRefs[4]}
                    className="form-control"
                    maxLength={1}
                    name="otp4"
                    onChange={(e) => {
                      setOtp4(e.target.value);
                    }}
                    onKeyDown={(e) => handleBackspace(4, e)}
                    value={otp4}
                    onPaste={(e) => handlePaste(e)}
                  />
                  <input
                    type="text"
                    ref={inputRefs[5]}
                    className="form-control"
                    maxLength={1}
                    name="otp5"
                    onChange={(e) => {
                      setOtp5(e.target.value);
                    }}
                    onKeyDown={(e) => handleBackspace(5, e)}
                    value={otp5}
                    onPaste={(e) => handlePaste(e)}
                  />
                  <input
                    type="text"
                    ref={inputRefs[6]}
                    className="form-control"
                    maxLength={1}
                    name="otp6"
                    onChange={(e) => {
                      setOtp6(e.target.value);
                    }}
                    onKeyDown={(e) => handleBackspace(6, e)}
                    value={otp6}
                    onPaste={(e) => handlePaste(e)}
                  />
                </div>
                {otpError && (
                  <span className="text-danger ms-2 fw-bold" id="invalid-otp">
                    Please Enter OTP!!
                  </span>
                )}
                <span className="text-danger ms-2 fw-bold" id="invalid-otp">
                  {verifyMessage}
                </span>
                <span className="text-success ms-2 fw-bold" id="invalid-otp">
                  {resendMessage}
                </span>
                <div className="mt-4">
                  <button
                    type="button"
                    className="btn btn-danger form-control fw-bold"
                    onClick={verifyOtp}
                  >
                    Verify OTP
                  </button>
                </div>
                <div className="text-end my-3">
                  {timerRunning ? (
                    <span className="text-success">{`Resend OTP in ${countdown} sec`}</span>
                  ) : (
                    <span
                      className="font-weight-bold text-danger cursor fw-bold"
                      onClick={handleResend}
                      style={{ cursor: "pointer" }}
                    >
                      Resend OTP
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
