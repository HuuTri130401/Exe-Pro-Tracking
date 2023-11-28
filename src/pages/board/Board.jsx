import parser from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DragDrop from "../../components/drag-drop/DragDrop";
import { Button } from "antd";
import { openDrawer } from "../../redux/slice/drawerSlice";
import { getProjectDetailThunk } from "../../redux/thunk/projectThunk";
import TaskModal from "../../components/task/TaskModal";
import UserManagement from "../../components/board/UserManagement";

const Board = (props) => {
  const param = useParams();
  const [isOpenUserManagement, setIsOpenUserManagement] = useState(false);
  const { projectDetail } = useSelector((state) => state.projectSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectDetailThunk(param.id));
  }, []);

  return (
    <div className="mt-3 h-100">
      <div>
        <h6 className="mb-3">
          Project name: {projectDetail?.projectById?.title}
        </h6>
        <section className='mb-3'>
          <span>{parser(`${projectDetail?.projectById?.description}`)}</span>
        </section>
      </div>

      <Button type="default" onClick={() => dispatch(openDrawer(true))} style={{ marginRight: "10px" }}> Create Task </Button>
      <Button type="default" onClick={() => setIsOpenUserManagement(true)}> User Management </Button>
      <UserManagement isOpenUserManagement={isOpenUserManagement} setIsOpenUserManagement={setIsOpenUserManagement} />
      <DragDrop projectDetail={projectDetail} />
      <TaskModal />
    </div>
  );
};

export default Board;
