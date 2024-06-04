import { useId } from 'react';

type ToggleCheckboxButtonType = {
  className?: string;
};

export default function ToggleCheckboxButton({ className = '' }: ToggleCheckboxButtonType) {
  const id = useId();
  return (
    <label htmlFor={`check-${id}`} className={`toggle-checkbox ${className}`}>
      <input
        type="checkbox"
        style={{
          display: 'none',
        }}
        id={`check-${id}`}
      />
      <span className="circle"></span>
    </label>
  );
}
