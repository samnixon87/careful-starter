import { useEffect, useRef } from "react";
import {
  Panel,
  CloseWrapper,
  BG,
  Notes,
  EventDetailsPill,
  P,
  PillDescription,
  H1,
  Note,
  EventType,
} from "./styles";
import { Close } from "../../../common/styles";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ICareEventSanitised } from "../../../common/interfaces";

interface IProps {
  event: any;
  closePanel: any;
  state: any;
  careRecipientName: string;
}

export const EventDetails: React.FC<IProps> = ({
  event,
  closePanel,
  state,
  careRecipientName,
}) => {
  const panelEl = useRef<HTMLDivElement>(null);
  const prevEvent = useRef<ICareEventSanitised | null>(null);

  useEffect(() => {
    if (prevEvent.current !== event) {
      panelEl.current!.scrollTop = 0;
    }
    prevEvent.current = event;
  }, [event, prevEvent]);

  return (
    <>
      <BG onClick={closePanel} $state={state} />
      <Panel $state={state} ref={panelEl}>
        <CloseWrapper onClick={closePanel} $state={state}>
          <Close />
        </CloseWrapper>

        {event && (
          <>
            <Notes>
              <H1>Summary:</H1>
              <Note>
                This visit lasted from{" "}
                {dayjs((Object as any).values(event)[0].time).format(" HH:mm ")}{" "}
                to{" "}
                {dayjs((Object as any).values(event).at(-1).time).format(
                  " HH:mm"
                )}
                .
              </Note>
              {event.find((e: any) => e.event_type === "alert raised")
                ? "An alert was raised. This indicates that the carer is concerned."
                : ""}
              {event.map((e: any, key: number) => {
                if (e.event_type === "general observation") {
                  return (
                    <>
                      <H1 key={key}>Notes from the caregiver:</H1>
                      <Note>
                        {e.note.replaceAll("[redacted]", careRecipientName)}
                      </Note>
                    </>
                  );
                }
              })}
            </Notes>
            {event.map((e: any, key: number) => (
              <EventDetailsPill key={key}>
                <P>{dayjs(e.time).format(" HH:mm ")}</P>
                <PillDescription>
                  <EventType>{e.event_type}</EventType>
                  <P>{e.description}</P>
                  <P>{e.payload.note}</P>
                  <P>{e.payload.fluid}</P>
                  <P>{e.payload.pad_condition}</P>
                  <P>{e.payload.mood}</P>
                </PillDescription>
                {e.event_type === "alert raised" ||
                e.event_type === "no medication observation received" ? (
                  <P>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{ color: "#ed1d1d" }}
                    />
                  </P>
                ) : (
                  <P>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      style={{ color: "#53c5c1" }}
                    />
                  </P>
                )}
              </EventDetailsPill>
            ))}
          </>
        )}
      </Panel>
    </>
  );
};

export default EventDetails;
