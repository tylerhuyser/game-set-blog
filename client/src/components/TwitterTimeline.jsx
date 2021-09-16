import React from 'react'
import { Timeline } from 'react-twitter-widgets'

import './TwitterTimeline.css'

export default function TwitterTimeline() {
  
  return (

<Timeline
      dataSource={{
        sourceType: "profile",
        screenName: "gameset_blog"
      }}
      options={{
        id: "profile:gameset_blog",
        tweetLimit: 5,
      }}
    />
  );

  
}