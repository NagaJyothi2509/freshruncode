import React, { useState } from "react";
import { useContext } from "react";
import ToastContext from "../context/ToastContext";

const ForgotPassword = () => {
  const { toast } = useContext(ToastContext);
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter your email to reset the password");
      return;
    }

    // Make an API call to your backend server to request password reset
    // Replace 'your_api_endpoint' with the actual endpoint for password reset
    fetch("https://cms-backend-tq04.onrender.com/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Password reset link sent to your email");
        } else {
          toast.error("Failed to request password reset. Please try again later.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while sending the request. Please try again later.");
      });
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <div className="form-group">
        <label htmlFor="forgotPasswordInput" className="form-label mt-4">
          Enter your email to reset the password
        </label>
        <input
          type="email"
          className="form-control"
          id="forgotPasswordInput"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          required
        />
      </div>
      <div className="mb-7"> {/* Add some margin to create space */}
        <button type="submit" className="btn btn-primary my-3">
          Send Reset Link
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
