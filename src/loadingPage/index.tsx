import { type FC } from 'react'
import Scan from "@/components/scan";
import Skeleton from "@/components/skeleton";
const LoadingPage:FC = () => {
    return <div>
        <Scan>
            <Skeleton/>
        </Scan>
    </div>
}
export default LoadingPage
