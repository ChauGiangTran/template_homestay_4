import React, { createContext, useContext, useState } from "react";

interface IBookingModalContext {
  isOpen: boolean;
  selectedRoomTitle: string;
  openBookingModal: (roomTitle?: string) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<IBookingModalContext>({
  isOpen: false,
  selectedRoomTitle: "",
  openBookingModal: () => {},
  closeBookingModal: () => {},
});

export const BookingModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoomTitle, setSelectedRoomTitle] = useState("");

  const openBookingModal = (roomTitle: string = "") => {
    setSelectedRoomTitle(roomTitle);
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
    setSelectedRoomTitle("");
  };

  return (
    <BookingModalContext.Provider
      value={{ isOpen, selectedRoomTitle, openBookingModal, closeBookingModal }}
    >
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = () => useContext(BookingModalContext);
