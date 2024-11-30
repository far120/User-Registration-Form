import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RegistrationForm(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [strengthpassword, setstrengthPassword] = useState(0);

  // Handle input changes
  const handleChange = (e) => {
    const updatedValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: updatedValue,
    }));
  
    if (e.target.name === "password") {
      evaluatestrengthPassword(updatedValue);
    }
  };
 
  function evaluatestrengthPassword(password){
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]+/)) strength += 25
    if (password.match(/[A-Z]+/)) strength += 25
    if (password.match(/[0-9]+/)) strength += 25
    setstrengthPassword(strength)
  }


  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.name.length > 0)
         newErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (formData.agreeToTerms) {
      if (Object.keys(validationErrors).length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        }));
        setErrors(validationErrors);
        setstrengthPassword(0)
        toast.error('Failed Registration', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setErrors({});
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
          });
          setstrengthPassword(0)

        toast.success('Registration successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        agreeToTerms: false,
      }));
      setErrors(validationErrors);
    }
  };




  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center ">
           RegistarNow
        </h2>
        {/* Name Field */}
        <div className="mb-4"  >
        <label className="block mb-1 text-base"  style={{fontStyle:"arial"}}  htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border rounded border-[#007BFF]"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-700 text-sm">{errors.name}</p>}
        </div>
  
        {/* Email Field */}
        <div className="mb-4">
        <label className="block mb-1 text-base"  style={{fontStyle:"arial"}}  htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded border-[#007BFF]"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-700 text-sm">{errors.email}</p>}
        </div>
  
        {/* Password Field */}
        <div className="mb-4">
        <label className="block mb-1 text-base"  style={{fontStyle:"arial"}} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded border-[#007BFF]"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
          />
             <div
            className={`w-full h-2 mt-2 rounded ${
              strengthpassword < 50
                ? "bg-red-500"
                : strengthpassword < 75
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${strengthpassword}%` }}
          ></div>
          <p className="text-sm text-gray-500">Password strength: {strengthpassword}%</p>
          {errors.password && (
            <p className="text-red-700 text-sm">{errors.password}</p>
          )}
        </div>
  
        {/* Confirm Password Field */}
        <div className="mb-4">
        <label className="block mb-1 text-base"  style={{fontStyle:"arial"}} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-3 py-2 border rounded border-[#007BFF]"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-700 text-sm">{errors.confirmPassword}</p>
          )}
        </div>
  
        {/* Terms and Conditions */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              className="rounded border-gray-300  "
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <span className="ml-2 text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                Terms and Conditions
              </a>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-700 text-sm">{errors.agreeToTerms}</p>
          )}
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white py-2 px-4 rounded hover:bg-orange-600"
          style={{ backgroundColor:"#FF5722 "}}
        >
          Sign Up
        </button>

        <div className="mt-6">
  <h2 className="text-sm font-semibold mb-2">Password Strength Requirements:</h2>
  <ul className="text-sm text-gray-600">
    <li className="flex items-center">
      <i
        className={`mr-2 ${
          formData.password.length >= 8 ? "text-green-500 fas fa-check-circle" : "text-red-500 fas fa-times-circle"
        }`}
      ></i>
      At least 8 characters long
    </li>
    <li className="flex items-center">
      <i
        className={`mr-2 ${
          /[a-z]/.test(formData.password) ? "text-green-500 fas fa-check-circle" : "text-red-500 fas fa-times-circle"
        }`}
      ></i>
      Contains lowercase letters
    </li>
    <li className="flex items-center">
      <i
        className={`mr-2 ${
          /[A-Z]/.test(formData.password) ? "text-green-500 fas fa-check-circle" : "text-red-500 fas fa-times-circle"
        }`}
      ></i>
      Contains uppercase letters
    </li>
    <li className="flex items-center">
      <i
        className={`mr-2 ${
          /[0-9]/.test(formData.password) ? "text-green-500 fas fa-check-circle" : "text-red-500 fas fa-times-circle"
        }`}
      ></i>
      Contains numbers
    </li>
  </ul>
</div>
      </form>
      <ToastContainer />
    </div>
  );
  
};


