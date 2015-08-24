import React from 'react';
//import DirectoriesPage from './DirectoriesPage/DirectoriesPage';
import DirectoryPage from './DirectoryPage/DirectoryPage';

import directories from "../data/getDirectories.json";
import directory from "../data/getDirectory.json";


import "./App.less";


React.render(
    //<DirectoriesPage directories={directories.response.directories}/>,
    <DirectoryPage directory={directory.response.directory}/>,
    document.body.firstChild
);
