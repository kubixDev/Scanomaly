import React from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';


interface CheckboxProperties {
  checked: boolean;
  onChange: () => void;
}

interface CheckboxContainerProperties {
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProperties> = ({ checked, onChange }) => {
  const handleClick = (e: React.MouseEvent) => {

    // prevents from opening a popup
    e.stopPropagation();
    onChange();
  };

  return (
    <CheckboxContainer onClick={handleClick} checked={checked}>
      {checked && <Check size={16} color="#f5f5f5" />}
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.div<CheckboxContainerProperties>`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  margin-left: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ checked }) => (checked ? '#2b57e4' : 'transparent')};
  border: 2px solid ${({ checked }) => (checked ? '#2b57e4' : 'rgba(255, 255, 255, 0.2)')};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #5276e9;
  }
`;

export default Checkbox;