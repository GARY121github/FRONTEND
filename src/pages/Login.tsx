import LoginForm from "@/components/login-form";
import { useNavigate } from "react-router-dom";
import AuthPageLayout from "@/components/Layout/auth-pages-layout";
const Login = () => {
  const navigate = useNavigate();
  return (
    <AuthPageLayout className="h-screen">
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
    </AuthPageLayout>

  );
};

export default Login;
