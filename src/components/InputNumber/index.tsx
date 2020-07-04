import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

interface PriceValue {
  number?: number;
  currency?: "rmb" | "dollar";
}

interface PriceInputProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState("rmb");

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange({ number, currency, ...value, ...changedValue });
    }
  };

  const onNumberChange = (e: any) => {
    const newNumber = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!("number" in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{ width: 100 }}
      />
    </span>
  );
};

export default PriceInput;
