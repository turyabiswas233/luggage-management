import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import ChatbotModal from './ChatbotModal';

const ChatbotButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          type="button"
          onClick={toggleModal}
          className="fixed bottom-20 right-3 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>
      )}
      {isModalOpen && <ChatbotModal onClose={toggleModal} />}
    </div>
  );
};

export default ChatbotButton;