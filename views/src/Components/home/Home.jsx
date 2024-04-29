import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import getUser from '../api/getUser';

const Home = () => {
    const { userId } = useParams();
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser(userId);
                setUserName(userData.name);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [userId, userName]);

    return (
        <Typography>Welcome {userName}!</Typography>
    );
};

export default Home;
