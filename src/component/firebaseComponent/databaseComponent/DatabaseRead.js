
import { database } from "../../firebase";
import { get,ref } from "firebase/database";

const DatabaseRead = async(path) =>{
    const Ref = ref(database,path);
    try{
        const snapshot = await get(Ref);
        if(snapshot.exists()){
            const usersData = snapshot.val();  // 獲取所有資料
            return (usersData);
        }else{
        }
    }catch(e){
        console.error("錯誤:",e)
    }
}
export default DatabaseRead;