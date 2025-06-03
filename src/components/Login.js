// src/components/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose }) => {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login submitted');
  };

  const handleLoginWithOtp = () => {
    setShowOtpInput(true);
    // Add your OTP sending logic here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Login Form */}
        <div className="p-8">
          {!showOtpInput ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                <p className="text-gray-600 mt-1">
                  or <span className="text-orange-500 cursor-pointer">create an account</span>
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                {/* Login Method Tabs */}
                <div className="flex mb-6 border-b">
                  <button
                    type="button"
                    className={`pb-2 px-4 ${loginMethod === 'phone' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
                    onClick={() => setLoginMethod('phone')}
                  >
                    Phone Number
                  </button>
                  <button
                    type="button"
                    className={`pb-2 px-4 ${loginMethod === 'email' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
                    onClick={() => setLoginMethod('email')}
                  >
                    Email
                  </button>
                </div>

                {/* Input Fields */}
                {loginMethod === 'phone' ? (
                  <div className="mb-4">
                    <div className="flex border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-3 py-2 text-gray-500 border-r">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 px-4 py-2 focus:outline-none"
                        placeholder="Phone number"
                        maxLength="10"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="Email"
                    />
                  </div>
                )}

                {!isLoginWithOtp && (
                  <div className="mb-4 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                )}

                {/* Login Buttons */}
                {isLoginWithOtp ? (
                  <button
                    type="button"
                    onClick={handleLoginWithOtp}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Login with OTP
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Login
                  </button>
                )}

                {/* Toggle Login Method */}
                <button
                  type="button"
                  onClick={() => setIsLoginWithOtp(!isLoginWithOtp)}
                  className="w-full text-orange-500 mt-4 py-2 font-medium"
                >
                  {isLoginWithOtp ? "Login with Password" : "Login with OTP"}
                </button>
              </form>
            </>
          ) : (
            // OTP Input Screen
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h2>
              <p className="text-gray-600 mb-6">
                We've sent an OTP to {loginMethod === 'phone' ? phoneNumber : email}
              </p>

              {/* OTP Input Fields */}
              <div className="flex gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center border rounded-lg text-xl font-bold focus:outline-none focus:border-orange-500"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                type="button"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Verify OTP
              </button>

              {/* Resend OTP */}
              <p className="text-center mt-4 text-gray-600">
                Didn't receive OTP? <button className="text-orange-500 font-medium">Resend OTP</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
