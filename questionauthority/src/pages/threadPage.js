import ContentList from "../components/listComponents/contentList";
import ThreadPostRow from "../components/listComponents/threadPostRow";

function ThreadPage() {
    const dataset = {};
    const forAuthority = (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-4'>
                        <button className='btn page-btn-3'>
                            <img className='page-btn-img' alt='Reply' title='Reply to question' src={require('../img/new_thread.svg')} />
                        </button>
                    </div>
                    <div className='col-4'>
                        <button className='btn page-btn-3'>
                            <img className='page-btn-img' alt='Delete' title='Delete question' src={require('../img/trash.svg)')} />
                        </button>
                    </div>
                    <div className='col-4'>
                        <button className='btn page-btn-3'>
                            <img className='page-btn-img' alt='Back' title='Back' src={require('../img/back.svg')} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    const forNonAuthority = (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-6'>
                        <button className='btn page-btn-2'>
                            <img className='page-btn-img' alt='Reply' title='Reply to question' src={require('../img/new_thread.svg')} />
                        </button>
                    </div>
                    <div className='col-6'>
                        <button className='btn page-btn-2'>
                            <img className='page-btn-img' alt='Back' title='Back' src={require('../img/back.svg')} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
    return (
        <>
            <h3 id='list-header'>{/* question title goes here */}</h3>
            {/* evaluate which version to present here */}
            <ContentList dataset={dataset} Component={ThreadPostRow} />
        </>
    );
}

export default ThreadPage;