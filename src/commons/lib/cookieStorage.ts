/**
 * Retrieves a value from cookies by its key.
 * @param key The key to look up in cookies.
 * @returns The value as a string, or `null` if no value is found for the given key.
 */
const getCookie = (key: string): string | null => {
  const name = `${key}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(';');
  for (let cookie of cookiesArray) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

/**
 * Saves a value to cookies with the given key.
 * @param key The key to use to store the value in cookies.
 * @param value The value to save to cookies.
 * @param days The number of days until the cookie expires. Defaults to 7 days.
 */
const setCookie = (key: string, value: string | boolean, days: number = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${key}=${encodeURIComponent(value)};${expires};path=/`;
};

/**
 * Removes a cookie by its key.
 * @param key The key to use to remove the cookie.
 */
const removeCookie = (key: string) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export { getCookie, setCookie, removeCookie };
