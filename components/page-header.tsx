'use client'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const navigation = [
  { name: 'Blog', href: '#' },
  { name: 'About', href: '#' },
]

const rightNavigation = [
    {name: 'Create New Project', href: '/project/new'}
]

export default function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-4" aria-label="Global">
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6">
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <Link href="/" className=" lg:-ml-8 lg:p-1.5">
          <span className="sr-only">Your Company</span>
          <Image
              className='flex lg:hidden'
              src="/logo-no-background.png"
              alt="Company Logo"
              width={250}
              height={12}
              priority
            />
            <Image
              className='hidden lg:flex'
              src="/logo-no-background.png"
              alt="Company Logo"
              width={350}
              height={24}
              priority
            />
        </Link>
        <div className="flex flex-1 justify-end">
            <div className="hidden lg:flex lg:gap-x-12 items-center">
                {rightNavigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6">
                    {item.name}
                </Link>
                ))}
                <ConnectButton accountStatus={'address'} chainStatus={'icon'} showBalance={false} />
            </div>
          
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
              className='flex lg:hidden'
              src="/logo-no-background.png"
              alt="Company Logo"
              width={250}
              height={12}
              priority
            />
            </Link>
            <div className="flex flex-1 justify-end">
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
            {rightNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
