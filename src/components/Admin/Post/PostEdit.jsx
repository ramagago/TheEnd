import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../firebase";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const PostEdit = () => {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/AdminLogin"); // Redirige al componente AdminLogin si no hay usuario loggeado
      }
    });

    return () => unsubscribe();
  }, [history]);

  const { id, uuid, filter } = useParams();
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [brand, setBrand] = useState("");
  const [brandLink, setBrandLink] = useState("");
  const [model, setModel] = useState("");
  const [modelLink, setModelLink] = useState("");
  const [makeup, setMakeup] = useState("");
  const [makeupLink, setMakeupLink] = useState("");
  const [category, setCategory] = useState("fashion");
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const docRef = doc(db, "photos", id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setPost(data);
          setTitle(data.title);
          setLocation(data.location);
          setLocationLink(data.locationLink);
          setCategory(data.category);
          setBrand(data.brand);
          setBrandLink(data.brandLink);
          setModel(data.model);
          setModelLink(data.modelLink);
          setMakeup(data.makeup);
          setMakeupLink(data.makeupLink);
        } else {
          console.log("Photo not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostData();
  }, [uuid, id]);

  const handleUpload = async (e) => {
    e.preventDefault();

    setUploaded(false);
    setIsUploading(true);

    const imageId = uuid;
    const imageRef = ref(storage, `images/${imageId}`);

    // Si no hay una nueva imagen seleccionada, simplemente actualiza los datos sin subir una imagen nueva

    if (!imageUpload) {
      const updatedData = {
        title: title,
        location: location,
        locationLink: locationLink,
        category: category,
        brand: brand,
        brandLink: brandLink,
        model: model,
        modelLink: modelLink,
        makeup: makeup,
        makeupLink: makeupLink,
        url: post.url, // Mantén la misma URL de la imagen anterior
      };

      try {
        await updateDoc(doc(db, "photos", id), updatedData);
        setIsUploading(false);
        setUploaded(true);
        setTitle("");
        setLocation("");
        setLocationLink("");
        setBrand("");
        setBrandLink("");
        setModel("");
        setModelLink("");
        setMakeup("");
        setMakeupLink("");
        setCategory("fashion");
        setImageUpload(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Si hay una nueva imagen seleccionada, realiza el proceso de carga de la imagen y actualización de datos

      // Elimina la imagen anterior de Firebase Storage
      const previousImageRef = ref(storage, `images/${imageId}`);
      try {
        await deleteObject(previousImageRef);

        // Sube la nueva imagen a Firebase Storage
        const snapshot = await uploadBytes(imageRef, imageUpload);
        const url = await getDownloadURL(snapshot.ref);

        const updatedData = {
          title: title,
          location: location,
          locationLink: locationLink,
          category: category,
          brand: brand,
          brandLink: brandLink,
          model: model,
          modelLink: modelLink,
          makeup: makeup,
          makeupLink: makeupLink,
          url: url,
        };
        // Actualizar los datos en Firestore
        try {
          await updateDoc(doc(db, "photos", id), updatedData);
          setIsUploading(false);
          setUploaded(true);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="post-container">
      <Link to={`/PhotoListAdmin/${filter}`} className="back-arrow-post">
        <FaArrowLeft />
      </Link>
      <div style={{ height: "75px", marginBottom: "15px" }}></div>
      <form className="form-container" action="" onSubmit={handleUpload}>
        <div className="form-group">
          <input
            className="form-input"
            placeholder=" "
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label className="form-label" htmlFor="title">
            Title:
          </label>
          <span className="form-span"></span>
        </div>
        <div className="form-duo-group">
          <div className="form-group">
            <input
              className="form-input"
              id="location"
              type="text"
              placeholder=" "
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />

            <label className="form-label" htmlFor="location">
              Location:
            </label>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              id="location-link"
              type="text"
              placeholder=" "
              value={locationLink}
              onChange={(e) => {
                setLocationLink(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="location-link">
              Location link:
            </label>
          </div>
        </div>
        <div className="form-duo-group">
          <div className="form-group">
            <input
              className="form-input"
              id="brand"
              type="text"
              placeholder=" "
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="brand">
              Brand:
            </label>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              id="brand-link"
              type="text"
              placeholder=" "
              value={brandLink}
              onChange={(e) => {
                setBrandLink(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="brand-link">
              Brand Link:
            </label>
          </div>
        </div>
        <div className="form-duo-group">
          <div className="form-group">
            <input
              className="form-input"
              id="model"
              type="text"
              placeholder=" "
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="model">
              Model
            </label>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              id="model-link"
              type="text"
              placeholder=" "
              value={modelLink}
              onChange={(e) => {
                setModelLink(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="model-link">
              Model Link
            </label>
          </div>
        </div>
        <div className="form-duo-group">
          <div className="form-group">
            <input
              className="form-input"
              id="makeup"
              type="text"
              placeholder=" "
              value={makeup}
              onChange={(e) => {
                setMakeup(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="makeup">
              Make Up:
            </label>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              id="makeup-link"
              type="text"
              placeholder=" "
              value={makeupLink}
              onChange={(e) => {
                setMakeupLink(e.target.value);
              }}
            />

            <label className="form-label" htmlFor="makeup-link">
              Make Up Link:
            </label>
          </div>
        </div>
        <div className="form-duo-group">
          <div className="form-group form-group-category">
            <label className="form-label-category" htmlFor="category">
              Category
            </label>
            <select
              value={category}
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="fashion">Fashion</option>
              <option value="interiorDesign">Interior Design</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>
          <div className="form-group form-group-file">
            <input
              className="form-file"
              type="file"
              id="foto"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            ></input>
            <label className="form-file-label" htmlFor="foto">
              {imageUpload ? imageUpload.name : "Choose your file"}
            </label>
          </div>
        </div>
        <div className="form-group">
          <button className="btn-submit" type="submit">
            Update Photo
          </button>
        </div>
        {uploaded && <p className="form-state">Image successfully loaded</p>}
        {isUploading && <p className="form-state">Uploading image</p>}
      </form>
    </div>
  );
};

export default PostEdit;
