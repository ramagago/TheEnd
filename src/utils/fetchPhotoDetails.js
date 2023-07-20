import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

const fetchPhotoDetails = async (uuid, setPhoto, setError, setIsPending) => {
  try {
    const photosCollectionRef = collection(db, "photos");
    const q = query(photosCollectionRef, where("uuid", "==", uuid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      setPhoto({ id: uuid, ...docData });
    } else {
      setError("Photo not found");
    }
    setIsPending(false);
  } catch (error) {
    setError(error.message);
    setIsPending(false);
  }
};

export default fetchPhotoDetails;
