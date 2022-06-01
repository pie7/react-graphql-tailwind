import { useCallback, useState } from 'react';

function useToggle(defaultValue = false) {
    const [isToggle, setIsToggle] = useState(defaultValue);
    const handleToggle = useCallback(() => setIsToggle((isToggle) => !isToggle), []);
    return [isToggle, handleToggle];
}
export default useToggle;