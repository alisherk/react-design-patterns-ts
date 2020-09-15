import React, { useState, useEffect } from 'react';
import { withLoader } from './WithLoader';
import List from './List';

const ListWithLoading = withLoader(List);

export const UseWithLoader = () => {
    
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/farskid/repos`)
      .then((json) => json.json())
      .then((repos) => {
        setRepos(repos);
        setLoading(false);
      });
  }, []);

  return <ListWithLoading loading={loading} repos={repos} />;
};


