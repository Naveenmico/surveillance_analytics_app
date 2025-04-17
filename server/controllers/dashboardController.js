const dashboardModel = require('../models/dashboardModel');

const dashboardController = {
    getTreeview: async (req, res) => {
        try {
            // Fetch hierarchical data from the database
            const apiData = await dashboardModel.getTreeView();
            //console.log(apiData);

            // Function to recursively build the graph structure
            const buildGraph = (parentId) => {
                const children = [];

                // Find children of the current parent
                const childEntities = apiData.filter(row => row.master_id === parentId);

                // Loop through child entities
                childEntities.forEach(childEntity => {
                    const childNode = {
                        id: childEntity.id,
                        name: childEntity.name,
                        type: childEntity.type,
                        parent: parentId, // Add parent field
                        child: [],
                        liveURL: childEntity.liveURL, // Add liveURL field
                        isEnabled: childEntity.isEnabled, // Add isEnabled field
                        ip: childEntity.ip // Add ip field
                    };

                    // Recursively build children
                    childNode.child = buildGraph(childEntity.id);

                    // Add the child node to the children array
                    children.push(childNode);
                });

                return children;
            };

            // Build the graph starting from the root nodes (entities with null parent)
            const data = buildGraph('NULL');
            //console.log(data)
            // Send the response
            res.status(200).json({
                status: true,
                statusCode: '200',
                data: data
            });
        } catch (error) {
            console.log(`Error fetching details: ${error.message}`);
            res.status(500).json({
                status: false,
                statusCode: '500',
                error: error.message
            });
        }
    },
    getData : async(req,res) => {
        try {
            const data = await dashboardModel.getData();
            res.status(200).json({
                status: true,
                statusCode: '200',
                data: data
            });
        }catch(error){
            console.log(`Error fetching details: ${error.message}`);
            res.status(500).json({
                status: false,
                statusCode: '500',
                error: error.message
            })
        }
    },
    getTotalDetection : async(req,res) => {
        try {
            const data = await dashboardModel.getTotalDetection();
            res.status(200).json({
                status: true,
                statusCode: '200',
                data: data
            });
        }catch(error){
            console.log(`Error fetching details: ${error.message}`);
            res.status(500).json({
                status: false,
                statusCode: '500',
                error: error.message
            })
        }
    },
    getPieData : async(req,res) =>{
        const {timeTo,timeFrom} = req.body;
        try{
            const data = await dashboardModel.getPieData(timeTo,timeFrom);
            res.status(200).json({
                status: true,
                statusCode: '200',
                data: data
            });
        }catch(error){
            console.log(`Error fetching details: ${error.message}`);
            res.status(500).json({
                status: false,
                statusCode: '500',
                error: error.message
            })
        }
    },
    getBarData : async(req,res) =>{
        const {timeTo,timeFrom} = req.body;
        try{
            const data = await dashboardModel.getBarData(timeTo,timeFrom);
            res.status(200).json({
                status: true,
                statusCode: '200',
                data: data
            });
        }catch(error){
            console.log(`Error fetching details: ${error.message}`);
            res.status(500).json({
                status: false,
                statusCode: '500',
                error: error.message
            })
        }
    },
    getLineData : async(req,res) =>{
        const {timeTo,timeFrom} = req.body;
        try{
            const data = await dashboardModel.getLineData(timeTo,timeFrom);
            res.status(200).json({
                status: true,
                statusCode: '200',
                data: data
            });
        }catch(error){
            console.log(`Error fetching details: ${error.message}`);
            res.status(500).json({
                status: false,
                statusCode: '500',
                error: error.message
            })
        }
    }
};

module.exports = dashboardController;
