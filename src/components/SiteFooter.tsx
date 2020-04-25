const SiteFooter: React.FC<{}> = () => {
    return (
        <footer className="site-footer text-center p-6 bg-gray-200">
            <p>Adam Beres-Deak © {new Date().getFullYear()}</p>
        </footer>
    );
};

export default SiteFooter;
