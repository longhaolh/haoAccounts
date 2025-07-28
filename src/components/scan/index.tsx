import styles from './style.module.scss'
import { useMemo, type CSSProperties, type FC, type HTMLAttributes } from 'react'
// 注册Props
type Props = HTMLAttributes<HTMLDivElement> & {
    lightWidth?: CSSProperties['width'],
    lightBG?: CSSProperties['background'],
    lightDegree?: string
}

const Scan: FC<Props> = (Props: Props) => {
    const {
        children,
        lightWidth = 40,
        lightBG = 'linear-gradient(90deg,rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.24) 50%, rgba(255, 255, 255, 0) 0%)',
        lightDegree = '22.45deg'
    } = Props
    const lightStyles = useMemo<CSSProperties>(() => {
        return {
            width: lightWidth,
            background: lightBG,
            transform: `rotate(${lightDegree}) scaleY(2)`
        }
    },[lightDegree,lightBG,lightWidth])
    return (
        <div className={styles.container}>
            {children}
            <div className={styles.mask}>
                <div className={styles.sweepLight} style={lightStyles}></div>
            </div>
        </div>
    )
}
export default Scan;