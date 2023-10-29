import React from 'react'
import { SidebarData } from './SidebarData'
import {AiOutlineMenu} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const [sidebarr, setSidebarr] = useState(false);

  const showSidebar = () => setSidebarr(!sidebarr);
  return (
    <>
    <div className="w-[100%] h-[80px] bg-black">
        <div className='ml-[20px] pt-5'>
       <AiOutlineMenu size={40} onClick={showSidebar} className='text-white cursor-pointer'/>
       </div >
       
        
    </div>
    <div sidebarr={sidebarr} className={`w-[180px] bg-black h-[100%] top-0 fixed flex ${sidebarr ? 'left-0' : 'left-[-100%]'} transition-all duration-350 z-10`}>
    <div className='ml-[20px] pt-5'>
    <AiOutlineClose size={40} onClick={showSidebar} className='text-white cursor-pointer'/>
    <div className='wrap mt-5'>
    <div className='Profile w-[70px] h-[70px] rounded-[50%] m-auto border'></div>
    <div className='flex justify-between mt-5'>
    
    <button to="/logout" className='text-white border w-[70px] m-auto h-[30px]'>Log Out</button>
   
    </div>

    <div className='flex justify-between mt-5'>
    
    <button to="/login" className='text-white border w-[50px] h-[30px]'>Login</button>
    <button to="/signup" className='text-white border w-[60px] h-[30px]'>SignUp</button>
    </div>
    <SidebarData/>
  
    {/*{SidebarData.map((item,index)=>{
       return (
         <div  className='text-white flex-col m-5 text-center border-b border-solid border-white'>
            <sidelabel to={item.path} key={index} className="cursor-pointer">{item.title}</sidelabel>
          </div>
       )
    })}*/}
    </div>
    </div>
    </div >
    </>
  )
}
