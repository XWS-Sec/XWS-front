const Notifications = (props: {
  notifications: string[];
  onDismiss: (index: number) => void;
}) => {
  return (
    <div className='absolute h-screen right-5 z-20 flex flex-col justify-end pb-10'>
      {props.notifications.map((notification, index) => (
        <div
          key={index}
          className='bg-slate-400 ring-2 ring-slate-700 w-80 p-2 flex flex-col rounded-lg mb-10'
        >
          <p>{notification}</p>
          <button
            className='bg-slate-700 w-20 self-end'
            onClick={() => props.onDismiss(index)}
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
