import { Fragment, useEffect } from "react";
import axios from "axios";
import Graph from "../Graph";
import EventContainer from "../EventContainer";
import EventDetails from "../EventDetails";
import Pagination from "../Pagination";
import { Container, EventBlock } from "./styles";
import { createDetailsObject } from "../../utils/helpers";
import { Transition } from "react-transition-group";
import { ICaregiver, ICareEvent, ICareEventSanitised, ICareEventsByDate } from '../../../common/interfaces'

interface IProps {
  id: string;
  caregivers: ICaregiver | null;
  careRecipientName: string;
  setCareRecipientName: any;
}

const CareRecord:React.FC<IProps> = ({ id, caregivers, careRecipientName, setCareRecipientName } ) => {

  const [careEvents, setCareEvents] = useState<ICareEvent | null>(null)
  const [careEventsByDate, setCareEventsByDate] = useState<ICareEventsByDate | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<ICareEventSanitised | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [showPanel, setShowPanel] = useState(false);
  const [page, setPage] = useState(0);

  const loadCareEvents = async () => {
    const res = await axios.get(`https://secret-meadow-10295.herokuapp.com/events/${id}?page=${page}`);
    const daily_events = await res.data.daily_events
    const visits_by_date = await res.data.visits_by_date
    setCareEventsByDate(visits_by_date)
    setCareEvents(daily_events)
    setIsLoading(false);
  };

  // Pagination setters
  const handlePrevious = () => {
    setPage(page - 1);
    setIsLoading(true);
  };

  const handleNext = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    // Grab care events
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setId(storedId);
      loadCareEvents();
    }
    // Set care recipient name from locals
    setCareRecipientName(localStorage.getItem("name")!);
  }, [page, accessToken]);

  // Event details panel setters
  const pickEvent = (event: ICareEvent) => {
    const detailsObject: ICareEventSanitised = createDetailsObject(event);
    setSelectedEvent(detailsObject);
    loadCareEvents();
    setShowPanel(true);
  };

  const closePanel = () => {
    setShowPanel(false);
  };

  return (
    <Fragment>
      {isLoading ? (
        <Container>
          <EventBlock></EventBlock>
        </Container>
      ) : (
        <>
          <Container>
            <Graph
              careEventsByDate={careEventsByDate!}
              careRecipientName={careRecipientName}
            />
          </Container>
          <EventContainer
            caregivers={caregivers}
            careEvents={careEvents!}
            pickEvent={pickEvent}
            isPanelOpen={showPanel}
            careRecipientName={careRecipientName}
            />
          <Pagination
            page={page}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
          <Transition in={showPanel} timeout={300}>
            {(state) => <EventDetails
                          event={selectedEvent!}
                          closePanel={closePanel}
                          state={state}
                          careRecipientName={careRecipientName}
                        />}
          </Transition>
        </>
      )}
    </Fragment>
  );
};

export default CareRecord;
