import SignUpFrom from '@/components/signup-form';
import { useNavigate } from 'react-router-dom';
import AuthPageLayout from '@/components/Layout/auth-pages-layout';

const SignUp = () => {
  const navigate = useNavigate()
  return (
    <AuthPageLayout className={`h-full p-5`}>
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
    </AuthPageLayout>
  )
}

export default SignUp