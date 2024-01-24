import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import your root reducer type
import {
  login as loginAction,
  logout as logoutAction,
} from "@/features/authSlice"; // Adjust the path accordingly

interface UseAuth {
  isAuthenticated: boolean;
  user: object | null;
  login: (user: object) => void;
  logout: () => void;
}

const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state: RootState) => state.auth);

  const login = (userData: object) => {
    dispatch(loginAction(userData));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    isAuthenticated: status,
    user,
    login,
    logout,
  };
};

export default useAuth;
