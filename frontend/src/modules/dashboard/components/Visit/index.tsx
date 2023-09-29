import dayjs from 'dayjs'
import { EventBlock, ItemGroup, Date, Details } from './styles'
import { iconConverter, countEventTypes } from '../../utils/helpers'
import { ICaregiver, ICareEvent } from '../../../common/interfaces'

interface IProps {
  caregivers: ICaregiver;
  careEvents: ICareEvent;
  pickEvent: any;
  careRecipientName: string;
}

export const Visit:React.FC<IProps> = ({ careEvents, pickEvent, careRecipientName, caregivers }) => {

  // Some light data wrangling
  const single_event:any = Object.values(careEvents)[0];
  const caregiver_name:any = Object.values(caregivers).find((obj:any) => {
    return obj.id === single_event.caregiver_id
  });

  return (
    <>
      <EventBlock onClick={() => pickEvent && pickEvent(careEvents)}>
        <Date>
          {dayjs(single_event.timestamp).format('DD/MM/YY')}
        </Date>
        <Details>
          <p>{ careRecipientName } was visited by { (typeof caregiver_name !== 'undefined' ? `${caregiver_name.first_name} ${ caregiver_name.last_name }` : "a carer") }  at { dayjs(single_event.timestamp).format(' HH:mm') }.</p>
          { (countEventTypes(careEvents).length > 1 ? <ItemGroup> { countEventTypes(careEvents).map((e:any, key) => (iconConverter(e.key, key)) )} </ItemGroup> : '') }
        </Details>
    </EventBlock>
  </>
  );
}

export default Visit
