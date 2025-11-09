import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Context/authSContext";
import "../Styles/Login.scss"; // SCSS file with glassmorphism styles
import type { UserInfo } from "../Types/types";

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(
        "https://69060c47ee3d0d14c134982d.mockapi.io/users"
      );
      const users: UserInfo[] = await res.json();
      const user = users.find(
        (user) => user.user_name === userName && user.pin === pin
      );

      if (!user) {
        alert("❌ Invalid username or PIN");
        return;
      }

      login(user);
      navigate("/dashboard");
    } catch (err) {
      alert("⚠️ Failed to connect to API: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
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
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>

        <div className="control block-cube block-input">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
          />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>

        <button
          type="submit"
          className={`btn ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading && <span className="loader"></span>}
          <span className="text">Log In</span>
        </button>
      </form>
    </div>
  );
}
