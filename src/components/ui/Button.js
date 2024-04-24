const Button = ({ children, onClick }) => {
  return (
    <button 
      className='yellow b pv2 ph3 bg-white hover-bg-gold bn br-pill b--yellow ma3' 
      type="button"
      onClick={onClick}  
    >
      {children}
    </button>
  );
}

export default Button;