import React from 'react'
import { IoMdPeople } from 'react-icons/io'
import { IoMdHelpCircle } from 'react-icons/io'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { FaCartPlus } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { RiArrowDownSFill } from 'react-icons/ri'
import { RiArrowUpSFill } from 'react-icons/ri'
import { IoIosPaper } from 'react-icons/io'
import {FiSettings} from 'react-icons/fi'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {PiStudentFill} from 'react-icons/pi'
import {CgProfile} from 'react-icons/cg'
export const ProfileData=[

    {
        title:'Profile',
       // path:'/',
        icon:<AiFillHome/>,
        iconClosed:<RiArrowDownSFill/>,
        iconOpened:<RiArrowUpSFill/>,
        subNav:[
            {
                title:'My Profile',
                path:'/dashboard/my-profile',
                icon:<CgProfile/>,

            },

            {
                title:'Enrolled courses',
                path:'/dashboard/enrolled-courses',
                icon:<PiStudentFill/>,

            },
            {
                title:'Cart',
                path:"/dashboard/cart",
                icon:<AiOutlineShoppingCart/>,

            },

            {
                title:'Setting',
                path:"/dashboard/settings",
                icon:<FiSettings/>,

            },
        ]
    },
]