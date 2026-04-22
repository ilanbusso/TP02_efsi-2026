function InputNum({ value, onChange, placeholder }) {
  return (
    <input
      className="campo"
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min="1"
    />
  )
}

export default InputNum
