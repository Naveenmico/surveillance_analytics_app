import React, { useState, useEffect } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FaCheckSquare, FaSquare, FaChevronDown, FaChevronRight, FaCamera } from 'react-icons/fa';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'; // Ensure this import for correct styles

const TreeView = ({ data }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [allNodeIds, setAllNodeIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allSelected, setAllSelected] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedNodes = convertToTree(data);
      setNodes(formattedNodes);
      setAllNodeIds(getAllNodeIds(formattedNodes));
    }
  }, [data]);

  // Function to convert JSON data to tree format
  const convertToTree = (data) => {
    const treeNodes = [];
    const nodeMap = {};

    // Helper function to recursively create tree nodes
    const createNode = (item) => {
      const { id, name, child } = item;
      const node = {
        value: id,
        label: <span>{name}</span>,
        children: child ? child.map(createNode) : [],
        icon: <FaCamera /> // Use the camera icon for each node
      };
      nodeMap[id] = node;
      return node;
    };

    // Iterate over the data to create tree nodes
    data.forEach(item => {
      const node = createNode(item);
      treeNodes.push(node);
    });

    // Connect parent nodes with their children
    data.forEach(item => {
      const { id, parent } = item;
      if (parent !== 'NULL') {
        const parentNode = nodeMap[parent];
        if (parentNode) {
          parentNode.children.push(nodeMap[id]);
        }
      }
    });

    return treeNodes;
  };

  // Function to get all node IDs for expanding/collapsing
  const getAllNodeIds = (nodes) => {
    let ids = [];
    const collectIds = (node) => {
      ids.push(node.value);
      if (node.children) {
        node.children.forEach(collectIds);
      }
    };
    nodes.forEach(collectIds);
    return ids;
  };

  // Function to filter nodes based on search query
  const filterNodes = (node) => {
    if (searchQuery === '') {
      return true; // Show all nodes if search query is empty
    }
    const label = node.label.props.children.toLowerCase();
    const matches = label.includes(searchQuery.toLowerCase());

    if (matches) {
      return true; // Node matches search query
    }

    // Recursively check child nodes
    const hasMatchingChild = node.children.some(child => filterNodes(child));
    return hasMatchingChild;
  };
  const handleSelectAllToggle = () => {
    if (allSelected) {
      setChecked([]);
      setAllSelected(false);
    } else {
      setChecked(allNodeIds);
      setAllSelected(true);
    }
  };

  const handleExpandAllToggle = () => {
    if (allExpanded) {
      setExpanded([]);
      setAllExpanded(false);
    } else {
      setExpanded(allNodeIds);
      setAllExpanded(true);
    }
  };

  const filteredNodes = nodes.filter(filterNodes);
  //console.log(allNodeIds)
  return (
    <Box sx={{ maxHeight: 220, overflowY: 'auto', overflowX: 'hidden', border: '1px solid #ccc', padding: 1 }}>
      <TextField
        id="outlined-basic"
        label="Search Camera"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Stack direction="row" spacing={1}>
        <Button variant="text" onClick={handleSelectAllToggle}>
          {allSelected ? 'Unselect All' : 'Select All'}
        </Button>
        <Button variant="text" onClick={handleExpandAllToggle}>
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </Button>
        </Stack>
      <CheckboxTree
        nodes={filteredNodes}
        checked={checked}
        expanded={expanded}
        onCheck={(newChecked) => setChecked(newChecked)}
        onExpand={setExpanded}
        icons={{
          check: <FaCheckSquare />,
          uncheck: <FaSquare />,
          halfCheck: <FaSquare />,
          expandClose: <FaChevronRight />,
          expandOpen: <FaChevronDown />,
          expandAll: <FaChevronRight />,
          collapseAll: <FaChevronDown />,
          parentClose: <FaChevronRight />,
          parentOpen: <FaChevronDown />,
          leaf: <FaCamera />, // Use camera icon for leaf nodes
        }}
      />
    </Box>
  );
};

export default TreeView;
