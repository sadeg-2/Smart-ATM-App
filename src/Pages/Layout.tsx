import { Link, Outlet } from 'react-router-dom';
import '../Styles/Layout.css'; // optional for styling

function Layout() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/deposit">Deposit</Link>
        <Link to="/withdraw">Withdraw</Link>
        <Link to="/history">History</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/">Login</Link>
      </nav>

      {/* Main content area */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
