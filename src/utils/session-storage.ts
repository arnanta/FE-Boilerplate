/**
 * @description Utility functions for managing session storage.
 * @param key - The key under which the value is stored.
 * @param value - The value to store, which will be serialized to JSON.
 * @returns void
 */
export const sessionStorageUtil = {
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      sessionStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving ${key} to sessionStorage`, error);
    }
  },

  /**
   * @description Retrieves an item from session storage.
   * @param key - The key of the item to retrieve.
   * @returns The parsed value or null if not found.
   */
  get<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading/parsing ${key} from sessionStorage`, error);
      return null;
    }
  },

  /**
   * @description Removes an item from session storage.
   * @param key - The key of the item to remove from session storage.
   * @returns void
   */
  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from sessionStorage`, error);
    }
  },

  /**
   * @description Clears all items from session storage.
   * @returns void
   */
  clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage', error);
    }
  },
};
