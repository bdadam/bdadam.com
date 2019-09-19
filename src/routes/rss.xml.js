import RSS from 'rss';

export async function get(req, res) {
    res.set('Content-Type', 'application/rss+xml');

    const feed = new RSS({
        title: 'Adam Beres-Deak',
        description: 'Blog',
        site_url: 'https://bdadam.com/',
        feed_url: 'https://feeds.feedburner.com/bdadamcom',
        image_url: '', // TODO
    });

    // TODO
    feed.item({
        title: 'TODO',
        description: '<p>TODO</p>',
        url: 'TODO',
        author: 'Adam Beres-Deak <me@bdadam.com>',
    });

    res.send(feed.xml({ indent: true }));

    // res.end(`<?xml version="1.0" encoding="UTF-8" ?>
    // <?xml-stylesheet type="text/css" href="http://bdadam.com/static/main.css" ?>
    // <rss version="2.0">
    //     <channel>
    //         <title>Adam Beres-Deak</title>
    //         <link>http://bdadam.com/</link>
    //         <description>Blog</description>
    //         {{#latestPosts pages}}
    //         <item>
    //             <title>{{data.title}}</title>
    //             <link>http://bdadam.com/{{ relativeLink }}</link>
    //             <description>
    //                 <![CDATA[
    //                 {{#markdown}}{{{data.abstract}}}{{/markdown}}
    //                 {{#markdown}}{{{page}}}{{/markdown}}
    //                 ]]>
    //             </description>
    //         </item>
    //         {{/latestPosts}}
    //     </channel>
    // </rss>`);
}
