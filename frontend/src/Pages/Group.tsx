import React from "react";
import { RouteComponentProps } from "react-router";

interface GroupProps extends RouteComponentProps {}

const Group: React.FC<GroupProps> = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro hic qui, id
      labore, minus dolores fugiat suscipit non laboriosam placeat ipsa ipsam
      minima pariatur asperiores nisi distinctio laborum nobis numquam?
    </div>
  );
};

export default Group;
