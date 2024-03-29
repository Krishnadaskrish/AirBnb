"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import useRegisterModel from "@/app/hooks/UseRegisterModal";
import LoginModal from "../models/LoginModal";
import useLoginModel from "@/app/hooks/UseLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModel from "@/app/hooks/UseRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const RegisterModel = useRegisterModel();
  const loginModal = useLoginModel();
  const rentmodal = useRentModel();

  const ToggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const ToggleClose = useCallback(() => {
    setIsOpen((value) => value);
  }, []);
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentmodal.onOpen();
  }, [currentUser, loginModal, rentmodal]);

  useEffect(() => {
    if (currentUser) {
      setIsOpen(false);
    }
  }, [currentUser]);
  const onMenuItemClick = useCallback(() => {
    // Close the menu when any menu item is clicked
    setIsOpen(false);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block font-medium text-sm py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Switch To Hosting
        </div>
        <div
          onClick={ToggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem
                    onClick={() => {
                      router.push("/trips");
                      onMenuItemClick();
                    }}
                    label="Trips"
                  />
                  <MenuItem
                    onClick={() =>{ router.push("/favorites");
                    onMenuItemClick()
                  }}
                    label="Wishlists"
                  />
                  <MenuItem
                    onClick={() =>{ router.push("/reservations");
                  onMenuItemClick()
                  }}
                    label="Reservations"
                  />
                  <MenuItem
                    onClick={() => {router.push("/properties");
                  onMenuItemClick()
                }}
                    label="Properties"
                  />

                  <MenuItem
                    onClick={() => {router.push("/account");
                  onMenuItemClick()
                }}
                    label="Account"
                  />
                  <hr />
                  <MenuItem
                    onClick={() => {
                      signOut();
                      onMenuItemClick()
                    }}
                    label="Logout"
                  />
                </>
              ) : (
                <>
                  <MenuItem onClick={loginModal.onOpen} label="Login" />
                  <MenuItem onClick={RegisterModel.onOpen} label="Sign Up" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
