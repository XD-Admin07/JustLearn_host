import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsFillArrowDownCircleFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"


import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import logo from "../../assets/Logo/JustLearn.png"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

//new import
import {RiArrowDownSFill} from "react-icons/ri"
import { useDispatch} from "react-redux"
import {GrClose} from "react-icons/gr"
import { AiOutlineClose } from "react-icons/ai"
import Sidebar from './mobileNav/Sidebar';
import { useNavigate } from "react-router-dom"
import Profile from "./mobileNav/Profile";
import { logout } from "../../services/operations/authAPI"
import SubMenu from './mobileNav/SubMenu'
import {ProfileData} from './mobileNav/ProfileData'

// const subLinks = [
//   {
//     title: "Python",
//     link: "/catalog/python",
//   },
//   {
//     title: "javascript",
//     link: "/catalog/javascript",
//   },
//   {
//     title: "web-development",
//     link: "/catalog/web-development",
//   },
//   {
//     title: "Android Development",
//     link: "/catalog/Android Development",
//   },
// ];

function Navbar() {

  
  //new for mobile nav
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[open, setOpen]=useState(false);
  const [sidebarr, setSidebarr] = useState(false);
  const showSidebar = () => setSidebarr(!sidebarr);
  const hamburIcon= <AiOutlineMenu fontSize={24} fill="#AFB2BF" className=" absolute right-[5%] items-center"
  onClick={()=>setOpen(!open)}/>

  const closeIcon= <GrClose fontSize={24} fill="#AFB2BF" className=" absolute right-[5%] items-center"
  onClick={()=>setOpen(!open)}/>

  //old
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-[#55047B]" : "bg-[#55047B]"
      } transition-all duration-200`}
    >
      <div className="flex w-11/12  max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex">
          <img src={logo} alt="Logo" width={150} height={28} loading="lazy" />
          <div className="ml-2 mt-3 text-xs w-[35px] h-[17px] text-[#2CC3F2] border border-sky-500 text-center rounded-xl items-center">beta</div>
        </Link>

        {/* Navigation links mobile */}
        <nav className="block md:hidden width-[100%]">
           <div>
           <AiOutlineMenu size={30} onClick={showSidebar} className='text-white cursor-pointer'/>
           </div>
          <div className={`Slider fixed w-[180px] bg-[#55047B] h-[100%] top-0  ${sidebarr ? 'right-0' : 'right-[-100%]'} transition-all duration-350 z-20`}>
          <AiOutlineClose size={30} onClick={showSidebar} className='text-white cursor-pointer'/>
       
          <div className={`m-auto text-center`}>
          {token !== null && <Link to="/dashboard/my-profile" onClick={showSidebar}><Profile /></Link>}
          </div>
          {token !== null && (
            <div onClick={showSidebar} className="text-center mt-3">
              <button  onClick={() => {
                dispatch(logout(navigate))
                
              }} className="rounded-[8px] border border-[#9948b7] bg-[#72268e] px-[12px] py-[8px] text-richblack-100">
                LogOut
              </button>
              </div>
            
          )}
          
            {token !== null && ProfileData.map((item, index) => {
              return <div key={index} className={`text-sm`} onClick={item.title==="Profile"?null:showSidebar}><SubMenu item={item} key={index}/></div>;
               })}
          <div className="flex justify-around mt-1">
          {token === null && (
            <Link to="/login">
              <button onClick={showSidebar} className="rounded-[8px] border border-[#9948b7] bg-[#72268e] px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button onClick={showSidebar} className="rounded-[8px] border border-[#9948b7] bg-[#72268e] px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
           
          )} 
          </div>

          <ul className="gap-x-6 text-richblack-25 mt-6 text-center m-2 ">
            {NavbarLinks.map((link, index) => (
              <li key={index} className={`flex-col mt-5 text-center flex items-center border-b border-[#84d5ee]`} onClick={link.title==="Catalog"?null:showSidebar}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-[#2CC3F2]"
                          : "text-richblack-25"
                      }`}
                    >
                    <p>{link.title}</p>
                    <RiArrowDownSFill />  
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex text-sm w-[160px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-[#3a1a52] p-4 text-white opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-[#3a1a52]"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-[#6f378f]"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                     </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-[#2CC3F2]"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          </div>
          </nav>
        
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-[#2CC3F2]"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsFillArrowDownCircleFill />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-[#2CC3F2]"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-[#9948b7] bg-[#72268e] px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-[#9948b7] bg-[#72268e] px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        {/*<button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>*/}
      </div>
    </div>
  )
}

export default Navbar
