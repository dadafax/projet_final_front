import { useState, useRef, useEffect } from 'react';
import './SortSelect.css';

const SortSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'name_asc', label: 'Nom (A → Z)' },
    { value: 'name_desc', label: 'Nom (Z → A)' },
    { value: 'age_asc', label: 'Âge (croissant)' },
    { value: 'age_desc', label: 'Âge (décroissant)' }
  ];

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="sort-select" ref={dropdownRef}>
      <button 
        className={`sort-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{currentOption.label}</span>
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      
      {isOpen && (
        <ul className="sort-select-options" role="listbox">
          {options.map((option) => (
            <li 
              key={option.value}
              className={`sort-option ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortSelect;