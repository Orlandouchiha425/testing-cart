import { useState, useEffect } from "react";
import { uploadImage } from "../../utilities/image-upload/image-upload";

export default function ImageUploads({ image, setImage }) {
  const [files, setFiles] = useState([]);
  const [body, setBody] = useState({ img: "" });

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "exoxfqfm");
    const response = await uploadImage(formData);
    console.log(response);
    setBody({ img: response });
    setImage(response);
  };

  const handleFiles = (evt) => {
    setFiles(evt.target.files);
  };

  const doNothing = () => {
    return;
  };

  useEffect(() => {}, [setBody]);

  return (
    <div>
      {image ? doNothing : <img />}
      <form className="image-upload-form">
        <div className="image-upload-buttons">
          <label className="file-upload">
            <input
              className="file-input"
              type="file"
              name="img"
              onChange={handleFiles}
            />
          </label>
          <button type="button" className="upload-img" onClick={upload}>
            {body.img ? "Image Uploaded" : "Upload Image"}
          </button>
        </div>
      </form>
    </div>
  );
}
