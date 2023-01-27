import classes from './Layout.module.css';
import { Navigation } from './Navigation';

export const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
};
