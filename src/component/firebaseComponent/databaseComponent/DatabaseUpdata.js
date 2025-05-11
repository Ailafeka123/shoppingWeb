import { database } from "../../firebase";
import { update,ref } from "firebase/database";
const DatabaseUpdata = async(path,data) =>{
    const updata = {};
    updata[path] = data;
    try{
        await update(ref(database),updata)
    }catch(e){
        console.error(e);
    }
}
export default DatabaseUpdata;