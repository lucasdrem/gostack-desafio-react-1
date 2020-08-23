import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories")
     .then(response =>{
        setRepositories(response.data);
     });
  }, []);

  async function handleAddRepository() {
    const response =  await api.post("repositories", {
      "title": "Desafio Node.js",
      "url": "https://github.com/lucasdrem/gostack-desafio-node-1",
      "techs": ["Node.js", "javascript"]
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete("repositories/" + id);
    const repositoriesAfterDelete = repositories.filter(repository => repository.id !== id);
    setRepositories(repositoriesAfterDelete);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(el => {
          return (
            <li key={el.id}>
              {el.title}
              <button onClick={() => handleRemoveRepository(el.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
