import { Select } from 'antd';
import React, { memo } from 'react'

const SearchUserTask = ({ mode, data, onChange, onSelect }) => {
    const options = data?.map((user, index) => {
        return { label: user.name, value: user.userId }
    })
    return (
        <Select
            mode={mode ? mode : ''}
            size='default'
            options={options}
            placeholder="Select user"
            onSelect={(value) => onSelect ? onSelect(value) : null}
            optionFilterProp="label"
            onChange={onChange}
            style={{ width: '100%' }}
            maxTagCount='responsive' />
    )
}

export default memo(SearchUserTask)