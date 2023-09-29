import NameSelector from "../NameSelector";
import { Wrapper } from "./styles";
import { ICareRecipient } from "../../../common/interfaces";

interface IProps {
  careRecipients: ICareRecipient;
  setCareRecipientName: any;
  setId: any;
}

const LandingPage: React.FC<IProps> = ({
  careRecipients,
  setCareRecipientName,
  setId,
}) => {
  return (
    <>
      <NameSelector
        careRecipients={careRecipients}
        setCareRecipientName={setCareRecipientName}
        setId={setId}
      />
    </>
  );
};
export default LandingPage;
