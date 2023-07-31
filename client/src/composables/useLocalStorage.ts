import { ref, onMounted } from 'vue';

const useLocalStorage = () => {
  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };

  const getFromLocalStorage = (key: string) => {
    const storedData = localStorage.getItem(key);
    return storedData ? storedData : null;
  };

  const removeFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
  };

  onMounted(() => {
    getFromLocalStorage
  });

  return {
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage
  };
};

export default useLocalStorage;