/**
 * @file Combobox.tsx
 * @description  Custom combobox component
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-07-04
 * @module CustomComponent
 *
 */
'use client'
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem, } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from "react";

type ComboboxProps = { id: string; name: string }[];

export default function Combobox({ data, onChange }: {data : ComboboxProps, onChange : (id : string) => void}) {

    useEffect(() => {
        onChange(data.length > 0 ? data[data.length - 1].id : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    const handleOnChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string)
    }

    return (<FormControl sx={{minWidth:200}}>
        <InputLabel id="item-type-select-label">Dictionary</InputLabel>
        <Select
            labelId="item-type-select-label"
            id="item-type-select"
            name="languageCode" // IMPORTANT: Used by Server Action
            //defaultValue="" // Set initial value as an empty string for single select
            defaultValue={data.length > 0 ? data[data.length - 1].id : ""} 
            input={<OutlinedInput id="select-single" label="Item Type" />}
            // The onChange handler can be added here if needed to handle selection changes.
            onChange={handleOnChange}
            renderValue={(selected) => {
                 // Find the object with the matching id and return its name
                 const selectedItem = data.find((item) => item.id === selected);
                return selected ? selectedItem?.name : "Select an item"; // Display selected value or a placeholder
            }}
        >
            <MenuItem value="" disabled>
                Select an item
            </MenuItem>
            {data.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                    {x.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>);
}



