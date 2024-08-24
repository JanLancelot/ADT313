import './FullName.css'

function FullName({firstName, middleInitial, lastName}) {
    return (
        <div className="">
            <h1><span className='first-name'>{firstName} <span className='middle-name'>{middleInitial}</span></span> <span className='last-name'>{lastName}</span></h1>
        </div>
    )
}

export default FullName;