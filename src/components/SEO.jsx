import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, name, type, path, image }) => {
    const location = useLocation();
    const siteUrl = 'https://saakshibaheti.com.np';
    const canonicalUrl = path ? `${siteUrl}${path}` : `${siteUrl}${location.pathname}`;
    const defaultImage = `${siteUrl}/hero.png`; // Fallback image
    const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

    return (
        <Helmet>
            { /* Standard metadata tags */}
            <title>{title} | Little Glory</title>
            <meta name='description' content={description} />
            <link rel="canonical" href={canonicalUrl} />

            { /* End of standard metadata tags */}
            { /* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonicalUrl} />

            { /* End of Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            { /* End of Twitter tags */}
        </Helmet>
    )
}

SEO.defaultProps = {
    title: 'Portfolio',
    description: 'Portfolio of a Creative Content Writer & Frontend Developer specializing in SEO, ASO, and aesthetic web design.',
    name: 'Saakshi Baheti',
    type: 'website'
}

export default SEO;
