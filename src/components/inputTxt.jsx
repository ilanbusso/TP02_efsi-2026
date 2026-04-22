import './inputTxt.css'

function InputText({ value, onChange, placeholder }) {
  return (
    <input
      className="campo"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default InputText
