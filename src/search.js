import{app,database} from './component/firebase';
import{ref, set,update, push, child, get} from 'firebase/database';
//set
function setData () {
  const newKey= push(child(ref(database), 'users')).key;
  console.log(`執行寫入`)
  console.log(newKey)
  set(ref(database, 'user/'),{
    username:'set-username'+newKey,
  });
}
//update
function updateData(){
  const newKey = push(child(ref(database), 'users')).key;
  console.log(`執行更新`)
  console.log(newKey)
  update(ref(database), {
    ['users/']:{
      username: 'update-username'+newKey
    }
  });
}
//讀取
function readData(name,eleID){
  const dbRef = ref(database);
  get(child(dbRef, name+'/')).then((snapshot) => {
    if(snapshot.exists()) {
      console.log(snapshot.val());
      console.log(snapshot.val()[`username`])
      document.getElementById(eleID).textContent=`username = ${snapshot.val()[`username`]}`;
    } else {
      console.log('沒有資料');
      document.getElementById(eleID).textContent=`查無資料`;
    }
    }).catch((error) => {
      console.error(error);
    });
}

export {readData,update,setData};