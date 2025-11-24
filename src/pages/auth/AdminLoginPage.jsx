import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // TODO: 소셜 로그인 구현
    console.log(`${provider} 로그인`);
  };

  return (
    <div className="login-page">
      <div className="login-layout">
        {/* 왼쪽: 로그인 폼 */}
        <div className="login-form-section">
          <div className="login-form-container">
            <h1 className="login-title">Login</h1>
            <p className="login-subtitle">로그인해주세요</p>

            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@gmail.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>비밀번호기억하기</span>
                </label>
                <Link to="/admin/forgot-password" className="forgot-password-link">
                  비밀번호 찾기
                </Link>
              </div>

              <button
                type="submit"
                className="btn-login"
                disabled={loading}
              >
                {loading ? "로그인 중..." : "Login"}
              </button>

              <div className="signup-link">
                <span>계정이 없으신가요? </span>
                <Link to="#" className="signup-link-text">
                  회원가입
                </Link>
              </div>

              <div className="social-login-divider">
                <span>Or login with</span>
              </div>

              <div className="social-login-buttons">
                <button
                  type="button"
                  className="social-btn social-btn-facebook"
                  onClick={() => handleSocialLogin("facebook")}
                >
                  <span className="social-icon">f</span>
                </button>
                <button
                  type="button"
                  className="social-btn social-btn-google"
                  onClick={() => handleSocialLogin("google")}
                >
                  <span className="social-icon">G</span>
                </button>
                <button
                  type="button"
                  className="social-btn social-btn-apple"
                  onClick={() => handleSocialLogin("apple")}
                >
                  <span className="social-icon">🍎</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 오른쪽: 호텔 이미지 */}
        <div className="login-image-section">
          <div className="hotel-image-container">
            <div className="hotel-image-placeholder">
              <div className="hotel-image-content">
                <div className="image-carousel-indicators">
                  <span className="indicator active"></span>
                  <span className="indicator"></span>
                  <span className="indicator"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
