import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useMutationCustom = (config = {}) => {
	const response = async ([path, data, method]) => {
		try {
			switch (method) {
				case "get":
					return await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/${path}`, data);
				case "put":
					return await axios.put(`${import.meta.env.VITE_REACT_BACKEND_URL}/${path}`, data);
				case "delete":
					return await axios.delete(`${import.meta.env.VITE_REACT_BACKEND_URL}/${path}`, data);
				case "patch":
					return await axios.patch(`${import.meta.env.VITE_REACT_BACKEND_URL}/${path}`, data);
				default:
					return await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/${path}`,data);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.error, {
				position: "top-center",
				autoClose: 7000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
	};

	return useMutation({
		mutationFn: response,
		...config,
	});
};

export default useMutationCustom;
