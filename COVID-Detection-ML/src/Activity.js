import React from "react";
import "./Activity.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const Activity = () => {
  const [image, setimage] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [base64String, setBase64String] = useState("");
  const [result, setResult] = useState("");
  var url = "";

  function imageUploaded(image) {
    var file = image;

    var reader = new FileReader();
    console.log("next");

    reader.onload = function () {
      setBase64String(reader.result.replace("data:", "").replace(/^.+,/, ""));
    };
    reader.readAsDataURL(file);
  }

  function PostData(e) {
    e.preventDefault();

    console.log("POSTING DATA...");
    //console.log(base64String);
    const fileType = image["type"];
    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validImageTypes.includes(fileType)) {
      // alert('invalid image format');
      toast.error("Invalid Image Type, Retry ?", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    var fileSize = image["size"];
    if (fileSize > 1000000) {
      //  alert('Photo Size Exceeds , Size must be less than 500Kb');
      toast.error("Photo Size Exceeds , Size must be less than 1MB", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    toast.info("Image Uploading ! Plese Wait !", {
      position: toast.POSITION.TOP_CENTER,
    });

    async function API() {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "gifter");
      data.append("cloud_name", "prerit-cloud");
      const responce = await fetch(
        "https://api.cloudinary.com/v1_1/prerit-cloud/image/upload",
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          toast.success("Image Upload Sucessful ! Wait a Moment !", {
            position: toast.POSITION.TOP_CENTER,
          });
          url = data.url;
          console.log(url);
          setResult("Sending request...");
          fetch("http://127.0.0.1:5000/predict", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ img: url }),
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success("Image Upload Sucessful ! Wait a Moment !", {
                position: toast.POSITION.TOP_CENTER,
              });
              setResult(data);
              // url = data.url;
              // console.log(url);
            })
            .catch((err) => {
              // console.log(err);
              toast.error("Image Upload Failed , Retry? ", {
                position: toast.POSITION.TOP_CENTER,
              });
              return;
            });
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Image Upload Failed , Retry? ", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        });
    }
    // while(base64String==''){

    // }
    API();
  }

  function handleChange(e) {
    setimage(e.target.files[0]);
    setimgUrl(URL.createObjectURL(e.target.files[0]));
    console.log("HHIII");
    console.log(e.target.files[0]);
    imageUploaded(e.target.files[0]);
  }

  return (
    <div>
      <h2>Upload Image Here</h2>
      <p class="lead">{/* No Plugins <b>Just Javascript</b> */}</p>

      <form id="file-upload-form" class="uploader">
        <input
          id="file-upload"
          type="file"
          name="fileUpload"
          onChange={handleChange}
        />

        <label for="file-upload" id="file-drag">
          {imgUrl && (
            <div
              style={{
                textAlign: "center",
                margin: "auto",
                width: "220px",
                minHeight: "120px",
                maxHeight: "auto",
              }}
            >
              <img
                id="file-image"
                src={imgUrl}
                alt="Preview"
                style={{ width: "inherit" }}
              />
            </div>
          )}
          <div id="start">
            <i class="fa fa-download" aria-hidden="true"></i>
            <div>Select a file or drag here</div>
            <div id="notimage" class="hidden">
              Please select an image
            </div>
            <span id="file-upload-btn" class="btn btn-primary">
              Select a file
            </span>
          </div>
        </label>
        {result === "Sending request..." ? (
          <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"></img>
        ) : (
          <span id="file-upload-btn" class="btn btn-primary" onClick={PostData}>
            Submit
          </span>
        )}

        <br></br>
        {result !== "" && result !== "Sending request..." ? (
          <p>
            {"Result = "}
            {/* {console.log(result[16])} */}
            {result[16] == 0 ? "Covid Positve" : "Covid Negative"}
          </p>
        ) : (
          <div></div>
        )}
      </form>
      <br />
    </div>
  );
};
