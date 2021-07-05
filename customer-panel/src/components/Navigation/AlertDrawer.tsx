import React, { useEffect, useCallback, useState } from "react";
import LoadingScreen from "../../shared/LoadingScreen";
import axios, { AxiosResponse } from "axios";
import { cameraDetails , user} from "../interfacess";
import { useHistory } from "react-router-dom";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

interface MainDrawerProp {
  classes: ClassNameMap<"tvRoot">; 
}

const AlertDrawer: React.FC<MainDrawerProp> = ({ classes }) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [customerDetails, setCustomerDetails] = useState<cameraDetails[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  
  const getImageUrls = (data: cameraDetails) => {
    const imgUrls: string[] = [];
    if (data?.rekognitionData) {
      data.rekognitionData.forEach((item) => {
        let imgUrl = Object.keys(item)[0];
        imgUrls.push(imgUrl);
      });
      if (imgUrls.length === 0) {
        imgUrls.push("not-available/not-available.jpg");
      }
    } else {
      imgUrls.push("not-available/not-available.jpg");
    }
    setImageList(imgUrls);
  };



  const getCustomerDetails = useCallback(async () => {
    setLoading(true);
    try { 
      const res: AxiosResponse<{ user: user }> = await axios.get(
        'https://ao50moga4g.execute-api.us-east-1.amazonaws.com/dev/user-details/6029f127-d062-4ad3-9622-f55bf99e7ee8'
      );
      console.log("This is customers -> ", res.data.user.camera_details);
      setCustomerDetails(res.data.user.camera_details);
      getImageUrls(res.data.user.camera_details[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false); 
    }           
  }, [])
  console.log(customerDetails[0])

  useEffect(() => {
    getCustomerDetails();                                      
    return () => {
      setCustomerDetails([]);
    };
  }, [getCustomerDetails]);
  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (event: any, nodes: any) => {
    setExpanded(nodes);
  };

  return (
    <>
      <div style={{ color: "white", border: "1px solid white", borderLeft: "0px solid", borderRight: " 0px solid" }}>

     
      {loading ? (
        <LoadingScreen white />
      ) : ( <>
            {customerDetails.map((mail) => (
              <div onClick={() => { history.push(`/alert/${mail.subject}`) }} style={{ border: "1px solid white", borderLeft: "0px solid", borderRight: " 0px solid" }}>
                <h3>{mail.subject}</h3>
                <h4>{mail.timestamp}</h4>
              </div>
              ))} </>

        )}




          
      </div>

    </>
  )  
};

export default AlertDrawer;
