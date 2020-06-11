import Link from 'next/link';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { GitHub, Twitter, Linkedin, Xing, Email } from '../components/Icons';

const AboutPage: React.FC<{}> = () => {
    return (
        <div className="app flex flex-col min-h-screen">
            <SiteHeader />
            <div className="flex-grow w-full max-w-screen-xl mx-auto p-6">
                <div className="max-w-lg">
                    <h1 className="py-10 text-2xl">Hi, this is Adam</h1>
                    <p className="mb-2">
                        I'm a software engineer in Munich, Germany. I currently work as a lead software engineer at
                        AutoScout24 (the largest online car marketplace in Europe). There over 10 million users see and
                        use my work every month. I work on basically everything: frontend, backend, cloud-things and
                        sometimes ads and data analytics stuff.
                    </p>
                    <p className="mb-2">
                        Besides my day-to-day work I also I have a lot of side and fun projects. Of course most of them
                        never see the light of day. To see a few of them please see my{' '}
                        <a href="https://github.com/bdadam" className="">
                            GitHub profile
                        </a>
                        .
                    </p>

                    <p className="mb-2">
                        I am <a href="https://twitter.com/bdadamm">@bdadamm</a> on Twitter. Follow me and say hi.
                    </p>
                </div>

                <ul className="mt-6">
                    {/* <Link href="/">
                        <a className="hover:underline mb-1">Read my articles</a>
                    </Link> */}
                    <li>
                        <a
                            href="mailto:me@bdadam.com"
                            className="hover:underline inline-block align-middle items-center mb-1"
                            title="E-Mail"
                        >
                            <Email width={24} height={24} className="mr-2 inline-block" />
                            Send me an e-mail
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/bdadam"
                            className="hover:underline inline-block align-middle items-center mb-1"
                            rel="external"
                            title="GitHub"
                        >
                            <GitHub width={24} height={24} className="mr-2 inline-block" />
                            See my code on GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://twitter.com/bdadamm"
                            className="hover:underline inline-block align-middle items-center mb-1"
                            rel="external"
                            title="Twitter"
                        >
                            <Twitter width={24} height={24} className="mr-2 inline-block" />
                            Follow me on Twitter
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/bdadam/"
                            className="hover:underline inline-block align-middle items-center mb-1"
                            rel="external"
                            title="LinkedIn"
                        >
                            <Linkedin width={24} height={24} className="mr-2 inline-block" />
                            Find me on LinkedIn
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.xing.com/profile/Adam_BeresDeak"
                            className="hover:underline inline-block align-middle items-center mb-1"
                            rel="external"
                            title="Xing"
                        >
                            <Xing width={24} height={24} className="mr-2 inline-block" />
                            Finde mich auf Xing
                        </a>
                    </li>
                </ul>
            </div>
            <SiteFooter />
        </div>
    );
};

export default AboutPage;
