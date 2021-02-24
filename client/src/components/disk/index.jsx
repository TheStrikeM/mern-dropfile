import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFiles} from "../../actions/file";
import FileList from "./fileList/FileList";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)

    React.useEffect(() => {
        getFiles(currentDir, dispatch)
    }, [currentDir])
    return (
        <div className={"disk"}>
            <div className="disk__title">Files</div>
            <FileList />
        </div>
    );
};

export default Disk;