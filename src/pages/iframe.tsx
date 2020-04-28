const IframePage: React.FC<{}> = () => {
    return (
        <div>
            <h1>Hello</h1>
            <div dangerouslySetInnerHTML={{ __html: `<script>console.log('HELLOOOOOO');</script>` }}></div>
        </div>
    );
};

export default IframePage;
