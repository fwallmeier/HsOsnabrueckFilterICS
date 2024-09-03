// src/components/Sidebar.js

import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Icons from Lucide
import { Transition } from '@headlessui/react'; // Transition for animations

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative h-full">
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="p-2 bg-gray-700 text-white focus:outline-none fixed z-30 menuIcon">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <Transition
                show={isOpen}
                enter="transition-transform duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full">
                <div
                    className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white shadow-lg transition-transform transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
                        <ul className="space-y-2">
                            <li className="hover:bg-gray-700 p-2 rounded">Home</li>
                            <li className="hover:bg-gray-700 p-2 rounded">About</li>
                            <li className="hover:bg-gray-700 p-2 rounded">Services</li>
                            <li className="hover:bg-gray-700 p-2 rounded">Contact</li>
                        </ul>
                    </div>
                </div>
            </Transition>
        </div>
);
};

export default Sidebar;
