'use client';
import { t } from '@/utils';
import React from 'react';
import { Dropdown } from 'antd';
import { FiUsers, FiChevronDown } from 'react-icons/fi';

const UserDropdown = ({ onLogin, onRegister }) => {
  const menuItems = [
    {
      key: 'register',
      label: (
        <div className="text-center">
          <div className="fw-semibold text-dark mb-2">{t('welcomeTo')} Vidaki!</div>
          <hr className="my-2" />
          <button
            className="btn btn-primary w-100 mb-2 rounded"
            onClick={onRegister}
          >
            {t('createAccount')}
          </button>
          <div>
            {t('haveAccount')}?{' '}
            <a
              href="#"
              className="text-primary fw-semibold"
              onClick={onLogin}
            >
              {t('logIn')}
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
      <span className="d-flex align-items-center ">
        <FiUsers size={24} />
        <FiChevronDown size={24} />
      </span>
    </Dropdown>
  );
};

export default UserDropdown;
