
'use client';

import { useDispatch } from 'react-redux';
import Image from "next/image";
import { openModal } from '@/redux/authModalSlice';

export default function NavBar() {
  const dispatch = useDispatch();

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image
            className="nav__img"
            src="/logo.png"
            alt="Summarist logo"
            width={200}
            height={200}
          />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login">
            <button type="button" onClick={() => dispatch(openModal('login'))}>
              Login
            </button>
          </li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
