import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useQueryCustom = (key, path, config = {}, params = null) => {
	const response = async () =>{
		console.log("fetching data")
		return await axios.get(
			`${import.meta.env.VITE_REACT_BACKEND_URL}/${path}`,
			params
		);
	}


	return useQuery({
		queryKey: key,
		queryFn: response,
		...config,
	});
};

export default useQueryCustom;

