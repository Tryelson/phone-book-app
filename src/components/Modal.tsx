import { ReactNode, useEffect, useState } from "react"
import '../styles/components/Modal.css'

interface ModalProps {
    children: ReactNode,
    show: boolean,
    handleShowModal: () => void
}

export default function Modal({ children, show, handleShowModal }: ModalProps){

    const [showModal, setShowModal] = useState(show)
    const [classAnimation, setClassAnimation] = useState(show)

    function onShowModal(){
        setClassAnimation(prevState => !prevState)
        
        setTimeout(() => {
            setShowModal(prevState => !prevState)
            handleShowModal()
        }, 250);
    }

    useEffect(() => {
        setClassAnimation(show)
        
        setTimeout(() => {
            setShowModal(show)
        }, 250);
    }, [show])

    return (
        <>
            {showModal && (
                <div className={`modal-content ${classAnimation ? 'fadeIn' : 'fadeOut'}`}>
                    <div className="modal-overlay" onClick={onShowModal}></div>
                    
                    <div className="modal-wrapper">
                        { children }
                    </div>
                </div>
            )}
        </>
    )
}