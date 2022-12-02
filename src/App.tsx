import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [contactForm, setcontactForm] = useState<{
    name: string;
    subject: string;
    email: string;
    message: string;
  }>({ name: "", subject: "", email: "", message: "" });
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcontactForm({ ...contactForm, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      "https://master.spicaengine.com/api/fn-execute/contact-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      }
    )
      .then((response) => response.json())
      .catch((err) => alert(err));
    alert(res.message);
  };
  return (
    <div className={"App"}>
      <h1>CONTACT FORM WITH SPICA FUNCTIONS</h1>
      <form onSubmit={handleSubmitForm} className={"contact-form"}>
        <h2 className="contact-form-header">Contact Form</h2>
        <div className="contact-form-inputs">
          <input
            value={contactForm.email}
            onChange={handleChangeForm}
            className="contact-input"
            placeholder="Enter Email..."
            type="email"
            required
            name="email"
          />
          <input
            className="contact-input"
            placeholder="Enter Name..."
            type="text"
            value={contactForm.name}
            onChange={handleChangeForm}
            name="name"
            required
          />
          <input
            className="contact-input"
            placeholder="Enter Subject..."
            type="text"
            value={contactForm.subject}
            onChange={handleChangeForm}
            name="subject"
          />
          <textarea
            className="contact-text-area"
            placeholder="Enter Message..."
            name="message"
            value={contactForm.message}
            onChange={(e) =>
              setcontactForm({ ...contactForm, message: e.target.value })
            }
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
      <div className={"operation-container"}></div>
    </div>
  );
}

export default App;
