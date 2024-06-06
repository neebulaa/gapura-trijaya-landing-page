import IconSearch from '@/commons/assets/icons/IconSearch';

type SearchBarProps = {
  placeholder: string;
};

export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div
      className="input-icon px-2"
      style={{
        color: 'var(--gray)',
      }}
    >
      <IconSearch width="20" height="20" className="ml-1" />
      <input type="text" className='tj-input' placeholder={placeholder} />
    </div>
  );
}
