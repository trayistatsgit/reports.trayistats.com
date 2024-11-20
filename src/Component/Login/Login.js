import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Slice/loginslice';
import mainLogo from '../../assets/images/mainLogo.png';
import loginImage from '../../assets/images/Background Circle.png';
import loginBackground from '../../assets/images/loginBackground.png';

const Login = () => {
  const [data, setData] = useState({ userName: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName, password } = data;
  const { status, error } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ userName, password }));
    if (result.payload) {
      localStorage.setItem('tsToken', result.payload.token);
      navigate('/');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.body.classList.add('no-sidebar');
    document.body.style.overflow = 'hidden'; 
    return () => {
      document.body.classList.remove('no-sidebar');
      document.body.style.overflow = 'auto';  
    };
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden">
      <img src={loginBackground} alt="Trayistats background" className="w-full absolute z-0" />
      <div className="flex flex-col items-center p-8 bg-cover bg-center w-full lg:w-1/2 justify-center z-10">
        <img src={mainLogo} alt="Trayistats Logo" className="w-24 mb-6" />
        <h1 className="text-2xl font-semibold text-customPurple mb-2 text-center">Welcome!</h1>
        <p className="text-customPurple text-center mb-4 text-lg leading-7">This tool is designed to generate and view personalized <br /> reports for internal tracking and analysis.</p>
        <p
          className="text-lg font-medium text-transparent bg-clip-text mb-8"
          style={{
            backgroundImage: 'linear-gradient(90deg, #9F7AE8 0%, #594482 100%)',
          }}
        >
          Login into Using
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div className="space-y-2">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="userName"
              name="userName"
              value={userName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md "
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 text-sm"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-[219px] h-[60px] text-white rounded-md font-semibold hover:opacity-90"
            style={{
              backgroundImage: 'linear-gradient(90deg, #9F7AE8 0%, #594482 100%)',
            }}
          >
            {status === 'loading' ? 'Loading...' : 'Login'}
          </button>

          {status === 'failed' && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>

      {/* Right side: Image */}
      <div className="hidden lg:block">
        <img src={loginImage} alt="Login Illustration" className="w-[650px] h-[699.37px] relative z-10" />
      </div>
    </div>
  );
};

export default Login;
