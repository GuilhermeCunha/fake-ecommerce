import { useAuth } from 'contexts/AuthenticationContext';
import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const Topbar: React.FC = () => {
  const { state: authState, signInWithOAuth, signOut } = useAuth();
  return (
    <div className="flex flex-row w-full justify-end px-6 bg-primaryColor-1000 p-4">
      {authState.firebaseUser ? (
        <div className="flex justify-center items-center">
          <img
            src={authState.firebaseUser.photoURL}
            className="h-10 w-10 rounded-full"
            alt="User thumnail"
          />
          <button
            className="ml-2"
            type="button"
            onClick={() => {
              signOut();
            }}
          >
            <AiOutlineLogout size={22} className="text-white" />
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            data-cy="google-login-button"
            type="button"
            onClick={() => {
              signInWithOAuth();
            }}
            className="flex items-center"
          >
            <span className="font-semibold text-white mr-2">Entrar com </span>
            <FcGoogle size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Topbar;
