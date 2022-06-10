const InputWithLabel = (props: { type: string; text: string; name: string; value?: string; placeholder: string; onChange: React.ChangeEventHandler; disabled?: boolean }) => {
	return (
		<div className='flex flex-wrap items-center'>
			<p className='my-1 w-44 whitespace-nowrap'>{props.text}</p>
			<input className='input flex-grow md:w-60 md:text-lg' type={props.type} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} disabled={props.disabled} />
		</div>
	);
};

export default InputWithLabel;
