import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Styles.css'

const EventsTable = ({ eventsList, totalAssetList, loading }) => {
    return (
        <div className='EventsTableContainer'>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Sev.</th>
                        <th style={{ width: '25%' }}>Time</th>
                        <th style={{ width: '15%' }}>Asset</th>
                        <th style={{ width: '55%' }}>Description</th>
                    </tr>
                </thead>
            </table>

            <div className='EventsTableBody'>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontWeight: 400 }}>
                    <tbody>
                        {eventsList.map((event) =>
                            <tr key={event.id} style={{ color: event.severity === 30 ? '#A00000' : event.severity === 20 ? '#B0B000' : 'black' }} >
                                <td style={{ width: '5%', textAlign: 'center' }}>{event.severity === 30 ? 'Error' : event.severity === 20 ? 'Warn' : 'Info'}</td>
                                <td style={{ width: '25%', textAlign: 'center' }}>{event.timestamp}</td>
                                <td style={{ width: '15%', textAlign: 'center' }}>{totalAssetList.find((asset) => asset.assetId === event.entityId).name}</td>
                                <td style={{ width: '55%', textAlign: 'center' }}>{event.description}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {loading && <Spinner />}
            {!loading && eventsList.length === 0 && <h4 style={{ marginTop: '1rem' }}>No events to show</h4>}
        </div>
    );
};

export default EventsTable;
