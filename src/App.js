import React, { useState } from 'react';

const App = () => {
  const [components, setComponents] = useState([]);
  const [newComponent, setNewComponent] = useState({
    type: 'notification',
    grid: { w: 1, h: 1 },
    properties: { text: '', color: 'red' },
  });

  const renderComponents = () => {
    let currentPosition = 0;

    return components.map((component, index) => {
      const style = {
        width: `${component.grid.w  }px`,
        height: `${component.grid.h }px`,
        backgroundColor: component.properties.color,
        position: 'relative',
        margin:'20px',
         float:'left',
        borderRadius:'10px',
        left: `${currentPosition}px`,
      };

      currentPosition += component.grid.w ; // Adding 5px gap between components

      return (
        <div key={index} className="component" style={style}>
          {component.properties.text}
          <div>
           
          <label>component{index+1}</label><br/>
          <div>
          <button onClick={() => handleRemove(index)} style={{marginTop:"98%", borderRadius:"5px"}}>Remove</button>
          </div>
          </div>
        </div>
      );
    });
  };

  const handleEdit = (index) => {
    // Implement edit functionality if needed
    console.log(`Editing component at index ${index}`);
  };

  const handleRemove = (index) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1);
    setComponents(updatedComponents);
  };

  const handleGenerateWebpage = () => {
    const containerWidth = prompt('Enter container width:');
    const containerHeight = prompt('Enter container height:');

    // Validate input (you may want to add more validation)
    if (!containerWidth || !containerHeight) {
      alert('Please enter valid dimensions.');
      return;
    }

    const totalWidth = components.reduce((sum, component) => sum + component.grid.w , 0);
    const totalHeight = components.reduce((max, component) => Math.max(max, component.grid.h ), 0);

    const container = document.getElementById('componentsContainer');
    container.style.width = `${Math.max(totalWidth + 5 * (components.length - 1), containerWidth)}px`;
    container.style.height = `${Math.max(totalHeight, containerHeight)}px`;
  };

  const handleAddComponent = () => {
    setComponents([...components, { ...newComponent }]);
    setNewComponent({
      type: 'notification',
      grid: { w: 1, h: 1 },
      properties: { text: '', color: 'red' },
    });
  };

  return (
    <div>
      <div>

        
        <label>
          Component Width:
          <input
            type="text"
            value={parseInt(newComponent.grid.w)}
            onChange={(e) =>
              setNewComponent({ ...newComponent, grid: { ...newComponent.grid, w: +e.target.value } })
            }
          />
        </label>
        <label>
          Component Height:
          <input
            type="text"
            value={parseInt(newComponent.grid.h)}
            onChange={(e) =>
              setNewComponent({ ...newComponent, grid: { ...newComponent.grid, h: +e.target.value } })
            }
          />
        </label>
        <button onClick={handleAddComponent}>Add Component</button>
      </div>
      <div id="componentsContainer" style={{ position: 'relative' }}>
        {renderComponents()}
      </div>
     
    </div>
  );
};

export default App;
