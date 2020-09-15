import React from 'react';

type Repo = { id: number; full_name: string };

interface Repos {
  repos: Repo[];
}

const List: React.FC<Repos> = ({ repos }) => {
  if (!repos) return null;
  if (!repos.length) return <p>No repos, sorry</p>;
  return (
    <ul>
      {repos.map((repo) => {
        return <li key={repo.id}>{repo.full_name}</li>;
      })}
    </ul>
  );
};
export default List;
