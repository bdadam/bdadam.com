import { h } from 'preact';

const Breadcrumbs: React.FC<{}> = () => {
    return (
        <div className="">
            <a href="/">Home</a>
            &nbsp;{'>'}&nbsp;
            <a href="/blog">Articles</a>
        </div>
    );
};

export default Breadcrumbs;
