import {useEffect, useState} from 'react';
import axois from "axios";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {

  const [message, setMessage] = useState("");

  useEffect(()=>{
    const fetchMessage = async ()=>{
      try{
        const response = await axois.get("http://localhost:5000/api/message");
        if(response.data.success) {
          setMessage(response.data.message);
          toast.success("Message loaded successfully!");
        }
      }catch{
        toast.error("Failed to fetch message.")
      }
    };

    fetchMessage();
  }, [])

  return (
    <div style={{textAlign : "center", marginTop : "50px"}}>
      <h1>Mini Full-Stack Project</h1>
      <p>{message}</p>
      <button onClick={()=>{
        toast.success("Button Clicked");
      }}>Test Toast</button>

      <ToastContainer position='top-right'/>
    </div>
  )
}

export default App
