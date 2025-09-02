"use client";
import { Cross, MenuIcon, MenuSquareIcon, ShieldCloseIcon, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const MenuToggle = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="relative w-10 h-10 flex items-center justify-center z-50"
    >
        {isOpen ? <div>
            <X/>
        </div>:<div>
            <MenuSquareIcon/>
        </div>

        }
</button>
  );
};
