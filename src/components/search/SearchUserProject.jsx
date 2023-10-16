import { AutoComplete } from 'antd';
import React, { useRef, useState } from 'react';

const SearchUserProject = ({ data, onSearch, onSelect }) => {
    const [valueSearch, setValueSearch] = useState();
    const searchRef = useRef();

    const options = data?.map((user, index) => {
        return { label: user.name, value: user.userId.toString() }
    })

    return (
        <AutoComplete
            value={valueSearch}
            onChange={(value) => {
                setValueSearch(value);
            }}
            options={options}
            style={{ width: '100%' }}
            onSelect={(value, option) => {
                setValueSearch(option.label);
                onSelect(value, option)
                setValueSearch('')
            }}
            onSearch={(value) => {
                if (searchRef.current) {
                    clearTimeout(searchRef.current);
                }
                searchRef.current = setTimeout(() => {
                    onSearch(value);
                }, 300)
            }}
            placeholder="Username"
        ></AutoComplete>
    )
}

export default SearchUserProject