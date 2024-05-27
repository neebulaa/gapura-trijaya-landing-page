/**
 * Retrieves a value from sessionStorage by its key, and parses it as type `T`.
 * @param key The key to look up in sessionStorage.
 * @returns The parsed value as type `T`, or `null` if no value is found for the given key.
 * @template T The type of the value to parse from sessionStorage. Defaults to `unknown`.
 */
const getSessionItem = <T = unknown>(key: string): T | null => {
  const value = window.sessionStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
};

/**
 * Saves a value to sessionStorage with the given key.
 * @param key The key to use to store the value in sessionStorage.
 * @param value The value to save to sessionStorage.
 */
const setSessionItem = (key: string, value: unknown) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * Removes an item from sessionStorage by its key.
 * @param key The key to use to remove the value from sessionStorage.
 */
const removeSessionItem = (key: string) => {
  window.sessionStorage.removeItem(key);
};

export { getSessionItem, setSessionItem, removeSessionItem };
