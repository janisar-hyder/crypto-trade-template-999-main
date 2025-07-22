import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log("Signup attempt:", {
      ...formData,
      phone: phoneNumber
    });

    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP submitted:", otp);
    alert("Account created successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignup = () => {
    console.log("Signing up with Google");
    setStep('otp');
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="bg-background/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-md"
              >
                <Lock className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              <CardTitle className="text-2xl font-bold text-foreground">Verify Your Account</CardTitle>
              <p className="text-muted-foreground">We’ve sent a 6-digit code to your email/phone</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="otp" className="block text-center text-foreground">Verification Code</Label>
                  <div className="flex justify-center gap-2">
                    {[...Array(6)].map((_, i) => (
                      <Input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        maxLength={1}
                        value={otp[i] || ""}
                        onChange={(e) => {
                          const newOtp = otp.split('');
                          newOtp[i] = e.target.value;
                          setOtp(newOtp.join(''));
                          if (e.target.value && i < 5) {
                            document.getElementById(`otp-${i + 1}`)?.focus();
                          }
                        }}
                        className="w-12 h-14 text-center text-2xl font-medium border-border bg-background/50 focus-visible:ring-primary"
                        required
                      />
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 text-lg shadow-md">
                  Verify & Create Account
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Didn’t receive code?{' '}
                  <button type="button" className="text-primary hover:underline font-medium">
                    Resend
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-background/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-md"
            >
              <User className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
            <p className="text-muted-foreground">Start your crypto investment journey today</p>
          </CardHeader>

          <CardContent>
            <Button
              onClick={handleGoogleSignup}
              variant="outline"
              className="w-full h-12 gap-3 text-foreground border-border hover:bg-muted/50"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Sign up with Google</span>
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/80 px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                 <div className="space-y-2">
  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
  <PhoneInput
    country={countryCode.toLowerCase()}
    value={phoneNumber}
    onChange={(value, data) => {
      setPhoneNumber(value);
      setCountryCode(data.countryCode?.toUpperCase() || 'US');
    }}
    inputProps={{
      name: 'phone',
      required: true,
      className: 'w-full h-10 px-3 rounded-md text-sm border border-border bg-background/50 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
    }}
    containerStyle={{ width: '100%' }}
    inputStyle={{
      width: '100%',
      height: '42px',
      borderRadius: '0.375rem',
      backgroundColor: 'transparent',
      borderColor: 'var(--border)',
      color: 'var(--foreground)',
      paddingLeft: '48px'
    }}
    buttonStyle={{
      border: 'none',
      backgroundColor: 'transparent',
      paddingLeft: '10px'
    }}
    dropdownStyle={{
      backgroundColor: '#1f1f1f',
      border: '1px solid #333',
      color: '#fff',
      zIndex: 9999,
      maxHeight: '200px',
      overflowY: 'auto'
    }}
    searchStyle={{
      backgroundColor: '#2c2c2c',
      color: '#fff',
      border: '1px solid #444',
      borderRadius: '4px'
    }}
    dropdownClass="dark-dropdown"
    enableSearch
  />
</div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">Minimum 8 characters with numbers and symbols</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referralCode" className="text-foreground">Referral Code (Optional)</Label>
                    <Input
                      id="referralCode"
                      name="referralCode"
                      type="text"
                      value={formData.referralCode}
                      onChange={handleChange}
                      placeholder="Enter referral code"
                    />
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 rounded border-border focus:ring-primary focus:ring-2"
                    />
                    <label className="text-sm text-muted-foreground leading-snug">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 text-lg shadow-md mt-4">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;