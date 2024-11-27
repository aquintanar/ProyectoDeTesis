import React, { useState } from 'react';

interface LikertScaleProps {
    value: number;
    onChange: (value: number) => void;
}

const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange }) => {
    const options = [1, 2, 3, 4, 5];

    return (
        <div className="flex justify-center space-x-8">
            {options.map((option) => (
                <label key={option} className="flex flex-col items-center space-y-2">
                    <input
                        type="radio"
                        name="likert"
                        value={option}
                        checked={value === option}
                        onChange={() => onChange(option)}
                        className="form-radio h-8 w-8 text-blue-600"
                    />
                    <span>{option}</span>
                </label>
            ))}
        </div>
    );
};

export default LikertScale;