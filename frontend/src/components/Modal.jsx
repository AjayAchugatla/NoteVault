import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Modal() {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete Confirmation"
                className="bg-white p-6 rounded-lg shadow-lg w-96"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-semibold text-center mb-4">
                    Enter Folder Name
                </h2>
                <div className="flex justify-between">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={deleteBlog}
                    >
                        Create
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Modal;