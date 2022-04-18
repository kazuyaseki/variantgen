import { useEffect, useState } from 'react';
import { configurableStyles } from '../models/configurableStyle';
import { Property } from '../models/property';

type Props = {
  properties: Property[];
};

export const VariantSettingItem: React.FC<Props> = (props) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  useEffect(() => {
    setSelectedProperty(props.properties[0]);
    setSelectedVariant(props.properties[0].values[0]);
  }, [props]);

  const onChangeProperty = (name: string) => {
    const newProperty = props.properties.find((p) => p.name === name);
    if (newProperty) {
      setSelectedProperty(newProperty);
      setSelectedVariant(newProperty.values[0]);
    }
  };

  const onChangeVariant = (variant: string) => {
    setSelectedVariant(variant);
  };

  return (
    <p>
      When{' '}
      <select
        value={selectedProperty?.name}
        onChange={(e) => onChangeProperty(e.target.value)}
      >
        {props.properties.map((prop) => (
          <option key={prop.name} value={prop.name}>
            {prop.name}
          </option>
        ))}
      </select>
      is
      <select
        value={selectedVariant}
        onChange={(e) => onChangeVariant(e.target.value)}
      >
        {selectedProperty?.values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      , set layername's
      <select
        value={selectedVariant}
        onChange={(e) => onChangeVariant(e.target.value)}
      >
        {configurableStyles.map((style) => (
          <option key={style.value} value={style.value}>
            {style.displayName}
          </option>
        ))}
      </select>
      is #000000
    </p>
  );
};
