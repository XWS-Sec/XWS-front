import { useRef } from 'react';
import PopupHeader from '../../../components/common/PopupHeader';

const ProfilePicturePopup = (props: {
  toggleProfilePicturePopup: () => void;
  setProfilePictureLocation: React.Dispatch<React.SetStateAction<string>>;
  setFetching: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const openFileChooser = () => {
    fileInput.current?.click();
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-40'>
      <div className='flex items-center justify-center h-full'>
        <div className='flex flex-col bg-white w-60 rounded-lg md:-mt-52'>
          <PopupHeader
            title={undefined}
            toggle={props.toggleProfilePicturePopup}
          />
          <button className='h-10 mx-2 border-b-2' onClick={openFileChooser}>
            <input
              type='file'
              accept='.png,.jpg,.jpeg,.mp4'
              ref={fileInput}
              hidden
            />
            Change profile picture
          </button>
          <button className='h-10 mx-2 border-b-2 text-red-500'>
            Remove profile picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicturePopup;
