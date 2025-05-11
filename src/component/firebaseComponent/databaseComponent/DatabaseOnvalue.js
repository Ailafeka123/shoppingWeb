import { database } from "../../firebase";
import { onValue,ref } from "firebase/database";

const DatabaseOnvalue = (path) =>{
    const Ref = ref(database,path);
    onValue(Ref,(snapshot)=>{
        const data = snapshot.val();
        return true;
    })
}
export default DatabaseOnvalue;