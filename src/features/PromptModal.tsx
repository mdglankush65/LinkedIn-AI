import React, { useState } from "react"
import { FaArrowDown } from "react-icons/fa6"
import { HiArrowPathRoundedSquare } from "react-icons/hi2"
import { LuSendHorizonal } from "react-icons/lu"

interface PromptModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    textarea: HTMLTextAreaElement
}

const PromptModal: React.FC<PromptModalProps> = ({
    isOpen,
    setIsOpen,
    textarea
}) => {
    const [isGenerated, setIsGenerated] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [regenerateInput, setRegenerateInput] = useState("")

    const response = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`

    function closeModal() {
        setIsOpen(false)
    }

    const handleOverlayClick = () => {
        isOpen ? closeModal() : null
    }


    const handleInsert = () => {
        closeModal()

        textarea.innerHTML = `${response}`
        textarea.dispatchEvent(new Event("input", { bubbles: true }))
        setIsGenerated(false)
        setUserInput("")
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center align-center shadow-lg inset-0 bg-black/30"
                    onClick={handleOverlayClick}>
                    {!isGenerated ? (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-col items-center space-y-4 bg-gray-50 p-5 w-[45rem] h-fit rounded-lg">
                            <div className="flex plasmo-justify-center gap-0">
                                {/* <img src="/assets/icon.png" height={0} width={0} alt="logo" /> */}
                                <p>LinkedIn AI</p>
                            </div>
                            <input
                                type="text"
                                name="prompt"
                                placeholder="Your prompt"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="w-full outline-none border border-gray-400 placeholder:text-gray-400 p-2 text-gray-600 rounded-lg font-medium text-xl"
                            />
                            <button
                                onClick={() => {
                                    setIsGenerated(true)
                                }}
                                disabled={!userInput}
                                className="flex items-center space-x-2 self-end bg-[#3b82f6] text-white p-3 rounded-lg">
                                <LuSendHorizonal className="text-2xl" />

                                <p className="text-xl font-medium">Generate</p>
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-col items-center justify-center self-center bg-gray-50 p-5 w-[45rem] h-fit rounded-lg gap-5">
                            <div className="flex plasmo-justify-center gap-0">
                                {/* <img src="/assets/icon.png" height={0} width={0} alt="logo" /> */}
                                <p>LinkedIn AI</p>
                            </div>
                            <div className="flex flex-col gap-4 text-xl">
                                <p className="p-3 text-slate-500 bg-[#dfe1e7] rounded-lg self-end w-[70%]">
                                    {userInput}
                                </p>
                                <p className="p-3 text-slate-500 bg-[#dbeafe] rounded-lg self-start w-[70%]">
                                    {response}
                                </p>
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="prompt"
                                    placeholder="Your prompt"
                                    value={regenerateInput}
                                    onChange={(e) => setRegenerateInput(e.target.value)}
                                    className="w-full outline-none border border-gray-400 placeholder:text-gray-400 p-2 text-gray-600 rounded-lg font-medium text-xl"
                                />
                            </div>
                            <div className="w-full flex flex-row items-center justify-end space-x-4">
                                <button
                                    onClick={() => handleInsert()}
                                    className="flex items-center justify-around bg-white text-gray-500 p-3 rounded-lg border border-gray-500 space-x-2">
                                    <FaArrowDown className="text-xl" />

                                    <p className="text-xl font-medium">Insert</p>
                                </button>
                                <button className="flex items-center justify-around bg-[#3b82f6] text-white p-3 rounded-lg space-x-2">
                                    <HiArrowPathRoundedSquare className="text-xl" />

                                    <p className="text-xl font-medium">Regenerate</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default PromptModal