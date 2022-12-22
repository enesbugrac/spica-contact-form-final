import React, { useState } from "react";

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
    const res = await fetch("<YOUR_FUNCTION_URL>", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactForm),
    })
      .then((response) => response.json())
      .catch((err) => alert(err));
    alert(res.message);
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmitForm} className={"contact-form"}>
        <div className="contact-form-header ">Contact Form</div>
        <div className="contact-form-inputs">
          <input
            value={contactForm.email}
            onChange={handleChangeForm}
            placeholder="Enter Email..."
            type="email"
            required
            name="email"
          />
          <input
            placeholder="Enter Name..."
            type="text"
            value={contactForm.name}
            onChange={handleChangeForm}
            name="name"
            required
          />
          <input
            placeholder="Enter Subject..."
            type="text"
            value={contactForm.subject}
            onChange={handleChangeForm}
            name="subject"
          />
          <textarea
            placeholder="Enter Message..."
            name="message"
            value={contactForm.message}
            onChange={(e) =>
              setcontactForm({ ...contactForm, message: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
