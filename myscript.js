// Declare variables properly
var rollV, nameV, genderV, addressV, emailV, usernameV;

// Function to read form inputs
function readForm() {
  // Fix typo in function name and variable names
  rollV = document.getElementById("roll").value;
  nameV = document.getElementById("name").value;
  genderV = document.getElementById("gender").value;
  addressV = document.getElementById("address").value;
  emailV = document.getElementById("email").value;
  usernameV = document.getElementById("username").value;

  console.log(rollV, nameV, genderV, addressV, emailV, usernameV);
}

// Insert data
document.getElementById("insert").onclick = function () {
  readForm();

  firebase.database().ref("student/" + rollV).set({
    rollNo: rollV,
    name: nameV,
    gender: genderV,
    address: addressV,
    email: emailV,
    username: usernameV,
  }).then(() => {
    alert("Data Inserted");
    // Clear form after insertion
    clearForm();
  }).catch((error) => {
    console.error("Error inserting data:", error);
  });
};

// Read data
document.getElementById("read").onclick = function () {
  readForm();

  firebase.database().ref("student/" + rollV).once("value").then((snap) => {
    if (snap.exists()) {
      const data = snap.val();
      document.getElementById("roll").value = data.rollNo;
      document.getElementById("name").value = data.name;
      document.getElementById("gender").value = data.gender;
      document.getElementById("address").value = data.address;
      document.getElementById("email").value = data.email;
      document.getElementById("username").value = data.username;
    } else {
      alert("No data found for this roll number");
    }
  }).catch((error) => {
    console.error("Error reading data:", error);
  });
};

// Update data
document.getElementById("update").onclick = function () {
  readForm();

  firebase.database().ref("student/" + rollV).update({
    name: nameV,
    gender: genderV,
    address: addressV,
    email: emailV,
    username: usernameV,
  }).then(() => {
    alert("Data Updated");
    clearForm();
  }).catch((error) => {
    console.error("Error updating data:", error);
  });
};

// Delete data
document.getElementById("delete").onclick = function () {
  readForm();

  firebase.database().ref("student/" + rollV).remove()
    .then(() => {
      alert("Data Deleted");
      clearForm();
    }).catch((error) => {
      console.error("Error deleting data:", error);
    });
};

// Helper function to clear form fields
function clearForm() {
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
}