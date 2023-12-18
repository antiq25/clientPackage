import React from 'react';

import { useWidgetData } from 'src/api/providers/widgetDataProvider';

function MyComponent() {
  const widgetData = useWidgetData();

  return (

    <div>
      {widgetData.map((widget) => (
        <div key={widget.id}>
          <h2>{widget.name}</h2>
          <p>{widget.description}</p>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
