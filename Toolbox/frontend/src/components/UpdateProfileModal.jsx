import React, { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./UpdateProfileModal.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

// ANT DESIGN
import { Button, Flex } from "antd";

const OverLay = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const statusRef = useRef("");
  const addressRef = useRef("");
  const countryRef = useRef("");
  const postalCodeRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");
  const resignedDateRef = useRef("");
  const profilePicRef = useRef("");

  const updateProfile = async (accountId) => {
    const confirmUpdate = confirm(
      "Are you sure you want to proceed to update profile details?"
    );

    if (!confirmUpdate) {
      return; // Do nothing if user cancels
    }

    const res = await fetchData(
      `/api/employee/${accountId}`,
      "PATCH",
      {
        address: addressRef.current.value,
        country: countryRef.current.value,
        postal_code: postalCodeRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value,
        status: statusRef.current.value,
        resigned_date: resignedDateRef.current.value,
        profile_picture_url: profilePicRef.current.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      props.fetchEmployeeData(accountId);
      props.setShowProfileUpdateModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    addressRef.current.value = props.address;
    countryRef.current.value = props.country;
    postalCodeRef.current.value = props.postalCode;
    phoneRef.current.value = props.phone;
    emailRef.current.value = props.email;
    // statusRef.current.value = props.status;
    // resignedDateRef.current.value = props.resignedDate;
    // profilePicRef.current.value = props.profilePic;
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h4 className="modal-title">Update Profile</h4>
        </div>

        <div className={styles.body}>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Address</div>
            <input ref={addressRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Country</div>
            <input ref={countryRef} type="text" className="col-md-6" />
            <div className="col-md-2"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Postal Code</div>
            <input ref={postalCodeRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Phone</div>
            <input ref={phoneRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Email</div>
            <input ref={emailRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>
        </div>
        <br />
        <div className={`row ${styles.footer}`}>
          <div className="col-md-12 d-flex justify-content-center">
            <Button onClick={() => props.setShowProfileUpdateModal(false)}>
              Close
            </Button>
            <Button type="primary" onClick={() => updateProfile(props.id)}>
              Save changes
            </Button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

const UpdateProfileModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          status={props.status}
          address={props.address}
          country={props.country}
          postalCode={props.postalCode}
          phone={props.phone}
          email={props.email}
          resignedDate={props.resignedDate}
          profilePic={props.profilePic}
          setShowProfileUpdateModal={props.setShowProfileUpdateModal}
          fetchEmployeeData={props.fetchEmployeeData}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateProfileModal;
