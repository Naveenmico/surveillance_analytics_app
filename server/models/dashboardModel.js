const dbHandeler = require("../dbHandler/dbHandler");

const dashboardModel = {
    getTreeView : async ()=>{
        let data = null;
        data = (await dbHandeler.fetchData('SELECT * FROM camera_details.hierarchy_entity_details')).rows;
        return data;
    },
    getData: async ()=>{
        let data = null;
        data = (await dbHandeler.fetchData('SELECT * FROM camera_details.detection_data')).rows;
        return data;
    },
    getTotalDetection: async ()=>{
        let data = null;
        const query = "WITH detection_counts AS (SELECT SUM(CASE WHEN detection = 'ET_INTRUSION' THEN count ELSE 0 END) AS intrusion_count,SUM(CASE WHEN detection = 'ET_DIRECTION' THEN count ELSE 0 END) AS wrong_direction_count,SUM(CASE WHEN detection = 'ET_PERSON' THEN count ELSE 0 END) AS person_count,SUM(CASE WHEN detection = 'ET_LOITRE' THEN count ELSE 0 END) AS loitre_count FROM camera_details.detection_data),total_counts AS (SELECT intrusion_count + wrong_direction_count + person_count + loitre_count AS total_detection_count,intrusion_count,wrong_direction_count,person_count,loitre_count FROM detection_counts) SELECT total_detection_count,intrusion_count,ROUND((intrusion_count::numeric / total_detection_count) * 100, 2) AS intrusion_percentage,wrong_direction_count,ROUND((wrong_direction_count::numeric / total_detection_count) * 100, 2) AS wrong_direction_percentage,person_count,ROUND((person_count::numeric / total_detection_count) * 100, 2) AS person_percentage,loitre_count,ROUND((loitre_count::numeric / total_detection_count) * 100, 2) AS loitre_percentage FROM total_counts;"
        data = (await dbHandeler.fetchData(query)).rows;
        return data;
    },
    getPieData: async (timeTo,timeFrom)=>{
        const values = [timeTo,timeFrom];
        let data = null;
        data = (await dbHandeler.fetchDataParameterized('',values)).rows;
        return data;
    },
    getBarData: async (timeTo,timeFrom)=>{
        const values = [timeTo,timeFrom];
        let data = null;
        data = (await dbHandeler.fetchDataParameterized('',values)).rows;
        return data;
    },
    getLineData: async (timeTo,timeFrom)=>{
        const values = [timeTo,timeFrom];
        let data = null;
        data = (await dbHandeler.fetchDataParameterized('',values)).rows;
        return data;
    },
}

module.exports = dashboardModel;