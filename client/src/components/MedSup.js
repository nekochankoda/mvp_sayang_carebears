import React, { useEffect, useState } from 'react';

export default function MedSup(props) {
  let [medsup, setMedSup] = useState([]);
  let [input, setInput] = useState({});

  
  useEffect(() => {
      getMedSup();
  }, []);

  const getMedSup = () => {
    fetch("/medsup")
        .then(response => response.json())
        .then(medsup => {
            console.log(medsup);
            setMedSup(medsup);
        })
        .catch(error => {
            console.log("Error in medsup");
        });
  };

  const handleChange = e => {
    //console.log(e.target.value); // to check on input
    setInput({ ...input, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    addMedSup();
    return false;
  };

  /* const handleRemove = (e, medID) => {
    console.log(medID);
    deleteMedSup(medID);
  }; */

  //ADD NEW MEDICATIOn & SUPPLEMENTS
  const addMedSup = () => {
    fetch("/medsup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
      .then(res => {
        return res.json();
        })
      .then(data => {
        setMedSup(data);
        console.log("New Meds Added", data);
      })
      .catch(error => {
        console.error("Error", error);
      });
  };

  //DELETE CONTACT by ID
  const deleteMedSup = medID => {
    //console.log("in Fetch", id); //to check if it's passing through
    fetch(`/medsup/${medID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        console.log(res);
        setMedSup(res);
        console.log("Meds Deleted");
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  return (
    <div>
    <div className="col-4 container rounded-3 border border-primary bg-light p-4 mt-3">
      <h4>Medication & Supplement</h4>
        {medsup.map(item => {
          return (
            <ul key={item.medID}>
            <li>Dependent ID: {item.depID}</li>
            <li>Name: {item.medName}</li>
            <li>Type: {item.medType}</li>
            <li>Condition: {item.medCondition}</li>
            <li>Dosage: {item.dosage}</li>
            <li>Frequency: {item.frequency}</li>
            </ul> 
          );
        })}

    <h4>Add New Medication / Supplement</h4>
      <small className="text-muted">Enter Medication and Supplements here</small>
        <div className="form-group">
         <form>

         <label for="depID">Enter Dependent ID</label>
            <input
             id="depID"
             type="int"
             className="form-control"
             placeholder="Enter Dependent ID"
             name="depID"
             onChange={(e) => handleChange(e)}
            />

        <label for="medName">Meds / Supplement Name</label>
            <input
             id="medName"
             type="text"
             className="form-control"
             placeholder="Enter Meds/Supplement Name"
             name="medName"
             onChange={(e) => handleChange(e)}
            />
          
        <label for="medType">Medication or Supplement?</label>
            <input
             id="medType"
             type="text"
             className="form-control"
             placeholder="Enter Medication or Supplement"
             name="medType"
             onChange={(e) => handleChange(e)}
            />

        <label for= "medCondition">Condition</label>
            <input
              id="medCondition"
              type="text"
              className="form-control"
              placeholder="What condition is this meds/supplement for?"
              name="medCondition"
              onChange={(e) => handleChange(e)}
             />

        <label for= "dosage">Dosage</label>
            <input
              id="dosage"
              type="text"
              className="form-control"
              placeholder="e.g 2 tablets"
              name="dosage"
              onChange={(e) => handleChange(e)}
            />

        <label for= "frequency">Frequency</label>
            <input
              id="frequency"
              type="text"
              className="form-control"
              placeholder="e.g 3 times/day"
              name="frequency"
              onChange={(e) => handleChange(e)}
            />

        <button onClick ={(e) => handleSubmit(e)}
            className="btn btn-outline-primary rounded-pill btn-block"
            type="submit"
            value="submit"
        >Submit MedSup
        </button>

        </form>
      </div>    
    </div>
    </div>
  );
}