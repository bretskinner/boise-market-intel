import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { SignInButton, SignUpButton, UserButton, useAuth, useUser } from "@clerk/react";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import "./App.css";


function UpgradeButton() {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const tier = user?.publicMetadata?.tier;
  const [loading, setLoading] = useState(false);

  if (!isSignedIn) return null;
  if (tier === 'pro') return null;

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const base = import.meta.env.DEV ? 'http://localhost:8888' : '';
      const res = await fetch(`${base}/.netlify/functions/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          userEmail: user?.primaryEmailAddress?.emailAddress ?? '',
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleUpgrade} disabled={loading}>
      {loading ? 'Loading...' : 'Upgrade to Pro'}
    </button>
  );
}

function AuthButtons() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <UpgradeButton />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
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
