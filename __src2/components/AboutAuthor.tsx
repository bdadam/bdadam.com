import React from 'react';

import { GitHub, Twitter, Email, Linkedin, Xing } from './Icons';

// type Props = {
//     avatar: string;
//     name: string;
//     title: string;

//     twitter?: string;
//     github?: string;
//     linkedin?: string;
//     xing?: string;
//     email?: string;
// };

const AboutAuthor: React.FC<{}> = () => {
    const authorLd = {
        '@context': 'http://schema.org',
        '@type': 'Person',
        name: 'Adam Beres-Deak',
        url: 'https://bdadam.com/',
        email: 'me@bdadam.com',
        image: 'https://bdadam.com/face.jpg',
        jobTitle: 'Lead Software Engineer',
        sameAs: [
            'https://twitter.com/bdadamm',
            'https://www.linkedin.com/in/bdadam/',
            'https://www.xing.com/profile/Adam_BeresDeak',
            'https://github.com/bdadam',
        ],
    };

    return (
        <>
            <a href="/about.html" className="block flex items-center mb-2">
                <div style={{ backgroundImage: 'url(/face.jpg)' }} className="rounded bg-contain w-12 h-12 mr-3"></div>
                <div>
                    <p className="font-bold text-xl">Adam Beres-Deak</p>
                    <p className="text-sm text-gray-700 small-caps">software engineer</p>
                </div>
            </a>
            <div className="">
                <a
                    href="https://github.com/bdadam"
                    className="hover:underline mr-2 inline-block"
                    rel="external"
                    title="GitHub"
                >
                    <GitHub width={32} height={32} />
                </a>
                <a
                    href="https://twitter.com/bdadamm"
                    className="hover:underline mr-2 inline-block"
                    rel="external"
                    title="Twitter"
                >
                    <Twitter width={32} height={32} />
                </a>
                <a href="mailto:me@bdadam.com" className="hover:underline mr-2 inline-block" title="E-Mail">
                    <Email width={32} height={32} />
                </a>
                <a
                    href="https://www.linkedin.com/in/bdadam/"
                    className="hover:underline mr-2 inline-block"
                    rel="external"
                    title="LinkedIn"
                >
                    <Linkedin width={32} height={32} />
                </a>
                <a
                    href="https://www.xing.com/profile/Adam_BeresDeak"
                    className="hover:underline mr-2 inline-block"
                    rel="external"
                    title="Xing"
                >
                    <Xing width={32} height={32} />
                </a>
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorLd) }}></script>
        </>
    );
};

export default AboutAuthor;