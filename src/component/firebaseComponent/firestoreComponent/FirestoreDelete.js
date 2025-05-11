import { firestore } from "../../firebase";
import { deleteDoc,doc } from "firebase/firestore";

const FireStoreDelete = async(path,id) =>{
    try{
        await deleteDoc(doc(firestore,path,id));
    }catch(e){
        console.error("error",e)
    }
}
export default FireStoreDelete;