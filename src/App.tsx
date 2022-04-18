import { useEffect, useState } from 'react';
import './App.css';
import { PropertyItem } from './components/PropertyItem';
import { Property } from './models/property';

const dummyProps: Property[] = [
  { name: 'type', values: ['primary', 'default'] },
  { name: 'size', values: ['small', 'large'] },
];

type FigmaVariantGroups = { [property: string]: { values: string[] } };

function App() {
  const [props, setProps] = useState<Property[]>(dummyProps);
  const [newProp, setNewProp] = useState<Property | null>();

  useEffect(() => {
    onmessage = (event) => {
      const variantGroups = event.data.pluginMessage
        .variantGroups as FigmaVariantGroups | null;
      if (variantGroups) {
        const _props: Property[] = Object.keys(variantGroups).map((key) => {
          return {
            name: key,
            values: variantGroups[key].values,
          };
        });
        setProps(_props);
      }
    };
  }, []);

  const addNewProp = () => {
    if (newProp) {
      setProps((_props) => [..._props, newProp]);
      setNewProp(null);
    }
  };

  const onUpdateProperty = (index: number, newProperty: Property) => {
    setProps((_props) => {
      const copy = [..._props];
      copy[index] = newProperty;
      return copy;
    });
  };

  return (
    <div className="App">
      <section className="preview">
        <h2>Preview</h2>
      </section>
      <section className="setting">
        <div>
          <h2>Properties</h2>
          <ul>
            {props.map((prop, index) => (
              <PropertyItem
                key={prop.name}
                property={prop}
                onUpdateProperty={(newProperty) =>
                  onUpdateProperty(index, newProperty)
                }
              />
            ))}
          </ul>
          <input type="text" value={newProp?.name || ''} />

          <button onClick={addNewProp}>add</button>
        </div>

        <div>
          <h2>Variant Settings</h2>
          <p>
            When Property is Value, set layername's background-color is #000000
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
