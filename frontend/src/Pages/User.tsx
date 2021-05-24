import React from "react";
import { RouteComponentProps } from "react-router-dom";
interface UserProps extends RouteComponentProps {}

const User: React.FC<UserProps> = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
      quidem obcaecati dicta ut, error eligendi iste ipsa voluptas praesentium,
      blanditiis veritatis explicabo dolor consequuntur maiores tempora esse
      sint voluptates odio.
    </div>
  );
};

export default User;
