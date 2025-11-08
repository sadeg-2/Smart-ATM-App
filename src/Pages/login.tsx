import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Context/authSContext';
import '../Styles/Login.scss';
import type { UserInfo } from '../Types/types';
import LoadingSpinner from '../Component/loading';

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false); // ✅ add loading state

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // start spinner

    try {
      const res = await fetch('https://69060c47ee3d0d14c134982d.mockapi.io/users');
      const users: UserInfo[] = await res.json();

      const user = users.find(
        (u) => u.user_name === userName && u.pin === pin
      );

      if (!user) {
        alert('❌ Invalid username or PIN');
        setLoading(false);
        return;
      }

      login(user);
      navigate('/dashboard');
    } catch (err) {
      alert('⚠️ Failed to connect to API: ' + err);
    } finally {
      setLoading(false); // stop spinner either way
    }
  };

  return (
    <div className="login-page">
      {loading ? (
        // ✅ Show spinner instead of form while loading
          <LoadingSpinner />
      ) : (
        <>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>

          <form className="form" autoComplete="off" onSubmit={handleLogin}>
            <h3>Sign In</h3>

            <div className="control block-cube block-input">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
              />
              <div className="bg-top"><div className="bg-inner"></div></div>
              <div className="bg-right"><div className="bg-inner"></div></div>
              <div className="bg"><div className="bg-inner"></div></div>
            </div>

            <div className="control block-cube block-input">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN"
              />
              <div className="bg-top"><div className="bg-inner"></div></div>
              <div className="bg-right"><div className="bg-inner"></div></div>
              <div className="bg"><div className="bg-inner"></div></div>
            </div>

            <button className="btn block-cube block-cube-hover" type="submit">
              <div className="bg-top"><div className="bg-inner"></div></div>
              <div className="bg-right"><div className="bg-inner"></div></div>
              <div className="bg"><div className="bg-inner"></div></div>
              <div className="text">Log In</div>
            </button>
          </form>
        </>
      )}
    </div>
  );
}
