import LoginForm from "@/components/login-form";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold">Login</h1>
      <LoginForm />
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
