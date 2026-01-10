import { useState, useEffect } from 'react';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

/**
 * Custom hook to fetch page content from CMS
 */
export const usePageContent = (pageId: string) => {
    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/api/cms/public/pages/${pageId}`);
                const data = await response.json();

                if (data.success) {
                    setContent(data.data || []);
                } else {
                    setError('Failed to load content');
                }
            } catch (err) {
                setError('Error fetching content');
                console.error('CMS content fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (pageId) {
            fetchContent();
        }
    }, [pageId]);

    return { content, loading, error };
};

/**
 * Custom hook to fetch a specific page section from CMS
 */
export const usePageSection = (pageId: string, sectionKey: string) => {
    const [section, setSection] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSection = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/api/cms/public/pages/${pageId}/${sectionKey}`);
                const data = await response.json();

                if (data.success && data.data) {
                    setSection(data.data);
                } else {
                    setError('Section not found');
                }
            } catch (err) {
                setError('Error fetching section');
                console.error('CMS section fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (pageId && sectionKey) {
            fetchSection();
        }
    }, [pageId, sectionKey]);

    return { section, loading, error };
};

/**
 * Custom hook to fetch social links from CMS
 */
export const useSocialLinks = () => {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/api/cms/public/social`);
                const data = await response.json();

                if (data.success) {
                    setLinks(data.data || []);
                } else {
                    setError('Failed to load social links');
                }
            } catch (err) {
                setError('Error fetching social links');
                console.error('CMS social links fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, []);

    return { links, loading, error };
};

/**
 * Custom hook to fetch SEO metadata from CMS
 */
export const useSEOMetadata = (pageId: string) => {
    const [metadata, setMetadata] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/api/cms/public/seo/${pageId}`);
                const data = await response.json();

                if (data.success && data.data) {
                    setMetadata(data.data);
                }
            } catch (err) {
                setError('Error fetching SEO metadata');
                console.error('CMS SEO metadata fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (pageId) {
            fetchMetadata();
        }
    }, [pageId]);

    return { metadata, loading, error };
};

/**
 * Helper function to get section content by key from an array of sections
 */
export const getSectionContent = (sections: any[], sectionKey: string) => {
    const section = sections.find(s => s.section_key === sectionKey);
    return section?.content || null;
};
