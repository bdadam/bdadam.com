import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const AboutPage: React.FC<{}> = () => {
    return (
        <div className="app flex flex-col min-h-screen">
            <SiteHeader />
            <div className="flex-grow">
                <h1>Hello</h1>
            </div>
            <SiteFooter />
        </div>
    );
};

export default AboutPage;
