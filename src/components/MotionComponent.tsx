import { FC, ReactNode } from "react"
import {motion} from 'framer-motion'
interface Props {
    duration: number,
    children: ReactNode
}
const MotionComponent: FC<Props> = ({duration, children}) => {
  return (
   <motion.div initial={{opacity:0,scale:0.95} } animate={{opacity:1, scale:1}}
           transition={{duration}}>
            {children}
            </motion.div>
  )
}

export default MotionComponent
