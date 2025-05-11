import { auth } from "../../firebase";
const AuthDelete = async() =>{
    try{
        await auth.currentUser.delete();
    }catch(e){
        console.error("error",e);
    }
}
export default AuthDelete;