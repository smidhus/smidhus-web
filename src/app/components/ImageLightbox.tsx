"use client";

import React, { useState, useEffect } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageLightbox({ src, alt, className }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isRendered = isOpen || isClosing;

  useEffect(() => {
    if (!isClosing) return;

    const timer = window.setTimeout(() => {
      setIsClosing(false);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [isClosing]);

  useEffect(() => {
    if (!isRendered) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isRendered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsClosing(true);
    setIsOpen(false);
  };

  return (
    <>
      {/* Thumbnail clickable image */}
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-zoom-in hover:opacity-90 hover:border-[#FF6B00]/40 transition-all duration-300 ease-in-out`}
        onClick={handleOpen}
      />

      {/* Lightbox Fullscreen Backdrop */}
      {isRendered && (
        <div
          onClick={handleClose}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#07090C]/95 backdrop-blur-md cursor-zoom-out transition-opacity duration-300 ease-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Escape / Close Indicator */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.15em] text-smidhus-bone-dim/40 hover:text-[#D38B5b] transition-colors duration-200"
          >
            [CLOSE_ESC]
          </button>

          {/* Scale Transition Wrapper */}
          <div className="max-w-[92vw] max-h-[85vh] flex flex-col items-center">
            <img
              src={src}
              alt={alt}
              className={`max-w-full max-h-[80vh] object-contain rounded-sm border border-[#1F242C] shadow-[0_0_50px_rgba(255,107,0,0.1)] transition-transform duration-300 ease-out ${
                isOpen ? "scale-100" : "scale-95"
              }`}
            />
            <span className="font-mono text-[9px] text-smidhus-bone-dim/40 tracking-wider uppercase mt-4 select-none">
              {"// CLICK ANYWHERE TO DISMISS //"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
