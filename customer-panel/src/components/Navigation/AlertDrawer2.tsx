import React, { useEffect, useCallback, useState } from "react";

import { useHistory } from "react-router-dom";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import data from './data'

interface MainDrawerProp {
  classes: ClassNameMap<"tvRoot">;
}

const AlertDrawers: React.FC<MainDrawerProp> = ({ classes }) => {
  const history = useHistory();
  const [Datas, setDatas] = React.useState(data());

  console.log(Datas)

  return (
    <>
         <div style={{ color:"white", border: "1px solid white", borderLeft: "0px solid", borderRight: " 0px solid" }}>
           
         {Datas.map((mail , i)  => (
            <div onClick={() => {
                history.push(`/alert/${mail.subject}`)
            }} style={{ padding: "0", margin: "0" }}>
                <h3>{mail.subject}</h3>
                <h4>{mail.date}</h4>
                <hr></hr>
            </div>
            
        ))}
        </div>
    

    </>
  );
};

export default AlertDrawers;
