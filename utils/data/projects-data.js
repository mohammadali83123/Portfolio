import ayla from '/public/image/ayla.jpg';
import crefin from '/public/image/crefin.jpg';
import realEstate from '/public/image/real-estate.jpg';
import travel from '/public/image/travel.jpg';

export const projectsData = [
    {
        id: 1,
        name: 'LawMadad (Final Year Project)',
        description: "Developing an AI-powered mobile application to provide legal guidance based on Pakistani law, aimed at professionals and civilians.",
        tools: ['React Native', 'Expo','SpringBoot',' JavaMailSender ','MongoDB', 'MySQL', 'Llama 3.1 Model', 'RAG pipeline','AWS EC2', 'AWS S3', 'Firebase'],
        role: 'Full Stack Developer',
        code: '',
        demo: '',
        image: crefin,
    },
    {
        id: 2,
        name: 'CodeTribute',
        description: 'Designed a code collaboration platform rewarding users for contributions (commits).',
        tools: ['ReactJS', 'Tailwind CSS', "NodeJS", "ExpressJS", "MySQL", "Blockchain"],
        role: 'Backend Developer',
        code: '',
        demo: '',
        image: travel,
    },
    {
        id: 3,
        name: 'Digital Voting Management Platform',
        description: 'Created a secure, user-friendly platform for voter registration, ballot creation, and real-time vote tabulation.',
        tools: ['React', 'NodeJS','ExpressJS', 'Bootstrap',  'MySQL'],
        code: '',
        role: 'Backend Developer',
        demo: '',
        image: realEstate,
    },
    {
        id: 4,
        name: 'RouteMate: Red Bus Route Navigator',
        description: "The People Bus Service project console based project helps users navigate Pakistan's public transport system by identifying the best bus routes and transfer points for their journey. It simplies travel by providing clear guidance on which buses to take and where to switch.",
        tools: ["C++","DevC++"],
        code: '',
        demo: '',
        image: ayla,
        role: 'Programmer',
    }
];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     image: crefin,
// },