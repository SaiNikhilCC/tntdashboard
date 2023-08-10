import React, { useState, useEffect } from "react";
export default function Poll() {
  const [file, setFile] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  useEffect(() => {
    if (file.length < 1) return;
    for (let i = 0; i < file.length; i++) {
      if (file[i].size > 2097152) {
        file.pop();
        return alert("Size of file is more than 5MB");
      }
    }
    const newImageUrls = [];
    file.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
    console.log(newImageUrls);
  }, [file]);

  function uploadSingleFile(e) {
    setFile([...file, ...e.target.files]);
    console.log("file", file);
  }

  function upload(e) {
    e.preventDefault();
    console.log(file);
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
  }

  const imgContanier = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  };
  const renderSpan = {
    width: "10rem",
    height: "10rem",
    display: "flex",
    // backgroundColor: "blue",
    overflow: "hidden",
  };
  const imgStyle = {
    width: "90%",
    height: "100%",
  };

  return (
    <form>
      <div className="form-group">
        <label for="files" className="btn">
          Select Image
        </label>
        <input
          type="file"
          id="files"
          accept="image/*"
          style={{ visibility: "hidden" }}
          disabled={file.length === 5}
          className="form-control"
          onChange={uploadSingleFile}
          multiple
        />
      </div>
      
      <div className="form-group preview" style={imgContanier}>
        {file.length > 0 &&
          imageURLS.map((imageSrc, index) => (
            <span key={imageSrc} style={renderSpan}>
              <img src={imageSrc} alt="not fount" style={imgStyle} />
              <p
                style={{ cursor: "pointer" }}
                onClick={() => deleteFile(index)}
              >
                X
              </p>
            </span>
          ))}
      </div>
    </form>
  );
}
