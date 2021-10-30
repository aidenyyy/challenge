import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgeForm = () => {
  const [ages, setAges] = useState([]);
  const [item, setItem] = useState('');

  const reduceDuplicate = (data) => {
    const result = [];
    const map = new Map();
    data.forEach((element) => {
      if (map.has(element)) {
        map.set(element, map.get(element) + 1);
      } else {
        map.set(element, 1);
      }
    });

    map.forEach((value, key) => {
      result.push({
        age: key,
        count: value,
      });
    });

    return result;
  };

  useEffect(() => {
    if (item) {
      axios.get('/users/age', { params: { item: item } }).then((res) => {
        setAges(reduceDuplicate(res.data));
      });
    }
  }, [item]);

  return (
    <>
      <h2>Age Demographic of Users With {item ? item : '___'}</h2>
      <select
        className='form-select'
        aria-label='Default select example'
        style={{ width: '10%', margin: '10px' }}
        defaultValue=''
        onChange={(e) => {
          setItem(e.currentTarget.value);
        }}
      >
        <option value='' disabled>
          Item
        </option>
        <option value='carrot'>carrot</option>
        <option value='apple'>apple</option>
        <option value='cake'>cake</option>
        <option value='tv'>tv</option>
        <option value='crackers'>crackers</option>
        <option value='chips'>chips</option>
        <option value='ham'>ham</option>
      </select>
      <table className='table' style={{ width: '50%' }}>
        <thead>
          <tr>
            <th>Age</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {ages.map((age, i) => {
            return (
              <React.Fragment key={i}>
                <tr>
                  <td>{age.age}</td>
                  <td>{age.count}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AgeForm;
