import Modal from 'react-modal';


function Model({ children, modalIsOpen, closeModal }) {
    Modal.setAppElement('#root');
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete Confirmation"
                className="bg-white p-6 rounded-lg shadow-lg sm:w-[30rem] "
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center "
            >
                {children}
            </Modal>
        </div>
    );
}

export default Model;