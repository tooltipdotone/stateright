// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { FiUsers, FiChevronDown } from 'react-icons/fi';

// const UserDropdown = ({ onLogin, onRegister }) => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef();

//   const toggleDropdown = () => setOpen(!open);

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="position-relative" ref={dropdownRef}>
//       <button
//         className="btn d-flex align-items-center gap-2 rounded-pill px-6 py-2"
//         onClick={toggleDropdown}
//       >
       
//         <FiUsers size={24} />
//         <FiChevronDown size={24} />

//       </button>

//       {open && (
//         <div
//           className="position-absolute mt-2 p-3 bg-white rounded shadow"
//           style={{ right: 0, width: '260px', zIndex: 999 }}
//         >
//           <div className="fw-semibold text-center mb-2 text-dark">Welcome to Vidaki !</div>
//           <hr className="my-2" />
//           <button
//             onClick={onRegister}
//             className="btn btn-primary w-100 mb-2 rounded"
//           >
//             Create an account
//           </button>
//           <div className="text-center ">
//             Already a member?{' '}
//             <a href="#" onClick={onLogin} className="text-primary fw-semibold">
//               Log in
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDropdown;

'use client';

import React from 'react';
import { Dropdown } from 'antd';
import { FiUsers, FiChevronDown } from 'react-icons/fi';

const UserDropdown = ({ onLogin, onRegister }) => {
  const menuItems = [
    {
      key: 'register',
      label: (
        <div className="text-center">
          <div className="fw-semibold text-dark mb-2">Welcome to Vidaki!</div>
          <hr className="my-2" />
          <button
            className="btn btn-primary w-100 mb-2 rounded"
            onClick={onRegister}
          >
            Create an account
          </button>
          <div>
            Already a member?{' '}
            <a
              href="#"
              className="text-primary fw-semibold"
              onClick={onLogin}
            >
              Log in
            </a>
          </div>
        </div>
      ),
    },
  ];

  const dropdownProps = {
    menu: {
      items: menuItems,
    },
    placement: 'bottomRight',
    trigger: ['click'],
    overlayClassName: 'user-dropdown-menu',
  };

  return (
    <Dropdown {...dropdownProps} className="language_dropdown">
      <span className="d-flex align-items-center">
        <FiUsers size={22} />
        <FiChevronDown size={22} />
      </span>
    </Dropdown>
  );
};

export default UserDropdown;
