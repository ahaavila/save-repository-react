import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  // Sempre que a tela recarregar a api vai ser carregada
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repository ${Date.now()}`,
      url: 'url do repositorio',
      techs: 'techs',
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repository = repositories.findIndex(rep => rep.id === id);

    const list = [...repositories];

    list.splice(repository, 1);

    setRepositories(list);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
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
