import { database } from "../../firebase";
import { remove, ref } from "firebase/database";

const DatabaseDelete = async(path,data) =>{
    const def = ref(database,path+"/"+data);
    try{
        remove(def);
    }catch(e){
        console.error("錯誤:",e)
    }
}
export default DatabaseDelete;