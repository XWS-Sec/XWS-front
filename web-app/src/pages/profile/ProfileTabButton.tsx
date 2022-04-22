const ProfileTabButton = (props: { tabName: string; onClick: () => void }) => {
  return (
    <button className='text-center' onClick={props.onClick}>
      {props.tabName}
    </button>
  );
};

export default ProfileTabButton;
