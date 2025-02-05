// import { useState } from "react";
// import { useForgotPasswordMutation } from "@/features/api/authApi";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email.trim()) {
//       toast.error("Email is required.");
//       return;
//     }
//     try {
//       const response = await forgotPassword({ email }).unwrap();
//       toast.success(response.message);
//       navigate("/verify-otp", { state: { email } });
//     } catch (error) {
//       toast.error(error.data?.message || "Failed to send OTP.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
//         <p className="text-center text-gray-500">Enter your email to receive an OTP.</p>
//         <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-black/40"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-700"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import { useState } from "react";
import { useForgotPasswordMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
    try {
      const response = await forgotPassword({ email }).unwrap();
      toast.success(response.message);
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      toast.error(error.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <p className="text-gray-500">Enter your email to receive an OTP.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
