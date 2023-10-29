import React, { useState } from 'react';
import { Link } from 'react-router-dom';




const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);
  
    const showSubnav = () => setSubnav(!subnav);
  
    return (
      <>
        <Link to={item.path} onClick={item.subNav && showSubnav}
        className='m-auto mt-4 flex text-[#2CC3F2]'>
          <div className='flex text-center m-auto items-center' >
            <div className='mb-1 mr-1'>{item.icon}</div>
            <div>{item.title}</div>
            <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
          </div>
          
        </Link>
        
        {subnav &&
          item.subNav.map((item, index) => {
            return (
              <Link to={item.path} key={index}
              className='text-center flex m-auto bg-[#400753] text-[#98dff5]'>
                <div className='flex m-auto mt-2 items-center'>
                <div className='mr-1'>{item.icon}</div>
                <div>{item.title}</div>
                </div>
              </Link>
            );
          })}
          
      </>
    );
  };
  
  export default SubMenu;
  