import { useDataProvider } from "./useDataProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useLogout = () => {
	const { dispatch } = useDataProvider();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await axios
				.delete(`${import.meta.env.VITE_REACT_BACKEND_URL}/logout`, {
					withCredentials: true,
				})
				.then((res) => {
                    console.log(res)
					if (
						res.data &&
						res.data.message === "تم تسجيل الخروج بنجاح"
					) {
						console.log(res);
						dispatch({ type: "LOGOUT" });
						queryClient.clear();
                        toast.success(res.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
						navigate("/" , { replace: true });
					}
				});
		} catch (error) {}
	};
	return { logout };
};
