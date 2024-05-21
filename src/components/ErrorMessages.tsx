type ErrorMessagesProps = {
	messages: string[];
};

export default function ErrorMessages({ messages }: ErrorMessagesProps) {
	return (
		<>
			{messages &&
				messages.map((error: string, i: number) => (
					<p className="accent mt-05" key={i}>
						{error}
					</p>
				))}
		</>
	);
}
