import React, {useState} from "react";
import Contact from "./Contact";
import Dependent from "./Dependent";
import MedInfo from "./medInfo";

const Dashboard = () => {

  return (
    <div className="container">

      HELLO and Welcome to Sayang. What would you like to do today?
      <div className="row">
          <div className="col"><Dependent /></div> 
          <div className="col"><Contact /></div>
          <div className="col"><MedInfo /></div> 
          </div>
    </div>
  );
};
export default Dashboard;