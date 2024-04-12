import cl from './CustomInput.module.css'

export const CustomInput = ({ input, onChange, ...props }) => {
  return <input className={cl.input} value={input} onChange={onChange} type="text" {...props} />;
};
