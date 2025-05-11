
import { database } from "../../firebase";
import { ref,set } from "firebase/database";

const DatabaseAdd = async(path,data) =>{
    const usersRef = ref(database, path);
    try{
        await set(usersRef, data)
    }catch(e){
        console.error(e)
    }
}

export default DatabaseAdd;