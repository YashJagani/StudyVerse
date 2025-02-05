// import { useState } from "react";
// import { useVerifyOTPMutation } from "@/features/api/authApi";
// import { toast } from "sonner";
// import { useNavigate, useLocation } from "react-router-dom";

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState("");
//   const { state } = useLocation();
//   const email = state?.email;
//   const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!otp.trim()) {
//       toast.error("OTP is required.");
//       return;
//     }
//     try {
//       const response = await verifyOTP({ email, otp }).unwrap();
//       toast.success(response.message);
//       navigate("/reset-password", { state: { email, otp } });
//     } catch (error) {
//       toast.error(error.data?.message || "Invalid OTP.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
//         <p className="text-center text-gray-500">Enter the OTP sent to your email.</p>
//         <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-black/40"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-700"
//             disabled={isLoading}
//           >
//             {isLoading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
import { useState } from "react";
import { useVerifyOTPMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(""); // OTP input state
  const { state } = useLocation();
  const email = state?.email;
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const response = await verifyOTP({ email, otp }).unwrap();
      toast.success(response.message);
      navigate("/reset-password", { state: { email, otp } });
    } catch (error) {
      toast.error(error.data?.message || "Invalid OTP.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
          <p className="text-gray-500">Enter the 6-digit OTP sent to your email.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ShadCN OTP Input Centered */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp} // Updates state as user types
                className="flex gap-2"
              >
                <InputOTPGroup className="flex gap-2">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="flex gap-2">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;
