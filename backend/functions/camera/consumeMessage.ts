// import * as AWS from "aws-sdk";
import * as aws from "@aws-sdk/client-ses";
import * as AWS from "aws-sdk";
import * as nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const sqs = new AWS.SQS()
const prisma = new PrismaClient();
const queueUrl = "https://sqs.us-east-1.amazonaws.com/962195032846/EmailQueue";


export function consumeMessage(event) {
  console.log(event);

  const ses = new aws.SES({ apiVersion: "2010-12-01", region: "us-east-1" });

  let transport = nodemailer.createTransport({
    SES: { ses, aws },
  });
  const records = event.Records;
  let record;
  for (record in records) {
    let sqsMessage = JSON.parse(records[record].body);
    console.log("Inside sendMail method with SQS message :: ", sqsMessage);
    const rekognitionData = sqsMessage.data;
    const imageNames = rekognitionData.map(
      (data) => Object.keys(data)[0].split("/")[1]
    );
    const imageUrls = rekognitionData.map(
      (data) => "https://d39e2k7irzkh52.cloudfront.net/" + Object.keys(data)[0]
    );
    const attachments = [];
    for (let i = 0; i < imageNames.length; i++) {
      const newAttachment = {};
      newAttachment["filename"] = imageNames[i];
      newAttachment["path"] = imageUrls[i];
      attachments.push(newAttachment);
    }
    console.log("Attachments :: ", attachments);

    prisma.cameras.findUnique({
      where: {
        email: sqsMessage.from,
      },
      select: {
        camera_id: true,
        camera_name: true,
        smtp_user_name: true,
        smtp_password: true,
        is_disabled: true,
        change_name: true,
        groups: true,
        sites: true,
        integrators: true,
        users: true,
        email: true,
      },
    })
    .then(cameras => {
      console.log("Cameras inside SQS sendMail() :: ", { ...cameras });

      const emailMessage = {
        from: 'alert@yoursmartalert.com',
        to: cameras.users.map(user => user.user_email),
        subject: `Alert on ${cameras.camera_name}`,
        text: "Test Alert",
        attachments: attachments
      };
      console.log("Email info :: ", emailMessage);

      transport.sendMail(emailMessage, (err, info) => {
        if (err) {
          console.log("Unable to send email");
        }
        else {
          console.log("Email sent :: ", info);
        }
      });
    })
    .then(() => {
      // Delete message from SQS.
      const deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: records[record].receiptHandle,
      };
      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) {
          console.log("Error while Deleting message from SQS :: ", err);
        } else {
          console.log("Message Deleted :: ", data);
        }
      });
    })
    .catch(error => {
      console.log({
        message: "Catch block getting cameras from DB.",
        error,
      });
    });

    return true;
  }
}
  // const queueUrl = "https://sqs.us-east-1.amazonaws.com/962195032846/EmailQueue";

  // const params = {
  //   QueueUrl: queueUrl,
  //   VisibilityTimeout: 600, // 10 min wait time for anyone else to process.
  // };

//   sqs.receiveMessage(params, async function (err, data) {
//     if (err) {
//       console.log({
//         message: constants.SQS_ERROR,
//         error: err,
//       });
//     } else {
//       console.log("Recieved message from SQS :: ", data);
//       await sendMail(data);

//       // Delete message from SQS.
//       const deleteParams = {
//         QueueUrl: queueUrl,
//         ReceiptHandle: data.Messages[0].ReceiptHandle,
//       };
//       sqs.deleteMessage(deleteParams, function (err, data) {
//         if (err) {
//           console.log("Error while Deleting message from SQS :: ", err);
//         } else {
//           console.log("Message Deleted :: ", data);
//         }
//       });
//     }
//   });
