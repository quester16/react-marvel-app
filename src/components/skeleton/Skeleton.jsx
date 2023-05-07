import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './skeleton.scss'

function SkeletonCard() {
    return ( 
        <div className="card__wrapper">
            <div className="card__header">
                <div className="img"><Skeleton circle width={40} height={40}/></div>
                <div className="desc"><Skeleton count={3} style={{marginBottom: 10}}/></div>
                
            </div>
            <div className="card__content">
                <Skeleton style={{marginBottom: 10, fontSize: 25, width: 100}}/>
                <Skeleton count={4} style={{marginBottom: 10}}/>
            </div>
        </div>
     );
}

export default SkeletonCard;