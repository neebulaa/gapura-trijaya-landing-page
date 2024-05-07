import IconSearch from "./../assets/icons/IconSearch";
type SearchBarProps = {
	placeholder: string;
	padding?: string;
};

export default function SearchBar({ placeholder, padding = '.8rem' }: SearchBarProps) {
	return (
		<div
			className="input-icon"
			style={{
				color: "var(--gray)",
				padding: padding
			}}
		>
			<IconSearch width="20" height="20" />
			<input type="text" placeholder={placeholder}/>
		</div>
	);
}
