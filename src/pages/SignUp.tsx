import SignUpFrom from '@/components/signup-form';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold">SignUp</h1>
      <SignUpFrom />
      <div className="mt-4">
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignUp