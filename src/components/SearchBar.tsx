import IconSearch from "./../assets/icons/IconSearch";
type SearchBarProps = {
	placeholder: string;
};

export default function SearchBar({ placeholder }: SearchBarProps) {
	return (
		<div
			className="input-icon"
			style={{
				color: "var(--gray)",
			}}
		>
			<IconSearch width="20" height="20" />
			<input type="text" placeholder={placeholder} />
		</div>
	);
}
