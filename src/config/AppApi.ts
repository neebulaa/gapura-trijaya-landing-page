import axios from "axios";

const AppApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export default AppApi;
