import React, { useEffect } from 'react'
import { SelectUnstyled } from '@mui/base';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { handleInputChange } from 'react-select/dist/declarations/src/utils';

interface FileIconProps {
    fileName: any;
    className?: string;
}

const Dropdown = ({ items, className, setGlobalFilterState, setFilterIndex, filterTagKey, setFilterTagKey }: any) => {

    const [pholder, setPholder] = React.useState('');
    const handleChange = (event: any) => {
        setGlobalFilterState(false);
        setPholder(event.target.value);
        setFilterTagKey([...filterTagKey, items[event.target.value]]);
        setFilterIndex(event.target.value);
    };
    return (
        <div className={className}>
            <FormControl size="small" sx={{ m: 0, minWidth: 100 }}>
                <InputLabel id="drop-label">Filter by</InputLabel>
                <Select
                    labelId="drop-label"
                    id="simple-select"
                    value={pholder}
                    label="Filter by"
                    autoWidth
                    onChange={handleChange}
                >
                    {items.map((value: any, index: any) => {
                        return <MenuItem value={index}>{value}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default Dropdown;