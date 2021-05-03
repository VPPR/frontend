import { toast } from "react-toastify";
import BandZipActions from "./action.type";

export const Upload = (files) => ({
    type: BandZipActions.UPLOAD,
    payload: files,
});

export const UploadSuccess = () =>{
    console.log("test");
    toast.success("lllalllllll",{
        position:"top-center"
    });
    return ({
    type: BandZipActions.UPLOAD_SUCCESS,
});}

export const UploadFailure = (error) => ({
    type: BandZipActions.UPLOAD_FAILURE,
    payload: error,
});
