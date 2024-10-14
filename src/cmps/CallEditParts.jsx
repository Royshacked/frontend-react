import React, { useState } from 'react';
import { callService } from '../services/call';

export function CallEditParts() {
    // Options for the select dropdown
    // const options = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango'];
    const parts = callService.getParts()


    // State to manage the filtered options and user input
    const [filter, setFilter] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    // Handle input change
    function handleChange(event) {
        setFilter(event.target.value);
    };

    // Handle selection change
    function handleSelectChange(event) {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            {/* Input for filtering */}
            <input
                type="text"
                placeholder="Type to filter..."
                value={filter}
                onChange={handleChange}
            />

            {/* Select Dropdown */}
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="" disabled>Select an option</option>
                {parts
                    .filter(option => (option.name.toLowerCase().includes(filter.toLowerCase()) || option.partNum.includes(filter)))
                    .map((option, index) => (
                        <option key={index} value={option.name}>
                            {option.name} {option.partNum}
                        </option>
                    ))}
            </select>
        </div>
    );
};

