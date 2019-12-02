import React from 'react';

export type HomePage = {
    topArticles?: string[];
};

const HomePage: React.FC<HomePage> = ({ topArticles }) => {
    return <div>{topArticles && topArticles.join(', ')}</div>;
};

export default HomePage;
