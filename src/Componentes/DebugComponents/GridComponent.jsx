const GridComponent = ({columns, rows, key}) => {
    return (
        <div key={key} className='grid-cell' style={{ gridColumn: 'span '+columns, gridRow: 'span '+rows }} >
            {columns+'x'+ rows}
        </div>
    );
}

export default GridComponent;