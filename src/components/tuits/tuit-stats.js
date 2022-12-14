import React, { useEffect, useState } from "react";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import clsx from "clsx";

const TuitStats = ({ likeTuit, tuit, dislikeTuit }) => {
  const [likedTuit, setLikedTuit] = useState(false);
  const [dislikedTuit, setDislikedTuit] = useState(false);

  useEffect(() => {
    const fetchLikesDislikes = () => {
      likesService.hasUserLikedTheTuit("me", tuit._id).then((liked) => {
        setLikedTuit(liked);
      });
      dislikesService
        .hasUserDislikedTheTuit("me", tuit._id)
        .then((disliked) => {
          setDislikedTuit(disliked);
        });
    };

    fetchLikesDislikes();
  }, [tuit]);

  return (
    <div className="row mt-2">
      <div className="col">
        <i className="far fa-message me-1"></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col" onClick={() => likeTuit(tuit)}>
        <i
          className={clsx("fa-solid", "fa-thumbs-up", "me-1", {
            "ttr-like-unlike-color-red": likedTuit,
          })}
        ></i>
        {tuit.stats?.likes}
      </div>
      <div className="col" onClick={() => dislikeTuit(tuit)}>
        <i
          className={clsx("fa-solid", "fa-thumbs-down", "me-1", {
            "ttr-like-unlike-color-red": dislikedTuit,
          })}
        ></i>
        {tuit.stats?.dislikes}
      </div>
    </div>
  );
};

export default TuitStats;
