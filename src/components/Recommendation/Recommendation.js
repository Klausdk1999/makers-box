import styled from "styled-components";
import { useEffect } from "react";

import ReactPlayer from "react-player";
import { GoArrowUp, GoArrowDown } from "react-icons/go";

import useUpvoteRecommendation from "../../hooks/api/useUpvoteRecommendation";
import useDownvoteRecommendation from "../../hooks/api/useDownvoteRecommendation";

export default function Recommendation({ name, youtubeLink, score, id, onUpvote = () => 0, onDownvote = () => 0 }) {
  const { upvoteRecommendation, errorUpvotingRecommendation } = useUpvoteRecommendation();
  const { downvoteRecommendation, errorDownvotingRecommendation } = useDownvoteRecommendation();

  const handleUpvote = async () => {
    await upvoteRecommendation(id);
    onUpvote();
  };

  const handleDownvote = async () => {
    await downvoteRecommendation(id);
    onDownvote();
  };

  useEffect(() => {
    if (errorUpvotingRecommendation) {
      alert("Error upvoting recommendation!");
    }
  }, [errorUpvotingRecommendation]);

  useEffect(() => {
    if (errorDownvotingRecommendation) {
      alert("Error downvoting recommendation!");
    }

  }, [errorDownvotingRecommendation]);

  return (
    <Container>
      <Row id="urlname" >{name}</Row>
      <ReactPlayer url={youtubeLink} width="100%" height="100%" />
      <Row id="counter">
        <GoArrowUp size="24px" id="upvote" onClick={handleUpvote} />
        {score}
        <GoArrowDown size="24px" id="downvote" onClick={handleDownvote} />
      </Row>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 0;
  background-color: rgba(255, 255, 255, .1);
  border-radius: 4px;
  margin-bottom: 15px;
`;

const Row = styled.div`
  padding: 0 15px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;