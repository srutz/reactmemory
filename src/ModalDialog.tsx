
/*
 * type/interface for the Modal component
 */
export type ModalProps = {
    show: boolean
    title: string
    onClose: () => void
    children: React.ReactNode
}

/*
 * Modal component, which renders a title and children as content
 * the parent component has to control the visibility of the modal
 * a callback function onClose is called when the close button is clicked
 */
export function Modal({ show, title, onClose, children }: ModalProps) {
    if (!show) {
        return null
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg" style={{ width: "calc(min(800px,60vw))"}}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800">
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
                <div className="flex justify-end p-4 border-t">
                    <button onClick={onClose} className="button">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
