// hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Update the path accordingly
import {
  login as loginAction,
  logout as logoutAction,
} from "@/features/authSlice"; // Update the path accordingly

interface UserObject {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  watchHistory: Array<object>; // Update the type accordingly based on the actual structure
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UseAuth {
  isAuthenticated: boolean;
  user: UserObject | null;
  login: (userData: object) => void; // Update the parameter type here
  logout: () => void;
}

const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state: RootState) => state.auth);

  const login = (userData: object) => {
    dispatch(loginAction(userData as UserObject)); // Type assertion to UserObject
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
