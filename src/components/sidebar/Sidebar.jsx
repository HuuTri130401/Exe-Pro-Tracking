import React, { memo, useEffect, useState } from "react";
import { FaJira, FaPlus, FaQuestionCircle, FaSearch } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../redux/slice/drawerSlice";
import { logout } from "../../redux/slice/userSlice";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { IMAGE_BASE_PATH } from "../../utils/config";
import { FaInstagram, FaFacebook } from "react-icons/fa"; 

function Sidebar() {
  const [visible, setVisible] = useState(false);
  const { projectDetail } = useSelector((state) => state.projectSlice);

  useEffect(() => {
    if (!isEmpty(projectDetail)) setVisible(true);
  }, [projectDetail]);

  const handleLogout = () => {
    dispatch(logout());
  }

  const dispatch = useDispatch();
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to={"/projects"}>
          <img src={IMAGE_BASE_PATH + "favicon.png"} alt="" />
        </Link>
      </div>
      <div className="sidebar__item mb-3">
        <FaSearch className="sidebar__item-icon" />
        <span className="title">SEARCH PROJECT</span>
      </div>
      {/* {
        // <div
        //   className="sidebar__item"
        //   onClick={() => dispatch(openDrawer(true))}
        // >
        //   <FaPlus className="sidebar__item-icon" />
        //   <span className="title">CREATE TASK</span>
        // </div>
        visible && <div className="sidebar__item" onClick={() => dispatch(openDrawer(true))}>
        <FaPlus className='sidebar__item-icon' />
        <span className="title">CREATE TASK</span>
        </div>
      } */}
      <div className="sidebar__bottom">
              {/* Liên kết Instagram */}
      <a href="https://www.instagram.com/Pro_Tracking/?fbclid=IwAR0Aggc6nvnIemXag0zepsbD-v7diXybmjRPCneB8xo5hl5o_ozJ6V9DhJA" target="_blank" rel="noopener noreferrer">
        <div className="sidebar__item">
          <FaInstagram className="sidebar__item-icon" />
          <span className="title">INSTAGRAM</span>
        </div>
      </a>

      {/* Liên kết Facebook */}
      <a href="https://www.facebook.com/protracking" target="_blank" rel="noopener noreferrer">
        <div className="sidebar__item">
          <FaFacebook className="sidebar__item-icon" />
          <span className="title">FACEBOOK</span>
        </div>
      </a>
        <Link to={"/"}>
          <div className="sidebar__item" onClick={handleLogout}>
            <MdOutlineLogout className="sidebar__item-icon" />
            <span className="title">LOGOUT</span>
          </div>
        </Link>
        <div className="sidebar__item">
          <FaQuestionCircle className="sidebar__item-icon" />
          <span className="title">ABOUT</span>
        </div>
      </div>
    </div>
  );
}

export default memo(Sidebar);
