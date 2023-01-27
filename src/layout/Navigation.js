import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';

export const Navigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>logo</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>intro</Link>
          </li>

          <li>
            <Link to='/shop'>shop</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
