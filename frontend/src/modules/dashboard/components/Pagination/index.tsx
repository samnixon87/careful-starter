import { Button, Container } from "./styles";

interface Props {
  page: number;
  handleNext: any;
  handlePrevious: any;
}

export const Pagination:React.FC<Props> = ({ page, handleNext, handlePrevious }) => {

  return (
    <>
      <Container>
        <Button disabled={page === 0} onClick={handlePrevious}>
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </Container>
    </>
  );
};

export default Pagination;
