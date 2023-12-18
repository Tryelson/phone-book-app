import '../styles/components/LoadingContactItem.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

export default function LoadingContactItem(){

    return (
        <li className="contacts-list-item">
            <div className="user-infos loading">
                <span className="user-name">
                    <Skeleton count={1}/> <Skeleton count={1}/>
                    <div><Skeleton count={1} width='27px' height='26px' /></div>
                </span>
                <small className="user-phone"><Skeleton count={1}/></small>
            </div>

            <Skeleton count={1} height={'33px'} width='38px' />
        </li>
    )
}