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
      <h2 className='user__pages-title'>Đăng nhập</h2>
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

        <Form.Item
          wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" style={{padding: '4px 20px 20px 20px', textAlign: 'center'}}>
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}>
          <Link to={'/register'}>
            Bạn chưa có tài khoản? <span>Đăng ký ngay</span>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};



export default Login;