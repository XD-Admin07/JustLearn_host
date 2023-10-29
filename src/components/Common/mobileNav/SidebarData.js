import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsFillArrowDownCircleFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, NavLink, matchPath, useLocation } from "react-router-dom"


import { NavbarLinks } from "../../../data/navbar-links"
import { apiConnector } from "../../../services/apiConnector"
import { categories } from "../../../services/apis"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import logo from "../../../assets/Logo/JustLearn.png"

export function SidebarData(){
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

  const[open, setOpen]=useState(false);

    return (

        <ul className="flex-col absolute top-[60px] width-[100%] bg-black right-0 gap-x-6 text-richblack-25">
        {NavbarLinks.map((link, index) => (
          <li key={index} >
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
    )
}