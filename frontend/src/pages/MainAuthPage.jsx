import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clubLogin, clubRegister } from "../api/clubApi";
import { Button } from "../components/main-ui/Button";
import { Input } from "../components/main-ui/Input";
import { Label } from "../components/main-ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/main-ui/Card";
import { motion, AnimatePresence } from "framer-motion"; // For smooth animations
import { Eye, EyeOff } from "lucide-react"; // For password toggle

const MainAuthPage = ({ setAuth }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Login state
  const [loginData, setLoginData] = useState({ club_email: "", club_password: "" });

  // Register state
  const [registerData, setRegisterData] = useState({
    name: "",
    description: "",
    club_email: "",
    club_password: "",
    mission: "",
    vision: "",
    contact_info: ""
  });

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter(d => ({ ...d, [name]: value }));
    setError("");
  };

  const handleLogin = async e => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await clubLogin(loginData);

    if (res.status === "success" && res.token) {
  const authObj = {
    userType: "club",
    token: res.token,
    club: res.club
  };

  setAuth(authObj); // This auto-saves to localStorage via App.js useEffect
  navigate("/dashboard"); // Redirect to dashboard
} else {
  setError(res.message || "Invalid credentials");
}
  } catch (err) {
    setError(err.message || "Network error. Please try again.");
  }
};


  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await clubRegister(registerData);
      setTab("login");
      setLoginData({ club_email: registerData.club_email, club_password: "" });
      setRegisterData({
        name: "", description: "", club_email: "", club_password: "",
        mission: "", vision: "", contact_info: ""
      });
      alert("Registration successful! You can now log in.");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <Card className="w-full max-w-lg shadow-2xl border border-purple-200">
        <CardHeader className="text-center space-y-2 pb-4 border-b border-purple-200">
          <CardTitle className="text-3xl font-extrabold text-purple-700">Club Portal</CardTitle>
          <div className="text-sm text-purple-500">Login or Register to manage your club</div>
          <div className="mt-4 flex justify-center space-x-3">
            <Button
              variant={tab === "login" ? "default" : "outline"}
              className="transition-all duration-300"
              onClick={() => setTab("login")}
            >
              Login
            </Button>
            <Button
              variant={tab === "register" ? "default" : "outline"}
              className="transition-all duration-300"
              onClick={() => setTab("register")}
            >
              Register
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {error && <div className="mb-3 text-red-600 text-center font-medium">{error}</div>}

          <AnimatePresence exitBeforeEnter>
            {tab === "login" ? (
              <motion.form
                key="login"
                onSubmit={handleLogin}
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <Label htmlFor="club_email">Email</Label>
                  <Input
                    id="club_email"
                    name="club_email"
                    type="email"
                    placeholder="yourclub@vit.edu"
                    value={loginData.club_email}
                    onChange={e => handleChange(e, setLoginData)}
                    required
                  />
                </div>
                <div className="relative">
                  <Label htmlFor="club_password">Password</Label>
                  <div className="relative">
                    <Input
                      id="club_password"
                      name="club_password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginData.club_password}
                      onChange={e => handleChange(e, setLoginData)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700"
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                onSubmit={handleRegister}
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <Label>Club Name</Label>
                  <Input name="name" value={registerData.name} onChange={e => handleChange(e, setRegisterData)} required />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input name="description" value={registerData.description} onChange={e => handleChange(e, setRegisterData)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input name="club_email" type="email" value={registerData.club_email} onChange={e => handleChange(e, setRegisterData)} required />
                </div>
                <div className="relative">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      name="club_password"
                      type={showPassword ? "text" : "password"}
                      value={registerData.club_password}
                      onChange={e => handleChange(e, setRegisterData)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700"
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label>Mission</Label>
                  <Input name="mission" value={registerData.mission} onChange={e => handleChange(e, setRegisterData)} />
                </div>
                <div>
                  <Label>Vision</Label>
                  <Input name="vision" value={registerData.vision} onChange={e => handleChange(e, setRegisterData)} />
                </div>
                <div>
                  <Label>Contact Info</Label>
                  <Input name="contact_info" value={registerData.contact_info} onChange={e => handleChange(e, setRegisterData)} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainAuthPage;
