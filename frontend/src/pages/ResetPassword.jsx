// import { useState } from "react";
// import { useResetPasswordMutation } from "@/features/api/authApi";
// import { toast } from "sonner";
// import { useNavigate, useLocation } from "react-router-dom";

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const { state } = useLocation();
//   const { email, otp } = state || {};
//   const [resetPassword, { isLoading }] = useResetPasswordMutation();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newPassword.trim() || newPassword.length < 8) {
//       toast.error("Password must be at least 8 characters.");
//       return;
//     }
//     try {
//       const response = await resetPassword({ email, otp, newPassword }).unwrap();
//       toast.success(response.message);
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.data?.message || "Failed to reset password.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center">Reset Password</h2>
//         <p className="text-center text-gray-500">Enter your new password.</p>
//         <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//           <input
//             type="password"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-black/40"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-700"
//             disabled={isLoading}
//           >
//             {isLoading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import { useState } from "react";
import { useResetPasswordMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons for password toggle

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { state } = useLocation();
  const { email, otp } = state || {};
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    try {
      const response = await resetPassword({ email, otp, newPassword }).unwrap();
      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <p className="text-gray-500">Enter your new password.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password Input with Eye Icon */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
