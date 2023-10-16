import React, { memo } from 'react'

const Select = ({ className, data, handleChange, value, keys, name }) => {
    const renderItem = () => {
        return data?.map((item, index) => {
            return <option key={index} value={index + 1}>{item[keys]}</option>
        })
    }

    return (
        <select name={name} 
        className={className ? className : ''}
        value={value} style={{
            height: '35px',
            background: '#fff',
            padding: '2px 5px',
            borderRadius: '10px',
        }} onChange={(e) => handleChange(e)} >
            {renderItem()}
        </select >
    )
}

export default memo(Select);