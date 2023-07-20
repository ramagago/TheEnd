import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const fetchPhotoList = async (
  currentFilter,
  setPhotos,
  setIsPending,
  setError
) => {
  try {
    const photosCollectionRef = collection(db, "photos");
    const q = query(
      photosCollectionRef,
      where("category", "==", currentFilter),
      orderBy("order")
    );
    const querySnapshot = await getDocs(q);
    const photosData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPhotos(photosData);
    setIsPending(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    setError(error.message);
    setIsPending(false);
  }
};

export default fetchPhotoList;
