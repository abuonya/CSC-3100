// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  function submitForm() {
  props.handleSubmit(person);
  setPerson({ name: "", job: "" });
}
  
  function handleChange(event) {
  const { name, value } = event.target;
  if (name === "job")
    setPerson({ name: person["name"], job: value });
  else setPerson({ name: value, job: person["job"] });
}
  return (
  <form>
    <label for="name">Name</label>
    <input
      type="text"
      name="name"
      id="name"
      
      value={person.name}
      onChange={handleChange}
    />
    <input id="job" type="text" name="job"></input>
    <label for="job">Job</label>
    <input type="button" value="Submit" onClick={submitForm} />
  </form>
);


}


export default Form;