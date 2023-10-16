import React, { memo, useEffect, useState } from 'react';

const styleInput = {
  width: '100%',
  borderRadius: '5px',
  padding: '2px 10px',
  outline: 0,
}

const InputForm = ({ placeholder, value, name, type, inputRef, onChange, className }) => {
  let [text, setText] = useState('')
  useEffect(() => {
    if (value) setText(value)
    return () => setText('')
  }, [value])
  const changText = (e) => {
    setText(e.target.value);
  }

  return (
    <input style={styleInput}
      placeholder={placeholder ? placeholder : ''}
      className={className ? className : ''}
      ref={inputRef}
      name={name}
      value={text}
      type={type ? type : 'text'}
      onChange={onChange ? onChange : changText} />
  )
}

export default memo(InputForm);