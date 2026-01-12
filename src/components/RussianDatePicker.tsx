import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

interface RussianDatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const RussianDatePicker: React.FC<RussianDatePickerProps> = ({ value, onChange }) => {
  const [type, setType] = useState<'text' | 'date'>('text');

  const formatDate = (isoDate: string) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Form.Control
      type={type}
      value={type === 'date' ? value : formatDate(value)}
      onChange={handleChange}
      onFocus={() => setType('date')}
      onBlur={() => setType('text')}
      placeholder="дд.мм.гггг"
    />
  );
};
