import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import PostDto from '../../dtos/post.dto';
import { FileUploadValidation } from '../../utils/file-upload-validation';
import { HttpStatusCode } from '../../utils/http-status-code.enum';

const POST_TEXT_MAX_LENGTH = 1000;

const PostUploadSection = (props: {
  appendPostItem: (post: PostDto) => void;
}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const fileUploadValidation = new FileUploadValidation();

  const postTextTextArea = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const [postText, setPostText] = useState('');
  const [fileNameText, setFileNameText] = useState('');
  const [errorText, setErrorText] = useState('');
  const [fetching, setFetching] = useState(false);

  const postTextChangedHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostText(event.target.value);
  };

  const fileInputHandler = () => {
    const file: File = fileInput.current!.files![0];
    console.log(fileInput.current!.files!);

    if (!file) {
      return;
    }

    try {
      fileUploadValidation.validateFile(file);
    } catch (error: any) {
      setErrorText(error.message);
      setFileNameText('');
      return;
    }

    setFileNameText(file.name);
    setErrorText('');
  };

  const openFileChooser = () => {
    removeCurrentFile();
    fileInput.current?.click();
  };

  const removeCurrentFile = () => {
    fileInput.current!.value = '';
    setFileNameText('');
  };

  const createPost = async () => {
    if (!errorText) {
      let url = '/api/Post';
      let body = new FormData();
      body.append('Text', postText);
      const file: File = fileInput.current!.files![0];
      body.append('RemovedPicture', 'false');
      body.append('Picture', file);

      setFetching(true);

      const response = await fetch(url, {
        method: 'POST',
        body: body,
      });

      switch (response.status) {
        case HttpStatusCode.OK:
          setFetching(false);
          setPostText('');
          postTextTextArea.current!.value = ''; // because text area doesn't re-render when value is changed via setPostText
          removeCurrentFile();
          const reply = await response.json();
          const post = JSON.parse(reply.Message);
          props.appendPostItem(post);
          break;
        case HttpStatusCode.BAD_REQUEST:
          response.json().then((value) => setErrorText('Bad request'));
          break;
        case HttpStatusCode.UNAUTHORIZED:
          localStorage.clear();
          navigate('/');
          authContext.updateAuthContext(unsignedUser);
          break;
        default:
          setErrorText('Unknown error occurred');
      }

      setFetching(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col bg-white mt-5 w-screen md:w-614px rounded shadow-lg p-4 pb-3'>
        <div className='flex items-start'>
          <div className='flex flex-col flex-grow'>
            <textarea
              className='input leading-5 resize-none p-1 w-full'
              placeholder='New post...'
              rows={4}
              maxLength={POST_TEXT_MAX_LENGTH}
              onChange={postTextChangedHandler}
              ref={postTextTextArea}
            ></textarea>
            <p className='ml-3'>{fileNameText}</p>
            <p className='text-red-600 ml-3'>{errorText}</p>
            <div className='flex items-center self-end'>
              {!fetching && (
                <button
                  className='btnWhiteGreen mt-3 mr-4'
                  onClick={openFileChooser}
                  hidden={!!fileNameText}
                >
                  <input
                    type='file'
                    accept='.png,.jpg,.jpeg,.mp4'
                    ref={fileInput}
                    onInput={fileInputHandler}
                    hidden
                  />
                  Upload file
                </button>
              )}
              {fileNameText && !fetching && (
                <button
                  className='btnWhiteRed mt-3 mr-4'
                  onClick={removeCurrentFile}
                >
                  Remove file
                </button>
              )}
              <div className='flex items-center mt-3 mr-3'>
                {fetching ? (
                  <div className='flex items-center justify-center w-20'>
                    <LoadingSpinner />
                  </div>
                ) : (
                  <button className='btnGreenWhite w-20' onClick={createPost}>
                    Post
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUploadSection;
