import React, { memo, useEffect, useState } from "react";
import { FaJira, FaPlus, FaQuestionCircle, FaSearch } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../redux/slice/drawerSlice";
import { logout } from "../../redux/slice/userSlice";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

function Sidebar() {
  const [visible, setVisible] = useState(false);
  const { projectDetail } = useSelector((state) => state.projectSlice);

  useEffect(() => {
    if (!isEmpty(projectDetail)) setVisible(true);
  }, [projectDetail]);

  const dispatch = useDispatch();
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to={"/projects"}>
          <img src="./img/favicon.png" alt="" />
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
        <div className="sidebar__item" onClick={() => dispatch(logout())}>
          <MdOutlineLogout className="sidebar__item-icon" />
          <span className="title">LOGOUT</span>
        </div>
        <div className="sidebar__item">
          <FaQuestionCircle className="sidebar__item-icon" />
          <span className="title">ABOUT</span>
        </div>
      </div>
    </div>
  );
}

export default memo(Sidebar);
