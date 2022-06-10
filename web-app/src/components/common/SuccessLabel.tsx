const SuccessLabel = (props: { text: string }) => {
	return (
		<div className='mt-1 mb-2'>
			<p className='text-green-600 text-center text-base' hidden={!props.text}>
				{props.text}
			</p>
		</div>
	);
};

export default SuccessLabel;
