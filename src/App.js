import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepository] = useState([]);

  // listar repositorio
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: 'ReactJs',
      url: 'http://github.com/ ',
      techs: ['React', 'ReactJS', 'React Native']
    });
    const repository = response.data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    const deleteRepo = repositories.filter(repo => repo.id !== id);
    setRepository([...deleteRepo]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
