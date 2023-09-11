import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./header";



const phoneBook = [
  { name: "Mashood Ali", number: "+923318822203" },
  { name: "Abdul Rehman", number: "+923234044700" },

];

const App = () => {
  const [contacts, setContacts] = useState(phoneBook);
  const [master,setMaster]=useState(phoneBook);
  const [showForm, setShowForm] = useState(false);
  const [toBeEdited,setToBeEdited]=useState("");
 


  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 1 for edit
  // 2 for add
  const [operation, setOperation] = useState(0);

  useEffect(() => {
    contacts.sort(compare)
    setContacts([...contacts])
  }, [])

  //comparing the name in the object
  function compare(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  //function called at the button click add contact
  const addContact = () => {
    // console.log("button click");
    if (name === "" || phoneNumber === "") {
      // console.log("Please enter the required fields");
    }
    else {
      //appending new contact to the contacts array using the spread operator and calling sort function
      setContacts([...contacts, { name: name, number: phoneNumber }].sort(compare));
      setShowForm(false);
      setName("");
      setPhoneNumber("");
    }
    setOperation(0);
  }

  function editContact(e) {
    // console.log(e.target.id)
    setToBeEdited(e.target.id);

    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].number === e.target.id) {
        setName(contacts[i].name);
        setPhoneNumber(contacts[i].number)
        setShowForm(true);
      }
    }
  }

  function confirmEdit(){
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].number === toBeEdited) {
        // console.log("found");
        // console.log("Index is  : ", i )
        const editedArray= [...contacts];
        editedArray[i].name=name;
        editedArray[i].number=phoneNumber;
        setContacts([...editedArray]);
        setName("");
        setPhoneNumber("");
        setShowForm(false);
        setOperation(0);
        return
      }
    }
  }


  function handleSearch(event) {
    // console.log(event.target.value);
    // setinput(event.target.value);
    try {
      if (event.target.value.toLowerCase() !== "") {
        const newArray = contacts.filter((el) => {
          return (el.name.toLowerCase().includes(event.target.value.toLowerCase()))
        });
        // console.log(newArray)
        setContacts(newArray);
      }
      else{
        setContacts(master);
      }
    } catch (error) {
      // console.log(error)
    }
  }


  function deleteContact(e) {
    // console.log(e.target.id);
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].number === e.target.id) {
        // console.log("The value of i = ", i);
        contacts.splice(i, 1);

        setContacts([...contacts]);

        return
      }
    }
  }
  function saveCopy(){
    setMaster(contacts);
  }




  return (
    <div id="main" className="main">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4"></div>

          <div className="col-md-4">
            <div className="App">
              <h2 className="header" style={{ paddingBottom: "10px" }}>Contacts</h2>
           
              <input
                type="search"
                className={"form-control rounded"}
                placeholder={"Search"}
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleSearch}
                onFocus={saveCopy}
              />

              <hr></hr>
              {operation === 0 ? <button type="button" className="btn btn-primary" onClick={() => {
                setShowForm(!showForm)
                setOperation(2);
              }
              }>
                Add
              </button> : null}


              {showForm && (
                <div className="container">
                  <form className="form">
                    <div className="form-group">

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => {
                          setName(e.target.value)
                          // console.log(e.target.value);
                        }}
                        value={name !== "" ? name : ""}

                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Number"
                        onChange={(e) => {
                          setPhoneNumber(e.target.value)
                          // console.log(e.target.value)
                        }}
                        value={phoneNumber !== "" ? phoneNumber : ""}
                      />
                    </div>
                    {operation === 1 ? <button type="button" className="btn btn-primary" onClick={() => { confirmEdit()}}>
                      Edit
                    </button> : <button type="button" className="btn btn-primary" onClick={() => {
                      if (name !== "" && phoneNumber !== "") {
                        addContact();
                       
                      }
                      else {
                        alert("Please enter the required fields")
                      }
                    }}>
                      Add
                    </button>}

                    {operation > 0 ? <button type="button" className="btn btn-danger ml-2" onClick={() => { setShowForm(false); setOperation(0); setName(""); setPhoneNumber("") }}>
                      Cancel
                    </button> : null}
                  </form>
                </div>
              )}

              {contacts.map((contact) => (
                <div className="contacts" key={contact.number}>
                  <div className="contact-details" >
                    <h5 >{contact.name}</h5>
                    <p> {contact.number} </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px" }}>
                    <div style={{ paddingRight: "20px" }}>
                      <button key={contact.number} id={contact.number} className="icon-holder" onClick={(e) => {
                        setOperation(1);
                        editContact(e)
                        
                      }}>
                        <i style={{ paddingTop: "5px" }} id={contact.number} className="pen fa fa-pen"></i>
                      </button>
                    </div>
                    <div>
                      <button key={contact.number} id={contact.number} className="icon-holder" onClick={(e) => deleteContact(e)}>
                        <i id={contact.number} className="delete fa fa-trash"></i>
                      </button>
                    </div>

                  </div>



                  <hr />
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4"></div>
        </div>
      </div>
 
    </div>
  );
};

export default App;
