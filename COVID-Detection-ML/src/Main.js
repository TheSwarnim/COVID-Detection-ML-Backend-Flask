import React from "react";
import Fade from 'react-reveal/Fade';
export default function Main() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <center>
      <Fade top>
        <h1 style={{ color: "#072a40", fontSize: "2rem" }}>Covid 19 Prediction</h1></Fade>
      </center>
      <Fade top>
      <div style={{ width: "100%", textAlign: "center" , marginBottom:"20px"}} className="style">
        <div
          // style={{
          //   width: "100%",
          //   margin: "10px",
          //   padding: "10px",
          //   textAlign: "left",
          //   border: "1px solid #888888",
          //   boxShadow: "5px 2px 10px #888888",
          //   borderRadius: "10px"
          // }}
        >
          <center><h2 style={{color: "#ff5f00"}}>What is Covid-19?</h2></center>
          <p>
            COVID-19 is a new strain of coronavirus that has not been previously
            identified in humans. The COVID-19 is the cause of an outbreak of
            respiratory illness first detected in Wuhan, Hubei province, China.
            Since December 2019, cases have been identified in a growing number
            of countries. The District’s surveillance data can be found here.
            Coronaviruses are a large family of viruses that are known to cause
            illness ranging from the common cold to more severe diseases such as
            Severe Acute Respiratory syndrome (SARS) and Middle East Respiratory
            Syndrome (MERS).
          </p>
        </div>
      </div>
      </Fade>
      <Fade top>
      <div style={{ width: "100%", textAlign: "center" }} className="style">
        <div
          // style={{
          //   width: "100%",
          //   margin: "10px",
          //   padding: "10px",
          //   textAlign: "left",
          //   border: "1px solid #888888",
          //   boxShadow: "5px 2px 10px #888888",
          //   borderRadius: "10px"
          // }}
        >
          <center><h2 style={{color: "#ff5f00"}}>About Website</h2></center>
          <p>
          COVID-19 pandemic is one of the biggest challenges for the healthcare system right now. It is a respiratory disease that affects our lungs and can cause lasting damage to the lungs that led to symptoms such as difficulty in breathing and in some cases pneumonia and respiratory failure. In this article, we will use X-ray data of lungs normal and COVID positive patients and train a model to differentiate between them.
          </p>
        </div>
      </div>
      </Fade>
    </div>
  );
}
