import { useRef, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./imgUploder.css";
import { db, storage } from "../../firebase";
import { useSelector } from "react-redux";

function ImageUpload() {
  const [image, setImage] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const user = useSelector((state: any) => state.user);
  const [typeName, setTypeName] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const [selectErr, setSelectErr] = useState<string | null>(null);

  const allowedTypes = ["image/png", "image/jpeg"];

  const addType = (imgUrl: string) => {
    if (typeName && imgUrl) {
      db.collection("cards").doc(typeName).set({
        name: typeName,
        imgUrl: imgUrl,
      });
    } else {
      alert("Please add a name");
    }
  };

  const getMaxLetter = (str: string) => {
    if (str) {
      if (str.length > 20) {
        let test = str.substring(0, 20);
        return test + " " + "...";
      } else {
        return str;
      }
    }
  };

  const handleChange = (e: any) => {
    if (e.target.files[0] && allowedTypes.includes(e.target.files[0].type)) {
      setImage(e.target.files[0]);
      setSelectErr(null);
    } else {
      setImage(null);
      setSelectErr("Please add a png or jpg file");
    }
  };
  const handleUpload = () => {
    if (image && typeName) {
      const Rid = Math.floor(Math.random() * 1000);
      const uploadTask: any = storage
        .ref(`images/${Rid}${image?.name}`)
        .put(image)
        .on(
          "state_changed",
          (s: any) => {
            const p = Math.round((s.bytesTransferred / s.totalBytes) * 100);
            setProgress(p);
          },
          (err: any) => {
            alert(err.message);
          },
          () => {
            storage
              .ref("images")
              .child(`${Rid}${image?.name}`)
              .getDownloadURL()
              .then((url: any) => {
                console.log("this is", url);
                if (user.displayName !== null) {
                  addType(url);
                }
                setProgress(0);
                setImage(null);
                setTypeName("");
                if (input.current?.value) input.current.value = "";
              })
              .catch((err: any) => {
                console.log(err);
                alert(err);
              });
          }
        );
    } else {
      alert("Please add a Name and an Image");
    }
  };
  return (
    <form className="add_box add_boxMargin">
      <h2>Enter Details :</h2>
      <TextField
        value={typeName}
        onChange={(e) => {
          setTypeName(e.target.value);
        }}
        label="Name"
        variant="outlined"
      />
      <h3 className="uploader_Image">Upload an Image :</h3>
      {selectErr && <h3>{selectErr}</h3>}
      <div className="file_up">
        <input
          ref={input}
          className="file"
          id="file"
          type="file"
          onChange={handleChange}
        ></input>
        <label htmlFor="file">Chose an Image</label>
        <progress className="pro" value={progress} max="100"></progress>
        <h4>{getMaxLetter(image?.name)}</h4>
      </div>

      <Button onClick={handleUpload} className="box_button">
        Add
      </Button>
    </form>
  );
}

export default ImageUpload;
