import parser from "html-react-parser";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DragDrop from "../../components/drag-drop/DragDrop";
import Filter from "../../components/filter/Filter";
import { Button } from "antd";
import { openDrawer } from "../../redux/slice/drawerSlice";
import { getProjectDetailThunk } from "../../redux/thunk/projectThunk";
import { isEmpty } from "lodash";
import TaskModal from "../../components/modal/TaskModal";

const Board = (props) => {
  const param = useParams();
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
        {/* <section className="mb-3">
          <span>Description: {projectDetail?.projectById?.description}</span>
        </section> */}
        <section className='mb-3'>
             <span>{parser(`${projectDetail?.projectById?.description}`)}</span>
         </section>
      </div>
      {/* <Filter projectDetail={projectDetail} /> */}
      <Button type="primary" onClick={() => dispatch(openDrawer(true))}> Create Task </Button>
      <DragDrop projectDetail={projectDetail} />
      <TaskModal />
    </div>
  );
};

export default Board;
