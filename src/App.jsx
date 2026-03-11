import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/react";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import "./App.css";

function AuthButtons() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <UserButton afterSignOutUrl="/" />;
  }

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <SignInButton mode="modal">
        <button className="btn">Sign in</button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="btn btn-primary">Sign up</button>
      </SignUpButton>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <div className="header-inner">
            <div className="logo">
              <span className="logo-title">Boise Market Intelligence</span>
              <span className="logo-tag">LIVE</span>
            </div>
            <nav className="nav">
              <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Dashboard
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                About
              </NavLink>
            </nav>
            <div className="header-meta">
              <span>Treasure Valley, ID</span>
              <span className="meta-dot">·</span>
              <span className="meta-live">Updated weekly</span>
              <span className="meta-dot">·</span>
              <AuthButtons />
            </div>
          </div>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="footer">
          <span>Boise Market Intelligence · Portfolio Project</span>
          <span>AI analysis via Anthropic Claude · Data is representative</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
