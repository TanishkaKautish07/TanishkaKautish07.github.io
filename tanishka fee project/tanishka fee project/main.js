"use strict";

// class for creating a contact object
class Contact {
    constructor(name, email, phone, relation, state, zip) {
        this.name = name;
        this.phone = phone;
        this.address = email;
        this.relation = relation;
        this.state = state;
        this.zip = zip;
    }
}


// class for AddressBook, which will consist of an array of contact objects (made from the contact class)
class AddressBook {
    constructor() {
        this.contacts = [];
        // this.currentUserEmail="";
        // empty array where contact objects will be pushed and stored
    }
    add(name, phone, address, relation, state, zip) {
        // makes new Contact instance and adds to AddressBook's contacts
        let newContact = new Contact(name, phone, address, relation, state, zip);
        // declare and initialize the variable newContact as a new instance of class Contact
        this.contacts.push(newContact);
        // pushes newContact to the empty contact array
    }

    authentication() {
        let mail = document.querySelector("#in1").value;
        let pass = document.querySelector("#in2").value;
        let form = document.querySelector(".loginform");

        event.preventDefault();

        let userdata = JSON.parse(localStorage.getItem("users"));
        let authenticated = false;

        for (let i = 0; i < userdata.length; i++) {
            if (userdata[i].pass === pass && userdata[i].email === mail) {
                authenticated = true;
                this.currentUserEmail = userdata[i].email;
                // let contactsData = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];

                // this.contacts = contactsData;

                break;
            }
            // console.log(userdata)
            // console.log(mail)
        }




        if (authenticated) {
            sessionStorage.setItem("loggedInEmail", this.currentUserEmail)
            window.location.href = "addressbook.html";
            logout.classList.add(".hide")

        } else {
            alert("Invalid Password or email");
            form.reset();
        }


    }

    store(email) {
        //save json Data in browser
        let personAsString = JSON.stringify(this.contacts);
        localStorage.setItem(sessionStorage.getItem("loggedInEmail"), personAsString);
        // retrieving user data
        this.contacts = JSON.parse(window.localStorage.getItem(sessionStorage.getItem("loggedInEmail")))
    }
    display() {
        document.querySelector(".contact_container").innerHTML = "";
        // let retrieveUserData=JSON.parse(window.localStorage.getItem('contact'));
        // this is resetting the HTML, that way only the most recent submission is added (rather than repeating each previous submission with the new one).
        this.contacts.forEach((person, index) => {
            const contact = document.createElement("div");
            // creates a new div for the new contact 
            contact.classList.add("contact_card");
            contact.classList.add("card")
            contact.setAttribute("index", index);
            // this is setting an attribute of "index" to the index of the object.
            contact.innerHTML = `
                <p>Name: ${person.name}</p>
                <p>Phone: ${person.phone}</p>
                <p>Address: ${person.address}</p>
                <p>City: ${person.relation}</p>
                <p>State: ${person.state}</p>
                <p>Zip-Code: ${person.zip}</p>
                <button class="btn delete_btn fa-trash" index=${index}>
  <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon fa-trash">
  <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
</svg>
</button>
            `;
            // index attribute is added so that the index associated with the appropriate element of the array is the value placed in the index attribute of the trash icon.
            document.querySelector(".contact_container").append(contact);
        });
    }
    deleteAt(index) {
        const storage = JSON.parse(window.localStorage.getItem(sessionStorage.getItem("loggedInEmail")))
        storage.splice(index, 1);
        this.contacts.splice(index, 1)
        // this is splicing (removing) the particular index - triggered by the clicking of the trashcan icon, which is in the deleteHandler function below
        let updatedContact = JSON.stringify(storage);
        window.localStorage.setItem(sessionStorage.getItem("loggedInEmail"), updatedContact);
        this.display();
        // calls the display method, so that the remaining contact cards are still displayed after the deletion of the one clicked.
    }
    // store() {
    //     let mail = document.querySelector("#in1").value;
    //     let localStorageKey = mail;
    //     let contactsData = JSON.stringify(this.contacts);
    //     localStorage.setItem(localStorageKey, contactsData);
    //   }
}


const addressBook = new AddressBook();
// making a new instance of the AddressBook class
// addressBook.add("Shivansh", "Address", "9000000001", "Dehradun");
// addressBook.add("Shivansh", "Address", "9000000001", "Dehradun");
// addressBook.add("Shivansh", "Address", "9000000001", "Dehradun");
// all of these are adding contacts to the address book
const getInfo = JSON.parse(window.localStorage.getItem(sessionStorage.getItem("loggedInEmail")))
for (let i = 0; i < getInfo.length; i++) {
    addressBook.add(getInfo[i].name, getInfo[i].phone, getInfo[i].address, getInfo[i].relation, getInfo[i].state, getInfo[i].zip)
}
addressBook.store()
addressBook.display();
// calls display method, so that the already-added contact cards are displayed on load of the window.


// to submit the contact
function handleSubmit(event) {
    event.preventDefault();
    // prevents page refresh on submission
    addressBook.add(event.target[0].value, event.target[2].value, event.target[1].value, event.target[3].value, event.target[4].value, event.target[5].value);
    // targets each input for value entered so the information can be passed into the contact object, which is ultimately pushed to the array and displayed on the DOM
    form.reset();
    // resets the form after submission so new info can be entered
    addressBook.display();
    addressBook.store();
}

function deleteHandler(event) {
    console.dir(event)
    if (event.target.classList.contains("fa-trash")) {
        const index = event.target.getAttribute("index");
        // returns the value of the attribute "index"
        addressBook.deleteAt(index);
        // this is passing the index variable (which is selecting the value of the index attribute on the element being targeted by the event) - that way that index is the one being deleted
        addressBook.display();
    }
}

function auth() {
    addressBook.authentication()
}

const form = document.querySelector("form");
const contactContainer = document.querySelector(".contact_container");
const showDetails = document.querySelector(".show")
const search = document.querySelector(".searchinput")

search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase(); // Convert input value to lowercase for case-insensitive comparison
    addressBook.contacts.forEach((contact) => {
        const isVisible = contact.name.toLowerCase().includes(value) || contact.phone.includes(value);
        // Check if the contact's name or phone contains the search value
        const contactCard = document.querySelector(`.contact_card[index="${addressBook.contacts.indexOf(contact)}"]`);
        // Get the associated contact card element using the index attribute
        if (contactCard) {
            contactCard.classList.toggle("hide", !isVisible);
            form.classList.toggle("hide", !isVisible)
        }
    });
    // form.style.display = "none";
});

search.addEventListener("input", (e) => {
    const invalue = e.target.value;
    if (invalue) {
        form.classList.add("hide")
    }
    else {
        form.classList.remove("hide")
    }
})

const formInputs = document.querySelector('.enter_info')



form.addEventListener("submit", handleSubmit);
contactContainer.addEventListener("click", deleteHandler);
// showDetails.addEventListener("click",handleSubmit)