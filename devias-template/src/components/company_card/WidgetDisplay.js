import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from 'src/hooks/decode';

const UserWidgets = () => {
  const [widgets, setWidgets] = useState([]);
  const userId = useUser();

  useEffect(() => {
    if (userId) {
      fetchUserWidgets();
    }
  }, [userId]);

  const fetchUserWidgets = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/scrape/user-widgets`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setWidgets(response.data); // Set the state with the response data
    } catch (error) {
      console.error('Error fetching widgets', error);
    }
  };

  return (
    <div>
      {widgets.length === 0 ? (
        <p>No widgets found for this user.</p>
        ) : (
          <ul>
          {widgets.map(widget => (
            <li key={widget.id}>
              <img src={widget.business.featuredImage} alt={widget.business.name} />
              <h4>{widget.business.name}</h4>
              <p>{widget.business.categories}</p>
              {/* Display additional widget details here */}
              <p>View Count: {widget.viewCount}</p>
              <p>Click Count: {widget.clickCount}</p>
              {/* Include more business information as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserWidgets;
