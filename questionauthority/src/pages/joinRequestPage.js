import ContentList from "../components/listComponents/contentList";
import JoinRequestListRow from '../components/listComponents/JoinRequestListRow';

function JoinRequestsPage() {
    const dataset = {};
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <button className='btn back-btn'>
                        <img className='page-btn-img' alt='Back' title='Back' src={require('../img/back.svg')} />
                    </button>
                </div>
            </div>
            <h3 id='list-header'>Pending requests:</h3>
            <ContentList dataset={dataset} Component={JoinRequestListRow}/>
        </>
    );
}

export default JoinRequestsPage;