import {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { UserType } from "../dto/UserType";
import fetching from "../utils/fetching";

type AuthProviderProps = {
	children: ReactNode;
};

const AuthContext = createContext<{ [key: string]: any }>({});

export function useAuth() {
	return useContext(AuthContext);
}

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserType | null>(null);

	useEffect(() => {
		getUser();
	}, []);

	async function getUser() {
		const response = await fetching(`post`, "auth/me");
		if (response.status == 200) {
			console.log(response);
			setUser(response.data.data);
		}
	}

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
