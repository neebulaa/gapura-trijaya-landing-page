import { useEffect, useState } from "react";
function getSavedValue<T>(key: string, initialValue: T) {
	const data = JSON.parse(
		localStorage.getItem(`${import.meta.env.VITE_APP_NAME}-${key}`) ??
			"null"
	);
	if (data) return data;
	if (initialValue instanceof Function) {
		return initialValue();
	}
	return initialValue;
}

export default function useLocalStorage<T>(
	key: string,
	initialValue: T | (() => T)
) {
	const [data, setData] = useState<T>(() => getSavedValue(key, initialValue));
	useEffect(() => {
		localStorage.setItem(`${import.meta.env.VITE_APP_NAME}-${key}`, JSON.stringify(data));
	}, [key, data]);
	return [data, setData] as [typeof data, typeof setData];
}
