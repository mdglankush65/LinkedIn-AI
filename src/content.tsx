import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchorList } from "plasmo"
import React, { useState } from "react"
import { HiSparkles } from "react-icons/hi"
import { FaWandMagicSparkles } from "react-icons/fa6";
import PromptModal from "~features/PromptModal";

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async () =>
  document.querySelectorAll(".msg-form__contenteditable p")

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const PlasmoOverlay = (props) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const textarea = props.anchor.element
  const focus = document.querySelector(".msg-form__contenteditable");

  function handleClickOutside(event) {
    if (!focus.contains(event.target)) {
      setIsFocused(false);
    }
    if (focus.contains(event.target)) {
      setIsFocused(true);
    }
  }

  document.addEventListener('click', handleClickOutside);

  return (
    <div>
      {isFocused && (
        <div className="absolute top-24 -right-[42rem] bg-white rounded-full p-2 cursor-pointer shadow-md">
          {isOpen ? (
            <HiSparkles className="text-xl text-[#3b82f6]" />
          ) : (
            <FaWandMagicSparkles
              onClick={() => setIsOpen(true)}
              className="text-xl text-[#3b82f6]"
            />
          )}
        </div>
      )
      }   <PromptModal textarea={textarea} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default PlasmoOverlay