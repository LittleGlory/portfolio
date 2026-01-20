import { Heart, Globe, BookOpen, Users, Leaf, Briefcase, Scale, Smile, Recycle } from 'lucide-react';

// Helper to pass components as data
const ImpactIcon = {
    Heart: <Heart className="w-6 h-6" />,
    Globe: <Globe className="w-6 h-6" />,
    BookOpen: <BookOpen className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Leaf: <Leaf className="w-6 h-6" />,
    Briefcase: <Briefcase className="w-6 h-6" />,
    Scale: <Scale className="w-6 h-6" />,
    Smile: <Smile className="w-6 h-6" />,
    Recycle: <Recycle className="w-6 h-6" />
};

export const impactCategories = [
    {
        id: "sdg12",
        type: "concept",
        title: "Circular Economy",
        sdg: "SDG 12",
        description: "Ensuring sustainable consumption and production patterns.",
        icon: ImpactIcon.Recycle,
        color: "bg-yellow-50 text-yellow-600 border-yellow-200",
        events: [
            {
                text: "Nava Pushpa: Turning sacred waste into products like incense sticks and dyes",
                link: "https://docs.google.com/document/d/1f8elhKZHJLGBhA1qUwSyyILhgKHOf1TGO7eSB_a03WE/edit?usp=sharing"
            }
        ]
    },
    {
        id: "sdg3",
        type: "project",
        title: "Good Health & Well-being",
        sdg: "SDG 3",
        description: "Ensuring healthy lives and promoting well-being for all at all ages.",
        icon: ImpactIcon.Heart,
        color: "bg-green-50 text-green-600 border-green-200",
        events: [
            {
                text: "Blood Donations",
                link: "https://www.instagram.com/p/DTaa166kt-o/?img_index=1"
            },
            {
                text: "Free Health Camp and Eye Checkup",
                link: "https://www.instagram.com/p/DQJcmiQEi4X/?img_index=1"
            },
            {
                text: "Youth Mental Health Summit",
                link: "https://www.instagram.com/p/DQKYXnREmYE/?img_index=2"
            },
            {
                text: "Sports Materials Donation",
                link: "https://www.instagram.com/p/DNU-gRVoCjz/?img_index=1"
            }
        ]
    },
    {
        id: "sdg4",
        type: "project",
        title: "Quality Education",
        sdg: "SDG 4",
        description: "Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities.",
        icon: ImpactIcon.BookOpen,
        color: "bg-red-50 text-red-600 border-red-200",
        events: [
            {
                text: "Financial Literacy",
                link: "https://www.instagram.com/p/DQJbdLTEkIc/?img_index=1"
            },
            {
                text: "Speech Competition for the Deaf",
                link: "https://www.instagram.com/p/DNSmjJ8oFQH/?img_index=1"
            },
            {
                text: "Poem Recitation Competition",
                link: "https://www.instagram.com/p/DQHvLHZkq8D/?img_index=1"
            }
        ]
    },

    {
        id: "sdg11",
        type: "project",
        title: "Sustainable Cities & Communities",
        sdg: "SDG 11",
        description: "Making cities and human settlements inclusive, safe, resilient, and sustainable through cultural preservation.",
        icon: ImpactIcon.Users,
        color: "bg-orange-50 text-orange-600 border-orange-200",
        events: [
            {
                text: "Radha Krishna Mandir Temple Cleaning",
                link: "https://www.instagram.com/p/DMsO4rrIPop/?img_index=1"
            },
            {
                text: "Teej Fellowship Event",
                link: "https://www.instagram.com/p/DN1EsxUZNqN/"
            },
            {
                text: "Kheer Khaane Din Celebration",
                link: "https://www.instagram.com/p/DNVImQeoE42/?img_index=1"
            },
            {
                text: "Deusi Bhailo",
                link: "https://www.instagram.com/p/DQKYm6VkuwA/"
            },
            {
                text: "Roots and Routes",
                link: "https://www.instagram.com/p/DTF5VNpkp0c/"
            },
            {
                text: "Mehendi Mania",
                link: "https://www.instagram.com/p/DNVTKI-oLIf/?img_index=1"
            }
        ]
    },
    {
        id: "sdg1",
        type: "project",
        title: "No Poverty & Reduced Inequalities",
        sdg: "SDG 1 & 10",
        description: "End poverty in all its forms everywhere and reduce inequality within and among countries.",
        icon: ImpactIcon.Smile,
        color: "bg-pink-50 text-pink-600 border-pink-200",
        events: [
            {
                text: "Jaado ma Nyano (Warmth in Winter)",
                link: "https://www.instagram.com/p/DTNYvrgEp8l/?img_index=1"
            },
            {
                text: "Joy of giving",
                link: "https://www.instagram.com/p/DQHvuSpkrI7/"
            },
            {
                text: "Furniture Donation",
                link: "https://www.instagram.com/p/DNVS-Qqon3i/?img_index=2"
            },
            {
                text: "WASH Project",
                link: "https://www.instagram.com/p/DNSeQ2KIquJ/?img_index=1"
            }
        ]
    },

];
