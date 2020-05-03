import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import Link from 'next/link';
import { GitHub, Twitter, Linkedin, Xing, Email } from 'src/components/Icons';

const AboutPage: React.FC<{}> = () => {
    return (
        <div className="app flex flex-col min-h-screen">
            <SiteHeader />
            <div className="flex-grow">
                <h1>Hello</h1>

                <Link href="/">
                    <a className="hover:underline mb-1">Read my articles</a>
                </Link>
                <a href="mailto:me@bdadam.com" className="hover:underline flex items-center mb-1" title="E-Mail">
                    <Email width={32} height={32} className="mr-1 text-gray-700" />
                    Send me an e-mail
                </a>
                <a
                    href="https://github.com/bdadam"
                    className="hover:underline flex items-center mb-1"
                    rel="external"
                    title="GitHub"
                >
                    <GitHub width={32} height={32} className="mr-1" /> See my code on GitHub
                </a>
                <a
                    href="https://twitter.com/bdadamm"
                    className="hover:underline flex items-center mb-1"
                    rel="external"
                    title="Twitter"
                >
                    <Twitter width={32} height={32} className="mr-1" />
                    Follow me on Twitter
                </a>
                <a
                    href="https://www.linkedin.com/in/bdadam/"
                    className="hover:underline flex items-center mb-1"
                    rel="external"
                    title="LinkedIn"
                >
                    <Linkedin width={32} height={32} className="mr-1" />
                    Say hi on LinkedIn
                </a>
                <a
                    href="https://www.xing.com/profile/Adam_BeresDeak"
                    className="hover:underline flex items-center mb-1"
                    rel="external"
                    title="Xing"
                >
                    <Xing width={32} height={32} className="mr-1" />
                    Finde mich auf Xing
                </a>
            </div>
            <SiteFooter />
        </div>
    );
};

export default AboutPage;
