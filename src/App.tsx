// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./context/UserContext";
import { UserProfile } from "./components/UserProfile";
import { Feed } from "./components/Feed";
// import { getToken } from "./services/AuthService";

function App() {
  // const isAuthenticated = Boolean(getToken());
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/feed" element={<Feed />} />

          {/* <Route
          path="/feed"
          element={isAuthenticated ? <Feed /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/guest" element={<GuestFeed />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={isAuthenticated ? <Notifications /> : <Navigate to="/" />}
        />
        <Route
          path="/payment"
          element={isAuthenticated ? <Payment /> : <Navigate to="/" />}
        /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
