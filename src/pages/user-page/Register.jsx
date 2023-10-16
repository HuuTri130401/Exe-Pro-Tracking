import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerThunk } from '../../redux/thunk/userThunk';
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = (values) => {
        dispatch(registerThunk(values)).then(() => navigate('/login'))
    };
    const onFinishFailed = (errorInfo) => {
    };
    return (
        <div className="user__pages">
            <h2 className='user__pages-title'>Đăng ký</h2>
            <Form
                name="basic"
                layout='vertical'
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true, }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='user__pages-form'
            >
                <Form.Item name='email' className='mb-3' label={<span style={{ color: '#fff' }}>Email</span>} rules={[
                    { type: 'email', message: 'Không phải email !' },
                    { required: true, message: 'Email trống !' },]}>
                    <Input />
                </Form.Item>

                <Form.Item label={<span style={{ color: '#fff' }}>Mật khẩu</span>} name="passWord" className='mb-3'
                    rules={[{ required: true, message: 'Chưa nhập mật khẩu !' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item name='name' className='mb-3' label={<span style={{ color: '#fff' }}>Họ tên</span>} rules={[
                    { required: true, message: 'Họ tên trống !' },]}>
                    <Input />
                </Form.Item>

                <Form.Item name='phoneNumber' className='mb-3' label={<span style={{ color: '#fff' }}>Số điện thoại</span>} rules={[
                    { required: true, message: 'Số điện thoại trống !' },
                    { max: 10, message: 'Tối đa 10 chữ số' },
                    { min: 10, message: 'Tối thiểu 10 chữ số' }]}>

                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ span: 24 }}>
                    <Link to={'/login'}>
                        Bạn đã có tài khoản? <span style={{color: '#cc0000'}}>Quay lại trang đăng nhập</span>
                    </Link>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" style={{padding: '4px 20px 20px 20px', textAlign: 'center'}}>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Register;