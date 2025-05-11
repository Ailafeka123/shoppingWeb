import { firestore } from "../../firebase";
import { collection, getDocs,query,where} from "firebase/firestore";

const FireStoreReadAll = async(path,searchkey="",method="",search="") =>{
    let Ref = collection(firestore,path);
    if(search){
        Ref = query(Ref,where(searchkey,method,search));
    }

    try{
        const data = await getDocs(Ref)
        return data;
    }catch(e){
        console.error("錯誤:",e);
    }
}
export default FireStoreReadAll;