
import {v4 as uuidv4} from 'uuid'

const Mail = () => {

    return [            
            {
                subject: "Site-1 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site A",
                camera: "Camera 01 (192.168.1.107)",
                image: [{name:'Human',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'human',confidence:'75%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-2 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site B",
                camera: "Camera 03 (192.168.1.107)",
                image: [{name:'Animal',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'Human',confidence:'5%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-3 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site C",
                camera: "Camera 03 (192.168.1.107)",
                image: [{name:'Parking',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'Human',confidence:'85%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-4 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site A",
                camera: "Camera 01 (192.168.1.107)",
                image: [{name:'Hotel',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'human',confidence:'75%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-5 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site B",
                camera: "Camera 03 (192.168.1.107)",
                image: [{name:'Resturent',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'Human',confidence:'5%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-6 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site C",
                camera: "Camera 03 (192.168.1.107)",
                image: [{name:'Cycle',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'Human',confidence:'85%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-7 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site A",
                camera: "Camera 01 (192.168.1.107)",
                image: [{name:'Human'},{name:'Vehicle in motion'}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'human',confidence:'75%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-8 Subject",
                date: "The Field Tapes, xander",
                site: "Site B",
                camera: "Camera 03 (192.168.1.107)",
                image: [{name:'Car',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'Human',confidence:'5%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-9 Subject",
                date: "The Field Tapes, xander",
                site: "Site C",
                camera: "Camera 03 (192.168.1.107)",
                image: [{name:'Bus',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'Human',confidence:'85%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-10 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site A",
                camera: "Camera 01 (192.168.1.107)",
                image: [{name:'Truck',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'human',confidence:'75%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-11 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site B",
                camera: "Camera 03 (192.168.1.107)",
                image: [{name:'Bike',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'Human',confidence:'5%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
            {
                subject: "Site-12 Subject",
                date: "April 04 - 7:05,2021",
                site: "Site C",
                camera: "Camera 03 (192.168.1.107)",
                image: [{name:'Lion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"},{name:'Vehicle in motion',imgPath:"https://d39e2k7irzkh52.cloudfront.net/0bj1q94odi78pus1a4mrg6v9sg2k2inmqsa8de01/D06-2.jpg"}],
                id: uuidv4(),
                received: true,
                detectedinfo:[{name:'Human',confidence:'85%'},{name:'Vehicle in motion',confidence:'85%'}]

            },
        ];
    


}



export default Mail;




