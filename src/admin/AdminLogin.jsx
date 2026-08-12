import "./Admin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    /*
      DEMO LOGIN

      Username:
      admin

      Password:
      visuals20
    */

    if (
      username === "admin" &&
      password === "visuals20"
    ) {
      localStorage.setItem(
        "visuals_admin",
        "true"
      );

      navigate("/admin/dashboard");
    } else {
      setError(
        "Invalid username or password."
      );
    }
  };

  return (
    <main className="admin-login">

      <div className="admin-login-image" />

      <div className="admin-login-overlay" />

      <div className="admin-login-box">

        <div className="admin-brand">
          VISUALS<span>2.0</span>
        </div>

        <p className="admin-small">
          ADMINISTRATION
        </p>

        <h1>
          Welcome
          <br />
          <em>back.</em>
        </h1>

        <form onSubmit={handleLogin}>

          <div className="admin-input">

            <label>
              USERNAME
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter username"
            />

          </div>

          <div className="admin-input">

            <label>
              PASSWORD
            </label>

            <div className="password-input">

              <Lock size={16} />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
              />

            </div>

          </div>

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-button"
          >
            Sign In

            <ArrowRight size={18} />

          </button>

        </form>

        <p className="admin-demo-info">
          Demo login: <strong>admin</strong> /
          <strong> visuals20</strong>
        </p>

      </div>

    </main>
  );
}