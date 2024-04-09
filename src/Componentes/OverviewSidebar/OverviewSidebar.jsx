import React from 'react';
import './OverviewStyles.css';
import logo from './LogoBlanco.png'
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { AssetItem } from './AssetItem';

const OverviewSidebar = ({ homeUrl, list, loading, error, HandleSelectedAsset, selectedAsset }) => {

  function HandleClick(asset) {
    console.log("Clicked: ", asset)
    HandleSelectedAsset(asset);
  }

  return (
    <div className='SidebarOV-Container'>
      <div className='Sidebar-Top'>
        <Link to={homeUrl}>
          <img src={logo} alt='logo'></img>
        </Link>
        <div className='Sidebar-Top-Title'>
          Asset Management
        </div>
      </div>

      <div className='Sidebar-List'>
        <AssetItem
          key={'OverviewBtn'}
          asset={{ assetId: 'Overview', name: 'Overview' }}
          onClick={() => HandleSelectedAsset('Overview')}
          selected={!selectedAsset.assetId}
        />
        {loading ?
          <Spinner animation="border" variant="secondary" className='Spinner' />
          :
          list.length > 0 ?
            list.map((asset) => (
              <AssetItem
                key={asset.assetId}
                asset={asset}
                onClick={HandleClick}
                selected={selectedAsset.assetId === asset.assetId}
              />
            ))

            :
            <h5>No assets match the filter</h5>
        }
        {
          error && <h5>Error fetching assets</h5>
        }
      </div>
    </div>
  );
};

export default OverviewSidebar;
