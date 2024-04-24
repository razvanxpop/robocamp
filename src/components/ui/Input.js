const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className="pa3 ba b--gold bg-gold ma2 bg-color-white"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input;