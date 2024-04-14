import { useDebounce } from '@/shared/utils/react';
import { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { CiSearch } from 'react-icons/ci';
import cl from './SearchInput.module.css';

export const SearchInput = ({ containerClassName, inputClassName, onChangeSideEffect, debounceMs = 300, ...props }) => {
  const [searchInput, setSearchInput] = useState('');
  const debouncedInput = useDebounce(searchInput, debounceMs);

  const inputRef = useRef();

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  useEffect(() => {
    onChangeSideEffect(debouncedInput);
  }, [debouncedInput, onChangeSideEffect]);

  return (
    <div className={cn(cl.searchContainer, containerClassName)}>
      <CiSearch onClick={() => inputRef.current.focus()} size={30} color="#3891FC" />
      <input ref={inputRef} placeholder="Search" className={cn(cl.searchInput, inputClassName)} value={searchInput} onChange={onSearchChange} type="text" {...props} />
    </div>
  );  
};
