import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box,  CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { demoProfilePicture } from '../utils/constants';
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
const ChannelDetail = () => {
    const [channelDetail, setChannelDetail] = useState([]);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
      fetchFromAPI(`channels?part=snippet&id=${id}`).then((data)=>setChannelDetail(data?.items[0]));

      fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data)=>setVideos(data?.items));

  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
              <Box
          sx={{
            boxShadow: 'none',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '356px', md: '320px' },
            height: '326px',
            margin: 'auto',
            marginTop:"-110px"
          }}
        >
          <Box>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#fff'
              }}
            >
              <CardMedia
                image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                alt={channelDetail?.snippet?.title}
                sx={{
                  borderRadius: '50%',
                  height: '180px',
                  width: '180px',
                  mb: 2,
                  border: '1px solid #e3e3e3'
                }}
              />
              <Typography variant="h6">
                {channelDetail?.snippet?.title}{' '}
                <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
              </Typography>
              {channelDetail?.statistics?.subscriberCount && (
                <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                  {parseInt(channelDetail.statistics.subscriberCount).toLocaleString('en-US')} Subscribers
                </Typography>
              )}
            </CardContent>
          </Box>
        </Box>
      </Box>
      <Box p={2} display="flex" >
        <Videos videos={videos} />
      </Box>

    </Box>
  )
}

export default ChannelDetail