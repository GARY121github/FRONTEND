import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  login as loginAction,
  logout as logoutAction,
} from "@/features/authSlice";

interface UserData {
  avatar: string;
  coverImage: string;
  createdAt: string;
  email: string;
  fullName: string;
  updatedAt: string;
  username: string;
  watchHistory: [];
  __v: number;
  _id: string;
}

interface UseAuth {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
}

const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state: RootState) => state.auth);

  const login = (userData: UserData) => {
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
