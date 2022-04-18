import { useEffect, useState } from 'react';
import { Property } from '../models/property';

type Props = {
  property: Property;
  onUpdateProperty: (newProperty: Property) => void;
};

export const PropertyItem: React.FC<Props> = (props) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    if (isEditingName) {
      setEditingName(props.property.name);
    }
  }, [isEditingName]);

  const onBlurNameField = () => {
    props.onUpdateProperty({ ...props.property, name: editingName });
    setIsEditingName(false);
  };

  return (
    <li>
      {isEditingName ? (
        <input
          type="text"
          maxLength={64}
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
          autoFocus
          onBlur={onBlurNameField}
        />
      ) : (
        <button onClick={() => setIsEditingName(true)}>
          {props.property.name}
        </button>
      )}

      <button>{props.property.values.join('/')}</button>
    </li>
  );
};
