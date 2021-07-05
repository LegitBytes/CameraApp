import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

interface MainProps extends RouteComponentProps{

}

const Main: React.FC<MainProps> = () => {
        return <div>Main</div>;
}

export default Main