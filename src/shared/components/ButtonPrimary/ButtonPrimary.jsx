import cn from 'classnames';
import cl from './ButtonPrimary.module.css';

export const ButtonPrimary = ({ children, className, ...props }) => {
  return (
    <button className={cn(cl.buttonPrimary, className)} {...props}>
      {children}
    </button>
  );
};
