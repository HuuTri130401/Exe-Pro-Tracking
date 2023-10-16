import { Drawer } from 'antd';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateTask from '../../components/form/CreateTask';
import EditProject from '../../components/form/EditProject';
import { closeDrawer } from '../../redux/slice/drawerSlice';

function EditDrawer() {
    const dispatch = useDispatch();
    const { isOpenDrawer, isTask } = useSelector((state) => state.drawerSlice);

    const onClose = () => {
        dispatch(closeDrawer());
    };

    return (
        <Drawer
            title={isTask ? 'Create Task' : 'Edit project'}
            placement="right"
            size={'large'}
            closable={false}
            destroyOnClose={true}
            onClose={onClose}
            open={isOpenDrawer}
        >
            {!isTask ? <EditProject /> : <CreateTask />}
        </Drawer>
    );
};
export default memo(EditDrawer);