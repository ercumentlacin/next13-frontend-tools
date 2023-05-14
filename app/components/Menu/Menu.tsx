"use client";

import { useDrawer } from "@/app/contexts/DrawerContext";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";

interface MenuProps {
  currentUser: SafeUser | null;
}

export default function Menu({ currentUser }: MenuProps) {
  const { toggleDrawer, setContent } = useDrawer();

  return (
    <header className="fixed top-0 flex items-center justify-between w-full p-3 bg-base-200">
      <div className="flex items-center gap-2 grow">
        <span id="logo" className="text-lg font-bold">
          <a
            href="/"
            className="transition-colors duration-300 hover:text-accent-content"
          >
            Frontend
            <span className="transition-colors duration-300 text-primary-focus hover:text-primary">
              Tools
            </span>
          </a>
        </span>
        <form action="" className="relative flex items-center">
          <input
            type="search"
            placeholder="Search"
            className="w-full max-w-xs pr-4 input input-sm input-bordered"
          />
          <button
            type="submit"
            className="absolute text-lg transition-colors duration-300 cursor-pointer right-2 text-base-content hover:text-accent-content bg-base-100"
          >
            <AiOutlineSearch />
          </button>
        </form>
      </div>

      {!currentUser && (
        <div className="flex gap-6">
          <Link href="/enter" role="button" className="btn btn-link">
            Log in
          </Link>
          <Link
            role="button"
            href="/new-user"
            className="btn btn-outline btn-primary"
          >
            Create account
          </Link>
        </div>
      )}

      {currentUser && (
        <div className="flex items-center gap-6 mx-4">
          <button className="flex items-center justify-center btn btn-sm btn-circle">
            <IoNotificationsOutline className="text-xl" />
          </button>

          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="m-1 group">
              {currentUser.image && (
                <div className="cursor-pointer avatar">
                  <div className="w-10 rounded-full group-focus:ring-2 group-focus:ring-primary group-focus:ring-offset-base-100 group-focus:ring-offset-2">
                    <Image
                      src={currentUser.image}
                      alt={currentUser?.name || currentUser.email}
                      width="40"
                      height="40"
                    />
                  </div>
                </div>
              )}

              {!currentUser.image && (
                <div className="cursor-pointer avatar placeholder">
                  <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
                    <span className="uppercase">
                      {(currentUser?.name || currentUser.email)[0]}
                    </span>
                  </div>
                </div>
              )}
            </label>

            <div
              tabIndex={0}
              className="flex flex-col p-2 shadow dropdown-content bg-base-100 rounded-box w-52"
            >
              <div className="p-1">
                <span className="font-bold">
                  @{currentUser.name ?? currentUser.email.split("@")[0]}
                </span>
              </div>
              <div className="m-0 divider" />
              <div className="flex flex-col">
                <div className="flex p-1">
                  <Link
                    role="button"
                    href="/dashboard"
                    className="w-full flex justify-start text-left btn btn-sm btn-outline btn-primary !border-transparent hover:underline capitalize underline-offset-2"
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="flex p-1">
                  <button
                    onClick={() => {
                      toggleDrawer();
                      setContent("create-post");
                    }}
                    role="button"
                    className="w-full flex justify-start text-left btn btn-sm btn-outline btn-primary !border-transparent hover:underline capitalize underline-offset-2"
                  >
                    Create Post
                  </button>
                </div>
                <div className="flex p-1">
                  <Link
                    role="button"
                    href="/settings"
                    className="w-full flex justify-start text-left btn btn-sm btn-outline btn-primary !border-transparent hover:underline capitalize underline-offset-2"
                  >
                    Settings
                  </Link>
                </div>
              </div>
              <div className="m-0 divider" />
              <button
                type="button"
                className="w-full flex justify-start text-left btn btn-sm btn-outline btn-primary !border-transparent hover:underline capitalize underline-offset-2"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
