import React, { useState } from "react";
import style from "./CSS/Form.module.css";

const Form = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [responseMessage, setResponseMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    console.log(status);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "https://gorest.co.in/public/v2/users";
    const formData = {
      name,
      gender,
      email,
      status,
    };
    const token =
      "8a54ffcf8bedbc38733528c18717a8020edcc867922ae05008943a60369a00b8";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const submitMessage = await response.json();
      console.log(submitMessage[0].message);
      if (submitMessage[0].message === "is invalid") {
        setResponseMessage("Given input is invalid");
      } else if (submitMessage[0].message === "can't be blank") {
        setResponseMessage("Input can't be blank");
      } else {
        setResponseMessage(submitMessage[0].message);
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className={style.form_page}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.each_form}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className={style.text_box}
            />
          </div>

          <div className={style.each_form}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={style.text_box}
            />
          </div>

          <div className={style.each_form}>
            <label>Gender</label>
            <br />
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={handleGenderChange}
              className={style.radio_icon}
            />
            <label className={style.radio_text} htmlFor="male">
              Male
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={handleGenderChange}
              className={style.radio_icon2}
            />
            <label className={style.radio_text} htmlFor="female">
              Female
            </label>
          </div>

          <div className={style.each_form}>
            <label>Active Status</label>
            <br />
            <input
              type="radio"
              id="active"
              name="status"
              value="active"
              checked={status === "active"}
              onChange={handleStatusChange}
              className={style.radio_icon}
            />
            <label className={style.radio_text} htmlFor="active">
              Active
            </label>
            <input
              className={style.radio_icon2}
              type="radio"
              id="inactive"
              name="status"
              value="inactive"
              checked={status === "inactive"}
              onChange={handleStatusChange}
            />
            <label className={style.radio_text} htmlFor="inactive">
              Inactive
            </label>
          </div>

          <div className={style.button_container}>
            <button className={style.submit_button} type="submit">
              Submit
            </button>
          </div>
        </form>
        {responseMessage && (
          <p className={style.response_message}>{responseMessage}</p>
        )}
      </div>
    </>
  );
};

export default Form;
