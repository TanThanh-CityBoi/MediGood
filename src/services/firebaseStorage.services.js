import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "./api/firebase.config";

const uploadFileToFirebase = (
  file, // upload file
  bucketName, // String for create ref
  handleSnapshot,
  handleError,
  handleUrlRespone
) => {
  if (!file) {
    alert("Select file");
    return;
  }
  const storageRef = ref(storage, `${bucketName}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      if (handleSnapshot) {
        handleSnapshot(snapshot);
      }
    },
    (err) => {
      if (handleError) {
        handleError(err);
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
        console.log("url: ", URL);
        if (handleUrlRespone) {
          handleUrlRespone(URL);
        }
      });
    }
  );
};

const deleteFileOnFirebase = (url, handleSuccess, handleError) => {
  var fileRef = storage.refFromURL(url);

  // Delete the file
  deleteObject(fileRef)
    .then(() => {
      if (handleSuccess) {
        handleSuccess();
      }
    })
    .catch((error) => {
      if (handleError) {
        handleError(error);
      }
    });
};

export const firebaseStorageServices = {
  uploadFileToFirebase,
  deleteFileOnFirebase,
};
