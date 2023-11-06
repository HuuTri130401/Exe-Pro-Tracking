import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginThunk } from '../../redux/thunk/userThunk';
const Login = () => {

  // const { messageNoti } = useSelector(state => state.jiraSlice);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(loginThunk(values));
  };
  const onFinishFailed = (errorInfo) => {

  };
  return (
    <div className="user__pages">
      <h2 className='user__pages-title'>Login</h2>
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

        <Form.Item label={<span style={{ color: '#fff' }}>Password</span>} name="passWord" className='mb-3'
          rules={[{ required: true, message: 'Please input password !' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" style={{padding: '4px 20px 20px 20px', textAlign: 'center'}}>
            Login
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}>
          <Link to={'/register'}>
            Are you have an account? <span style={{color: '#cc0000'}}>Sign Up</span>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};



export default Login;