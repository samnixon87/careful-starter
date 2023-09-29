import {useRef, useEffect, useState} from 'react'
import Visit from '../Visit/'
import {debounce} from 'lodash-es'
import { UL, List } from './styles'
import { ICaregiver, ICareEvent } from '../../../common/interfaces'

interface IProps {
  careEvents: ICareEvent | null;
  caregivers: ICaregiver | null;
  careRecipientName: string;
  isPanelOpen: boolean;
  pickEvent: any;
}

const EventContainer:React.FC<IProps> = ({ careEvents, caregivers, pickEvent, isPanelOpen, careRecipientName }) => {

    const [scroll, setScroll] = useState(0)
    const prevPanelState = useRef(false)

    useEffect(() => {
      const handleScroll = debounce(() => {
        setScroll(window.scrollY)
      }, 100)

      if (!isPanelOpen) {
        window.addEventListener('scroll', handleScroll)
      }

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [isPanelOpen])

    useEffect(() => {
      if (prevPanelState.current && !isPanelOpen) {
        window.scroll(0, scroll)
      }

      prevPanelState.current = isPanelOpen
    }, [isPanelOpen, prevPanelState, scroll])

    return(
      <>
        <List>
          { Object.keys(careEvents!).map((key:string) => (
            <UL key={key}>
              <Visit
                caregivers={caregivers!}
                careEvents={careEvents![key as keyof typeof careEvents]}
                pickEvent={pickEvent}
                careRecipientName={careRecipientName}
              />
            </UL>
          ))}
        </List>
      </>
    )
  }

export default EventContainer;
