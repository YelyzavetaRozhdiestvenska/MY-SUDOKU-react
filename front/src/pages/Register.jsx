// import { Helmet } from 'react-helmet';
import { RegisterForm } from 'components/RegisterForm/RegisterForm';

const styles = {
  container: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: 'calc(100vh - 50px)',
    display: 'flex',
    justifyContent: 'center',
  },
};

export function Register() {
  return (
    <div style={styles.container}>
      {/* <Helmet> */}
      <title>Registration</title>
      {/* </Helmet> */}
      <RegisterForm />
    </div>
  );
}
