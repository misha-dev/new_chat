import { useDebounce } from '@/shared/utils/react';
import { useEffect, useRef } from 'react';

import { CiSearch } from 'react-icons/ci';
import cl from './SearchInput.module.css';

export const SearchInput = ({ input, setInput, onChangeSideEffect, debounceMs = 300, ...props }) => {
  const debouncedInput = useDebounce(input, debounceMs);

  const inputRef = useRef();

  const onSearchChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    onChangeSideEffect(debouncedInput);
  }, [debouncedInput, onChangeSideEffect]);

  return (
    <div className={cl.searchContainer}>
      <CiSearch onClick={() => inputRef.current.focus()} size={30} color="#3891FC" />
      <input ref={inputRef} placeholder="Search" className={cl.searchInput} value={input} onChange={onSearchChange} type="text" {...props} />
    </div>
  );
};
