import { useEffect, useState } from 'react';
import TabItem from '../AssetTabs/TabItem';
import GridComponent from './GridComponent';
import GridElement from '../../Aplicaciones/Utils/GridElement';
import CustomGrid from '../../Aplicaciones/Utils/CustomGrid';

const Layout = () => {

    const [grid, setGrid] = useState([]);


    function HandleClicked(tab) {
        console.log("Clicked ", tab);

        if (tab === 'Grid')
            ClearGrid();

        if (tab === 'Demo') {
            const newGrid = [];
            newGrid.push(<GridComponent columns={4} rows={3} key={1} />)
            newGrid.push(<GridComponent columns={4} rows={1} key={2} />)
            newGrid.push(<GridComponent columns={2} rows={2} key={3} />)
            newGrid.push(<GridComponent columns={2} rows={2} key={4} />)
            newGrid.push(<GridComponent columns={2} rows={2} key={5} />)

            newGrid.push(<GridComponent columns={2} rows={3} key={6} />)
            newGrid.push(<GridComponent columns={4} rows={3} key={7} />)
            newGrid.push(<GridComponent columns={2} rows={2} key={8} />)
            newGrid.push(<GridComponent columns={2} rows={2} key={9} />)
            setGrid(newGrid);
        }

    }

    function ClearGrid() {
        const rows = 5;
        const cols = 10;
        const clearGrid = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                clearGrid.push(<div key={`${i}-${j}`} className="grid-cell">{`${i + 1}, ${j + 1}`}</div>);
            }
        }
        setGrid(clearGrid);
    }
    useEffect(() => {
        ClearGrid();
    }, []);

    return (
        <div className='App-Container'>
            <div className='Sidebar-Container'>
                Sidebar
            </div>
            <div className='Content-Container'>
                <div className="App-Header">
                    <div className='Header-Labels'>
                        <h3>{"Asset Name"}</h3>
                        <span>Asset Description</span>
                    </div>
                    <div className="Header-Tabs">
                        <TabItem label="Grid" clicked={HandleClicked} />
                        <TabItem label="Demo" clicked={HandleClicked} />
                        <TabItem label="Tab 3" clicked={HandleClicked} />
                        <TabItem label="Tab 4" clicked={HandleClicked} />
                    </div>
                </div>
                <CustomGrid cols={5} rows={5}>
                    <GridElement cols={2} rows={3}>
                        asdasdasd
                    </GridElement>
                    <GridElement cols={3} rows={2}>
                        asdasdasd
                    </GridElement>
                    <GridElement cols={2} rows={2}>
                        asdasdasd
                    </GridElement>
                    <GridElement cols={1} rows={2}>
                        asdasdasd
                    </GridElement>
                    <GridElement cols={2} rows={2}>
                        asdasdasd
                    </GridElement>
                </CustomGrid>
                {grid}
            </div>
        </div>
    );
}

export default Layout;