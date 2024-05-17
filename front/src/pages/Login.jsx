// import { Helmet } from 'react-helmet';
import { LoginForm } from 'components/LoginForm/LoginForm';

const styles = {
  container: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: 'calc(100vh - 50px)',
    display: 'flex',
    justifyContent: 'center',
  },
};

export function Login() {
  return (
    <div style={styles.container}>
      {/* <Helmet> */}
      <title>Login</title>
      {/* </Helmet> */}
      <LoginForm />
    </div>
  );
}
