
export default function About(){
    return(
        <>
       
        <div className="text-center"> 
            <h1>Our Vision</h1>
            <img src="image_path" alt="alternative_text">

            
            </img>
            <p>we want to create a bathroom website</p>
        </div>
        
        <footer>
        <div className=" bg-slate-900 m-30 rounded-lg ">
        <h2 className="font-bold indent-3 text-center">Contact Us!</h2>
        <br>
        </br>
        <ul className="indent-5">
            
        <li> <lable>Your Email Address:</lable>
         <input className=" m-auto block rounded-lg w-96 " placeholder=""></input>
         </li>
         <br></br>
        <li> <lable>Your Name:</lable>
          <input className=" m-auto block rounded-lg w-96" placeholder=""></input>
          </li>
         <br></br>
        <li>  <lable>Subject:</lable>
          <input className=" m-auto block rounded-lg w-96" placeholder=""></input>
          </li>
         <br></br>
        <li> <lable>Message:</lable>
         <input className="rounded-lg w-96 h-40 m-auto block mg-px" placeholder="enter here"></input>
         </li>
        </ul>
        <button className="  outline-black items-center rounded-full w-auto p-7 bg-slate-400"type="submit">Send Email</button>
    </div>
    </footer>
        
        
        </>
    );
}