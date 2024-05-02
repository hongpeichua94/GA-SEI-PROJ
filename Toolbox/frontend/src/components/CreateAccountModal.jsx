import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./UpdateProfileModal.module.css";
import useFetch from "../hooks/useFetch";

// ANT DESIGN
import { Button } from "antd";

const OverLay = (props) => {
  const fetchData = useFetch();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const birthdateRef = useRef("");
  const genderRef = useRef("");
  const titleRef = useRef("");
  const departmentRef = useRef("");
  const joinedDateRef = useRef("");

  const [isLoading, setIsLoading] = useState(false);
  const [accCreated, setAccCreated] = useState(false);
  const [allFields, setAllFields] = useState(false);
  const [error, setError] = useState("");

  const createAccount = async () => {
    const confirmCreate = confirm(
      "Are you sure all fields are entered correctly?"
    );

    if (!confirmCreate) {
      return; // Do nothing if user cancels
    }

    const emailCheck = emailRef.current?.value;
    const passwordCheck = passwordRef.current?.value;
    setIsLoading(true);
    setError("");
    if (!emailCheck || !passwordCheck) {
      setAllFields(true);
      setIsLoading(false);
      throw new Error("Please fill in all required fields");
    }

    try {
      const res = await fetchData("/auth/register", "PUT", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        date_of_birth: birthdateRef.current.value,
        gender: genderRef.current.value,
        title: titleRef.current.value,
        department: departmentRef.current.value,
        joined_date: joinedDateRef.current.value,
      });

      if (res.ok) {
        setAccCreated(true);
        setAllFields(false);
        setIsLoading(false);
        props.setShowCreateAccountModal(false);
        alert("Account Created");
      } else {
        setError(JSON.stringify(res.data));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating new employee", error);
    }
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h4 className="modal-title">Create Account</h4>
        </div>

        <div className={styles.body}>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Email</div>
            <input ref={emailRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Password</div>
            <input ref={passwordRef} type="text" className="col-md-6" />
            <div className="col-md-2"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">First Name</div>
            <input ref={firstNameRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Last Name</div>
            <input ref={lastNameRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Date Of Birth</div>
            <input ref={birthdateRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Gender</div>
            <input ref={genderRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Title</div>
            <input ref={titleRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Department</div>
            <select ref={departmentRef} className="col-md-6">
              <option value="">---Select Department---</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resource">Human Resource</option>
              <option value="Product">Product</option>
              <option value="Engineering">Engineering</option>
              <option value="Data">Data</option>
            </select>
            <div className="col-md-3"></div>
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-3">Joined Date</div>
            <input ref={joinedDateRef} type="text" className="col-md-6" />
            <div className="col-md-3"></div>
          </div>
        </div>
        <br />
        <div className={`row ${styles.footer}`}>
          <div className="col-md-12 d-flex justify-content-center">
            <Button onClick={() => props.setShowCreateAccountModal(false)}>
              Close
            </Button>
            <Button type="primary" onClick={createAccount}>
              Save changes
            </Button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

const CreateAccountModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay setShowCreateAccountModal={props.setShowCreateAccountModal} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CreateAccountModal;
