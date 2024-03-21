"use client";

import React from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import joinClassNames from "@/utils/joinClassNames";
import { CurrentPageContext } from "@/contexts/CurrentPage";

function Navigation(): React.ReactNode {
  const { currentPage } = React.useContext(CurrentPageContext);
  const pages = [
    {
      name: "Explore",
      isCurrent: currentPage == "Explore" ? true : false,
    },
    {
      name: "Following",
      isCurrent: currentPage == "Following" ? true : false,
    },
    {
      name: "Nearby",
      isCurrent: currentPage == "Nearby" ? true : false,
    },
  ];

  const profilePages = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "/settings" },
    { name: "Sign out", href: "#" },
  ];

  const currentUser = {
    name: "Patrick Lawrence",
    email: "patrickjameslawrence@icloud.com",
    photo: "defaultAvatar.svg",
  };

  return (
    <Disclosure
      as="nav"
      className="border-b border-purple-300 border-opacity-25 bg-purple-600 lg:border-none"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-purple-400 lg:border-opacity-25">
              <Brand pages={pages} />
              <div className="flex lg:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-purple-600 p-2 text-purple-200 hover:bg-purple-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="relative flex-shrink-0 rounded-full bg-purple-600 p-1 text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <ProfileMenu
                    currentUser={currentUser}
                    profilePages={profilePages}
                  />
                </div>
              </div>
            </div>
          </div>

          <Dropdown
            pages={pages}
            currentUser={currentUser}
            profilePages={profilePages}
          />
        </>
      )}
    </Disclosure>
  );
}

function Brand({ pages }): React.ReactNode {
  const { setCurrentPage } = React.useContext(CurrentPageContext);
  return (
    <div className="flex items-center px-2 lg:px-0">
      <div className="flex-shrink-0">
        <Image
          src="./Logos/wide.svg"
          width={96}
          height={32}
          alt="BeHereNow logo"
        />
      </div>
      <div className="hidden lg:ml-10 lg:block">
        <div className="flex space-x-4">
          {pages.map((page) => (
            <button
              key={page.name}
              onClick={() => setCurrentPage(page.name)}
              className={joinClassNames(
                page.isCurrent
                  ? "bg-purple-700 text-white"
                  : "text-white hover:bg-purple-500 hover:bg-opacity-75",
                "rounded-md py-2 px-3 text-sm font-medium"
              )}
              aria-current={page.isCurrent ? "page" : undefined}
            >
              {page.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileMenu({ currentUser, profilePages }): React.ReactNode {
  return (
    <Menu as="div" className="relative ml-3 flex-shrink-0">
      <div>
        <Menu.Button className="relative flex rounded-full bg-purple-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            className="rounded-full"
            src={currentUser.photo}
            width={32}
            height={32}
            alt="User's profile picture"
          />
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {profilePages.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={joinClassNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function Dropdown({ pages, currentUser, profilePages }): React.ReactNode {
  const { setCurrentPage } = React.useContext(CurrentPageContext);
  return (
    <Disclosure.Panel className="lg:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {pages.map((page) => (
          <Disclosure.Button
            key={page.name}
            as="button"
            onClick={() => setCurrentPage(page.name)}
            className={joinClassNames(
              page.isCurrent
                ? "bg-purple-700 text-white"
                : "text-white hover:bg-purple-500 hover:bg-opacity-75",
              "block rounded-md py-2 w-full text-left px-3 text-base font-medium"
            )}
            aria-current={page.isCurrent ? "page" : undefined}
          >
            {page.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-purple-700 pb-3 pt-4">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <Image
              className="rounded-full"
              src={currentUser.photo}
              width="40"
              height="40"
              alt="User's profile picture"
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-white">
              {currentUser.name}
            </div>
            <div className="text-sm font-medium text-purple-300">
              {currentUser.email}
            </div>
          </div>
          <button
            type="button"
            className="relative ml-auto flex-shrink-0 rounded-full bg-purple-600 p-1 text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 space-y-1 px-2">
          {profilePages.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-purple-500 hover:bg-opacity-75"
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </div>
    </Disclosure.Panel>
  );
}

export default function Header(): React.ReactNode {
  const { currentPage } = React.useContext(CurrentPageContext);
  return (
    <header>
      <Navigation />
      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">{currentPage}</h1>
        </div>
      </div>
    </header>
  );
}
