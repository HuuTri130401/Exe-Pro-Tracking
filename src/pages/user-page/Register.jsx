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
                    { type: 'email', message: 'Please input email !' },
                    { required: true, message: 'Email Empty !' },]}>
                    <Input />
                </Form.Item>

                <Form.Item label={<span style={{ color: '#fff' }}>Password</span>} name="password" className='mb-3'
                    rules={[{ required: true, message: 'Please input password !' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item label={<span style={{ color: '#fff' }}>Confirm Password</span>} name="confirmPassword" className='mb-3'
                    rules={[{ required: true, message: 'Please input confirm password !' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item name='username' className='mb-3' label={<span style={{ color: '#fff' }}>User Name</span>} rules={[
                    { required: true, message: 'Please input user name !' },]}>
                    <Input />
                </Form.Item>

                <Form.Item name='phone' className='mb-3' label={<span style={{ color: '#fff' }}>Phone Number</span>} rules={[
                    { required: true, message: 'Please input phone number !' },
                    { max: 11, message: 'Max is 11 number' },
                    { min: 10, message: 'Min is 10 number' }]}>

                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ span: 24 }}>
                    <Link to={'/login'}>
                        Are you have an account? <span style={{color: '#cc0000'}}>Back to Login</span>
                    </Link>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" style={{padding: '4px 20px 20px 20px', textAlign: 'center'}}>
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Register;