import { useState } from 'react';
import { login, register } from '../api/auth';
import styles from '../components/styles/LoginForm.module.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response: any = isRegistering
        ? await register(username, password)
        : await login(username, password);
      const { accessToken, refreshToken } = response;
      Cookies.set('accessToken', accessToken, { path: '/', sameSite: 'strict' });
      Cookies.set('refreshToken', refreshToken, { path: '/', sameSite: 'strict' });
      navigate('/payments');
    } catch (err) {
      setError('Failed to authenticate. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isRegistering ? 'Register' : 'Login'}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username:</label>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
